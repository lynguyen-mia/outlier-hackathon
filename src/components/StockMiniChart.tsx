import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@mui/material";

interface StockMiniChartProps {
  data: Array<{
    date: string;
    price: number;
  }>;
  color?: string;
}

const StockMiniChart: React.FC<StockMiniChartProps> = ({ data, color }) => {
  const theme = useTheme();
  const chartColor =
    color || (theme.palette.mode === "dark" ? "#9F7AEA" : "#6B46C1");

  return (
    <ResponsiveContainer width={150} height={50}>
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <XAxis
          dataKey="date"
          hide
          axisLine={false}
          tickLine={false}
          tick={false}
        />
        <YAxis
          hide
          domain={["auto", "auto"]}
          axisLine={false}
          tickLine={false}
          tick={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#1E1B4B" : "#FFFFFF",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(233, 216, 253, 0.1)"
                : "rgba(107, 70, 193, 0.1)"
            }`,
            borderRadius: "8px",
            color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
          }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={chartColor}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: chartColor }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockMiniChart;
