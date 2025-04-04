import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import StockMiniChart from "../components/StockMiniChart";

interface Stock {
  symbol: string;
  name: string;
  sector: keyof typeof sectorColors;
  currentPrice: number;
  change: number;
  changePercent: number;
  shares: number;
  value: number;
  costBasis: number;
  gain: number;
  gainPercent: number;
  chartData: Array<{
    date: string;
    price: number;
  }>;
}

interface StockData {
  summary: {
    totalValue: number;
    totalGain: number;
    gainPercentage: number;
    numberOfStocks: number;
  };
  stocks: Stock[];
}

// Sample data - replace with real API data
const stockData: StockData = {
  summary: {
    totalValue: 446200,
    totalGain: 35000,
    gainPercentage: 16.25,
    numberOfStocks: 5,
  },
  stocks: [
    {
      symbol: "HPG",
      name: "Hoa Phat Group",
      sector: "Steel",
      currentPrice: 28.5,
      change: 0.75,
      changePercent: 2.7,
      shares: 5000,
      value: 142500,
      costBasis: 25.0,
      gain: 17500,
      gainPercent: 14.0,
      chartData: [
        { date: "2024-01", price: 25.0 },
        { date: "2024-02", price: 26.5 },
        { date: "2024-03", price: 28.5 },
      ],
    },
    {
      symbol: "VRE",
      name: "Vincom Retail",
      sector: "Retail",
      currentPrice: 32.8,
      change: -0.4,
      changePercent: -1.2,
      shares: 2000,
      value: 65600,
      costBasis: 35.0,
      gain: -4400,
      gainPercent: -6.3,
      chartData: [
        { date: "2024-01", price: 35.0 },
        { date: "2024-02", price: 34.2 },
        { date: "2024-03", price: 32.8 },
      ],
    },
    {
      symbol: "VCG",
      name: "Vietnam Construction",
      sector: "Construction",
      currentPrice: 15.2,
      change: 0.3,
      changePercent: 2.0,
      shares: 3000,
      value: 45600,
      costBasis: 14.0,
      gain: 3600,
      gainPercent: 8.6,
      chartData: [
        { date: "2024-01", price: 14.0 },
        { date: "2024-02", price: 14.8 },
        { date: "2024-03", price: 15.2 },
      ],
    },
    {
      symbol: "FPT",
      name: "FPT Corporation",
      sector: "Technology",
      currentPrice: 85.5,
      change: 1.5,
      changePercent: 1.8,
      shares: 1000,
      value: 85500,
      costBasis: 75.0,
      gain: 10500,
      gainPercent: 14.0,
      chartData: [
        { date: "2024-01", price: 75.0 },
        { date: "2024-02", price: 82.0 },
        { date: "2024-03", price: 85.5 },
      ],
    },
    {
      symbol: "TCB",
      name: "Techcombank",
      sector: "Banking",
      currentPrice: 42.8,
      change: 0.8,
      changePercent: 1.9,
      shares: 2500,
      value: 107000,
      costBasis: 38.0,
      gain: 12000,
      gainPercent: 12.6,
      chartData: [
        { date: "2024-01", price: 38.0 },
        { date: "2024-02", price: 41.0 },
        { date: "2024-03", price: 42.8 },
      ],
    },
  ],
};

// Add sector color mapping
const sectorColors = {
  Steel: "#F6AD55", // Orange
  Retail: "#9F7AEA", // Purple
  Construction: "#48BB78", // Green
  Technology: "#4299E1", // Blue
  Banking: "#ED64A6", // Pink
} as const;

