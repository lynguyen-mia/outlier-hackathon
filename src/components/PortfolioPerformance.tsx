import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Stack,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data - replace with real API data
const data = [
  { date: "Jan/2024", portfolio: 1.5, vni: -1.0 },
  { date: "Feb/2024", portfolio: -3.8, vni: -0.2 },
  { date: "Mar/2024", portfolio: -5.5, vni: 1.2 },
  { date: "Apr/2024", portfolio: -8.2, vni: 2.0 },
  { date: "May/2024", portfolio: -11.8, vni: 2.8 },
  { date: "Jun/2024", portfolio: -5.2, vni: 3.5 },
  { date: "Jul/2024", portfolio: 2.0, vni: 3.0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(49, 46, 129, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(243, 232, 253, 0.95) 0%, rgba(233, 216, 253, 0.95) 100%)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(233, 216, 253, 0.2)"
              : "rgba(107, 70, 193, 0.2)"
          }`,
          p: 1.5,
          borderRadius: 2,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
            mb: 1,
          }}
        >
          {label}
        </Typography>
        {payload.map((entry: any, index: number) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: index < payload.length - 1 ? 0.5 : 0 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: entry.color,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
              }}
            >
              {entry.name === "portfolio" ? "HQDT" : "VNI"}:{" "}
              {entry.value.toFixed(1)}%
            </Typography>
          </Stack>
        ))}
      </Box>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={3}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 1 }}
    >
      {payload.map((entry: any, index: number) => (
        <Stack key={index} direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: entry.color,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
              fontWeight: 500,
            }}
          >
            {entry.value === "portfolio" ? "HQDT" : "VNI"}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

const PortfolioPerformance = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(12, 133, 153, 0.85) 0%, rgba(12, 133, 153, 0.6) 100%)"
            : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 30px rgba(12, 133, 153, 0.2)"
            : "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #66d9e8 0%, #99e9f2 100%)"
                  : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Performance
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark" ? "#4ADE80" : "#059669",
              fontWeight: 600,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            2.0%
          </Typography>
        </Stack>

        <Box sx={{ width: "100%", height: 300, position: "relative" }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="portfolioGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={
                      theme.palette.mode === "dark" ? "#66d9e8" : "#6B46C1"
                    }
                    stopOpacity={0.1}
                  />
                  <stop
                    offset="95%"
                    stopColor={
                      theme.palette.mode === "dark" ? "#66d9e8" : "#6B46C1"
                    }
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={
                  theme.palette.mode === "dark"
                    ? "rgba(102, 217, 232, 0.1)"
                    : "rgba(107, 70, 193, 0.1)"
                }
              />
              <XAxis
                dataKey="date"
                stroke={theme.palette.mode === "dark" ? "#99e9f2" : "#6B46C1"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={0}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                stroke={theme.palette.mode === "dark" ? "#99e9f2" : "#6B46C1"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
                domain={[-15, 5]}
                ticks={[-15, -10, -5, 0, 5]}
                padding={{ top: 20, bottom: 20 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke:
                    theme.palette.mode === "dark"
                      ? "rgba(102, 217, 232, 0.2)"
                      : "rgba(107, 70, 193, 0.2)",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
              />
              <Legend
                content={<CustomLegend />}
                verticalAlign="top"
                height={36}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                name="HQDT"
                stroke={theme.palette.mode === "dark" ? "#66d9e8" : "#6B46C1"}
                strokeWidth={2}
                dot={{
                  fill: theme.palette.mode === "dark" ? "#66d9e8" : "#6B46C1",
                  strokeWidth: 0,
                  r: 4,
                }}
                activeDot={{
                  fill: theme.palette.mode === "dark" ? "#66d9e8" : "#6B46C1",
                  strokeWidth: 0,
                  r: 6,
                }}
                fillOpacity={1}
                fill="url(#portfolioGradient)"
              />
              <Line
                type="monotone"
                dataKey="vni"
                name="VNI"
                stroke={theme.palette.mode === "dark" ? "#99e9f2" : "#B794F4"}
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: theme.palette.mode === "dark" ? "#99e9f2" : "#B794F4",
                  stroke: theme.palette.mode === "dark" ? "#99e9f2" : "#B794F4",
                  strokeWidth: 1,
                }}
                activeDot={{
                  r: 4,
                  fill: theme.palette.mode === "dark" ? "#99e9f2" : "#B794F4",
                  stroke: theme.palette.mode === "dark" ? "#99e9f2" : "#B794F4",
                  strokeWidth: 1,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PortfolioPerformance;
