import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  date: string;
  price: number;
}

interface StockMiniChartProps {
  data: ChartData[];
  color: string;
  strokeWidth?: number;
  dotSize?: number;
  dotColor?: string;
  dotStrokeWidth?: number;
  dotStrokeColor?: string;
  curve?:
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "linear"
    | "step"
    | "stepBefore"
    | "stepAfter";
}

const StockMiniChart: React.FC<StockMiniChartProps> = ({
  data,
  color,
  strokeWidth = 2,
  dotSize = 4,
  dotColor,
  dotStrokeWidth = 2,
  dotStrokeColor = "#FFFFFF",
  curve = "monotoneX",
}) => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <XAxis dataKey="date" hide />
        <YAxis hide />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
        />
        <Line
          type={curve}
          dataKey="price"
          stroke={color}
          strokeWidth={strokeWidth}
          dot={{
            r: dotSize,
            fill: dotColor || color,
            stroke: dotStrokeColor,
            strokeWidth: dotStrokeWidth,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockMiniChart;