const MyStocks: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Portfolio Summary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "rgba(159, 122, 234, 0.15)"
              }`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(159, 122, 234, 0.2) 0%, rgba(183, 148, 244, 0.2) 100%)"
                    : "linear-gradient(135deg, rgba(159, 122, 234, 0.15) 0%, rgba(183, 148, 244, 0.15) 100%)",
              },
            }}
          >
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: 0.8,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                }}
              >
                Total Portfolio Value
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: "2.2rem",
                  letterSpacing: "1px",
                  color: "#9F7AEA",
                  marginTop: "4px",
                }}
              >
                ${stockData.summary.totalValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "rgba(72, 187, 120, 0.15)"
              }`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(72, 187, 120, 0.2) 0%, rgba(154, 230, 180, 0.2) 100%)"
                    : "linear-gradient(135deg, rgba(72, 187, 120, 0.15) 0%, rgba(154, 230, 180, 0.15) 100%)",
              },
            }}
          >
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: 0.8,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                }}
              >
                Total Gain/Loss
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                {stockData.summary.totalGain >= 0 ? (
                  <TrendingUpIcon
                    sx={{ mr: 1, fontSize: 24, color: "#48BB78" }}
                  />
                ) : (
                  <TrendingDownIcon
                    sx={{ mr: 1, fontSize: 24, color: "#48BB78" }}
                  />
                )}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontSize: "2.2rem",
                    letterSpacing: "1px",
                    color: "#48BB78",
                    marginTop: "4px",
                  }}
                >
                  ${Math.abs(stockData.summary.totalGain).toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "rgba(246, 173, 85, 0.15)"
              }`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(246, 173, 85, 0.2) 0%, rgba(251, 211, 141, 0.2) 100%)"
                    : "linear-gradient(135deg, rgba(72, 187, 120, 0.15) 0%, rgba(154, 230, 180, 0.15) 100%)",
              },
            }}
          >
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: 0.8,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                }}
              >
                Gain Percentage
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: "2.2rem",
                  letterSpacing: "1px",
                  color: "#48BB78",
                  marginTop: "4px",
                }}
              >
                {stockData.summary.gainPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "100%",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "rgba(246, 173, 85, 0.15)"
              }`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(246, 173, 85, 0.2) 0%, rgba(251, 211, 141, 0.2) 100%)"
                    : "linear-gradient(135deg, rgba(246, 173, 85, 0.15) 0%, rgba(251, 211, 141, 0.15) 100%)",
              },
            }}
          >
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: 0.8,
                  mb: 1,
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                }}
              >
                Number of Stocks
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: "2.2rem",
                  letterSpacing: "1px",
                  color: "#F6AD55",
                  marginTop: "4px",
                }}
              >
                {stockData.summary.numberOfStocks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Stock List */}
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0, 0, 0, 0.2)"
              : "0 4px 20px rgba(0, 0, 0, 0.1)",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
              : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              textAlign: "center",
              mb: 4,
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                background: "linear-gradient(90deg, #9F7AEA, #B794F4)",
                borderRadius: "2px",
              },
              background: "linear-gradient(135deg, #9F7AEA 0%, #B794F4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(159, 122, 234, 0.2)",
              letterSpacing: "0.5px",
            }}
          >
            My Stocks
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.5) 0%, rgba(233, 216, 253, 0.5) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Symbol
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Current Price
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Change
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Shares
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Value
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Cost Basis
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Gain/Loss
                  </TableCell>
                  <TableCell align="left" sx={{ color: "#6B46C1" }}>
                    Chart
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockData.stocks.map((stock) => (
                  <TableRow
                    key={stock.symbol}
                    sx={{
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                            : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip
                          label={stock.symbol}
                          size="small"
                          sx={{
                            backgroundColor: sectorColors[stock.sector],
                            color: "#FFFFFF",
                            fontWeight: 600,
                            "&:hover": {
                              backgroundColor: sectorColors[stock.sector],
                              opacity: 0.9,
                            },
                          }}
                        />
                        <Chip
                          label={stock.sector}
                          size="small"
                          sx={{
                            backgroundColor: `${sectorColors[stock.sector]}20`,
                            color: sectorColors[stock.sector],
                            fontWeight: 500,
                            border: `1px solid ${sectorColors[stock.sector]}40`,
                            "&:hover": {
                              backgroundColor: `${
                                sectorColors[stock.sector]
                              }30`,
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell align="right">
                      ${stock.currentPrice.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {stock.change >= 0 ? (
                          <TrendingUpIcon
                            sx={{
                              fontSize: 16,
                              mr: 0.5,
                              color: theme.palette.success.main,
                            }}
                          />
                        ) : (
                          <TrendingDownIcon
                            sx={{
                              fontSize: 16,
                              mr: 0.5,
                              color: theme.palette.error.main,
                            }}
                          />
                        )}
                        <Typography
                          color={
                            stock.change >= 0 ? "success.main" : "error.main"
                          }
                        >
                          {Math.abs(stock.changePercent)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{stock.shares}</TableCell>
                    <TableCell align="right">
                      ${stock.value.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      ${stock.costBasis.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        color={stock.gain >= 0 ? "success.main" : "error.main"}
                      >
                        ${Math.abs(stock.gain).toLocaleString()} (
                        {stock.gainPercent}%)
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StockMiniChart
                        data={stock.chartData}
                        color={stock.change >= 0 ? "#48BB78" : "#F56565"}
                        strokeWidth={2}
                        dotSize={4}
                        dotColor={stock.change >= 0 ? "#48BB78" : "#F56565"}
                        dotStrokeWidth={2}
                        dotStrokeColor="#FFFFFF"
                        curve="monotoneX"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyStocks;
