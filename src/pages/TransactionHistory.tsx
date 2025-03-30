import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Chip,
  Pagination,
  Stack,
  IconButton,
  Fade,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import LoadingEffect from "../components/LoadingEffect";
import SearchIcon from "@mui/icons-material/Search";

// Sample data - replace with real API data
const transactionData = {
  summary: {
    totalTransactions: 15,
    totalValue: 250000,
    averageValue: 16667,
  },
  transactions: [
    {
      id: 1,
      date: "2025-01-15",
      type: "BUY",
      symbol: "HPG",
      name: "Hoa Phat Group",
      shares: 2000,
      price: 142.5,
      value: 285000,
      fees: 10,
    },
    {
      id: 2,
      date: "2025-01-10",
      type: "BUY",
      symbol: "VRE",
      name: "Vincom Retail",
      shares: 2000,
      price: 131.2,
      value: 262400,
      fees: 10,
    },
    {
      id: 3,
      date: "2025-01-05",
      type: "BUY",
      symbol: "VCG",
      name: "Vietnam Construction",
      shares: 3000,
      price: 57.0,
      value: 171000,
      fees: 10,
    },
    {
      id: 4,
      date: "2025-01-01",
      type: "BUY",
      symbol: "FPT",
      name: "FPT Corporation",
      shares: 1000,
      price: 142.5,
      value: 142500,
      fees: 10,
    },
    {
      id: 5,
      date: "2025-01-20",
      type: "BUY",
      symbol: "TCB",
      name: "Techcombank",
      shares: 2500,
      price: 107.0,
      value: 267500,
      fees: 10,
    },
    {
      id: 6,
      date: "2025-02-15",
      type: "BUY",
      symbol: "HPG",
      name: "Hoa Phat Group",
      shares: 3000,
      price: 145.0,
      value: 435000,
      fees: 10,
    },
    {
      id: 7,
      date: "2025-02-10",
      type: "SELL",
      symbol: "VRE",
      name: "Vincom Retail",
      shares: 500,
      price: 130.0,
      value: 65000,
      fees: 10,
    },
    {
      id: 8,
      date: "2025-02-05",
      type: "BUY",
      symbol: "VCG",
      name: "Vietnam Construction",
      shares: 1000,
      price: 58.0,
      value: 58000,
      fees: 10,
    },
    {
      id: 9,
      date: "2025-02-01",
      type: "BUY",
      symbol: "FPT",
      name: "FPT Corporation",
      shares: 500,
      price: 142.5,
      value: 71250,
      fees: 10,
    },
    {
      id: 10,
      date: "2025-02-20",
      type: "BUY",
      symbol: "TCB",
      name: "Techcombank",
      shares: 1500,
      price: 105.0,
      value: 157500,
      fees: 10,
    },
    {
      id: 11,
      date: "2025-03-15",
      type: "SELL",
      symbol: "HPG",
      name: "Hoa Phat Group",
      shares: 1000,
      price: 145.0,
      value: 145000,
      fees: 10,
    },
    {
      id: 12,
      date: "2025-03-10",
      type: "BUY",
      symbol: "VRE",
      name: "Vincom Retail",
      shares: 1000,
      price: 131.2,
      value: 131200,
      fees: 10,
    },
    {
      id: 13,
      date: "2025-03-05",
      type: "SELL",
      symbol: "VCG",
      name: "Vietnam Construction",
      shares: 500,
      price: 58.0,
      value: 29000,
      fees: 10,
    },
    {
      id: 14,
      date: "2025-03-01",
      type: "BUY",
      symbol: "FPT",
      name: "FPT Corporation",
      shares: 500,
      price: 142.5,
      value: 71250,
      fees: 10,
    },
    {
      id: 15,
      date: "2025-03-20",
      type: "SELL",
      symbol: "TCB",
      name: "Techcombank",
      shares: 1000,
      price: 107.0,
      value: 107000,
      fees: 10,
    },
  ],
};

const transactionTypes = ["ALL", "BUY", "SELL"];

// Add new sample data for sector distribution
const sectorData = [
  { name: "Materials", value: 30.0, color: "#9B8AFB" },
  { name: "Real Estate", value: 20.0, color: "#B4A9FF" },
  { name: "Construction", value: 15.0, color: "#7A6DF9" },
  { name: "Technology", value: 25.0, color: "#E6B3B3" },
  { name: "Finance", value: 10.0, color: "#A8D1B2" },
];

// Add sample data for frequently traded stocks
const frequentlyTradedStocks = [
  {
    symbol: "HPG",
    name: "Hoa Phat Group",
    transactions: 3,
    percentage: 30.0,
  },
  {
    symbol: "FPT",
    name: "FPT Corporation",
    transactions: 3,
    percentage: 25.0,
  },
  {
    symbol: "VRE",
    name: "Vincom Retail",
    transactions: 2,
    percentage: 20.0,
  },
  {
    symbol: "VCG",
    name: "Vietnam Construction",
    transactions: 2,
    percentage: 15.0,
  },
  {
    symbol: "TCB",
    name: "Techcombank",
    transactions: 1,
    percentage: 10.0,
  },
];

// Add trading details data
const tradingDetails = [
  {
    symbol: "VRE",
    buyPrice: 24609,
    sellPrice: 19850,
    profit: -19.3,
    date: "26/03/2025",
  },
  {
    symbol: "PVT",
    buyPrice: 24685,
    sellPrice: 25668,
    profit: 4.0,
    date: "13/03/2025",
  },
  {
    symbol: "PVT",
    buyPrice: 24685,
    sellPrice: 25725,
    profit: 4.2,
    date: "13/03/2025",
  },
  {
    symbol: "PVT",
    buyPrice: 24685,
    sellPrice: 25687,
    profit: 4.1,
    date: "13/03/2025",
  },
  {
    symbol: "PVT",
    buyPrice: 24685,
    sellPrice: 25687,
    profit: 4.1,
    date: "13/03/2025",
  },
  {
    symbol: "PVT",
    buyPrice: 24685,
    sellPrice: 25781,
    profit: 4.4,
    date: "13/03/2025",
  },
  {
    symbol: "PVT",
    buyPrice: 24685,
    sellPrice: 25762,
    profit: 4.4,
    date: "13/03/2025",
  },
  {
    symbol: "PVT",
    buyPrice: 24685,
    sellPrice: 25725,
    profit: 4.2,
    date: "13/03/2025",
  },
];

const TransactionHistory: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "ALL",
    minValue: "",
    maxValue: "",
    startDate: null,
    endDate: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (field: string, value: any) => {
    setIsLoading(true);
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTimeout(() => {
      setIsLoading(false);
      setPage(0);
    }, 500);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setIsLoading(true);
    setPage(value - 1);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const filteredTransactions = transactionData.transactions.filter(
    (transaction) => {
      if (filters.type !== "ALL" && transaction.type !== filters.type) {
        return false;
      }

      const value = transaction.value;
      if (filters.minValue && value < parseFloat(filters.minValue)) {
        return false;
      }
      if (filters.maxValue && value > parseFloat(filters.maxValue)) {
        return false;
      }
      const transactionDate = new Date(transaction.date);
      if (filters.startDate && transactionDate < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && transactionDate > new Date(filters.endDate)) {
        return false;
      }

      return true;
    }
  );

  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    Math.min((page + 1) * rowsPerPage, filteredTransactions.length)
  );

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const hasNextPage = (page + 1) * rowsPerPage < filteredTransactions.length;

  // Update summary metrics to match Overview
  const summaryMetrics = {
    totalTransactions: 33,
    profitablePercentage: 63.6,
    averageHoldingDays: 301,
    averageProfitPercentage: 8.7,
    averageLossPercentage: -22.3,
    totalProfitLossPercentage: 16.25, // Updated to match Overview YTD return
  };

  const content = (
    <>
      {/* New Summary Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "12px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1,
                }}
              >
                Transactions
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: "bold",
                }}
              >
                {summaryMetrics.totalTransactions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "12px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1,
                }}
              >
                Profit Ratio
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#9F7AEA", fontWeight: "bold" }}
              >
                {summaryMetrics.profitablePercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "12px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1,
                }}
              >
                Avg Holding Days
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#B794F4", fontWeight: "bold" }}
              >
                {summaryMetrics.averageHoldingDays} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "12px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1,
                }}
              >
                Avg Profit
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#00C49F", fontWeight: "bold" }}
              >
                {summaryMetrics.averageProfitPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "12px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1,
                }}
              >
                Avg Loss
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#FF4842", fontWeight: "bold" }}
              >
                {summaryMetrics.averageLossPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "12px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1,
                }}
              >
                P/L (%)
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color:
                    summaryMetrics.totalProfitLossPercentage >= 0
                      ? "#00C49F"
                      : "#FF4842",
                  fontWeight: "bold",
                }}
              >
                {summaryMetrics.totalProfitLossPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sector Distribution and Trading Details */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Sector Distribution */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Sector Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#1E1B4B" : "#FFFFFF",
                        borderRadius: "8px",
                        border: "none",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ mt: 2 }}>
                {sectorData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        mr: 1,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        flex: 1,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontWeight: "bold",
                      }}
                    >
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Frequently Traded Stocks */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Frequently Traded Stocks
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Code
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Trades
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Weight
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {frequentlyTradedStocks.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#E9D8FD"
                                    : "#6B46C1",
                                fontWeight: "bold",
                              }}
                            >
                              {stock.symbol}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#E9D8FD"
                                    : "#6B46C1",
                                opacity: 0.7,
                              }}
                            >
                              {stock.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {stock.transactions}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {stock.percentage}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Trading Details */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Stock Transactions
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Code
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Cost
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Sell
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        P/L (%)
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tradingDetails.map((trade, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {trade.symbol}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {trade.buyPrice.toLocaleString()}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {trade.sellPrice.toLocaleString()}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: trade.profit >= 0 ? "#00C49F" : "#FF4842",
                            fontWeight: "bold",
                          }}
                        >
                          {trade.profit > 0 ? `+${trade.profit}` : trade.profit}
                          %
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {trade.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Summary Cards
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "translateY(-4px)" },
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                Total Transactions
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {transactionData.summary.totalTransactions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "translateY(-4px)" },
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                Total Value
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                ${transactionData.summary.totalValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "translateY(-4px)" },
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
              backdropFilter: "blur(10px)",
              color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                Average Value
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                ${transactionData.summary.averageValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

      {/* Transaction List */}
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
              : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                    : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              Transaction History
            </Typography>

            {/* Filters */}
            <Box
              sx={{
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(49, 46, 129, 0.3) 0%, rgba(30, 27, 75, 0.3) 100%)"
                    : "linear-gradient(135deg, rgba(243, 232, 253, 0.3) 0%, rgba(233, 216, 253, 0.3) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                p: { xs: 2, sm: 3 },
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(233, 216, 253, 0.1)"
                    : "rgba(107, 70, 193, 0.1)"
                }`,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Type"
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(49, 46, 129, 0.2)"
                            : "rgba(243, 232, 253, 0.2)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(233, 216, 253, 0.1)"
                            : "rgba(107, 70, 193, 0.1)"
                        }`,
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(49, 46, 129, 0.3)"
                              : "rgba(243, 232, 253, 0.3)",
                          border: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(233, 216, 253, 0.2)"
                              : "rgba(107, 70, 193, 0.2)"
                          }`,
                        },
                      },
                    }}
                  >
                    {transactionTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Min Value"
                    type="number"
                    value={filters.minValue}
                    onChange={(e) =>
                      handleFilterChange("minValue", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(49, 46, 129, 0.2)"
                            : "rgba(243, 232, 253, 0.2)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(233, 216, 253, 0.1)"
                            : "rgba(107, 70, 193, 0.1)"
                        }`,
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(49, 46, 129, 0.3)"
                              : "rgba(243, 232, 253, 0.3)",
                          border: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(233, 216, 253, 0.2)"
                              : "rgba(107, 70, 193, 0.2)"
                          }`,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Max Value"
                    type="number"
                    value={filters.maxValue}
                    onChange={(e) =>
                      handleFilterChange("maxValue", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(49, 46, 129, 0.2)"
                            : "rgba(243, 232, 253, 0.2)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(233, 216, 253, 0.1)"
                            : "rgba(107, 70, 193, 0.1)"
                        }`,
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(49, 46, 129, 0.3)"
                              : "rgba(243, 232, 253, 0.3)",
                          border: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(233, 216, 253, 0.2)"
                              : "rgba(107, 70, 193, 0.2)"
                          }`,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    label="Start Date"
                    value={filters.startDate}
                    onChange={(date) => handleFilterChange("startDate", date)}
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            transition: "all 0.2s ease-in-out",
                            background:
                              theme.palette.mode === "dark"
                                ? "rgba(49, 46, 129, 0.2)"
                                : "rgba(243, 232, 253, 0.2)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${
                              theme.palette.mode === "dark"
                                ? "rgba(233, 216, 253, 0.1)"
                                : "rgba(107, 70, 193, 0.1)"
                            }`,
                            "&:hover": {
                              background:
                                theme.palette.mode === "dark"
                                  ? "rgba(49, 46, 129, 0.3)"
                                  : "rgba(243, 232, 253, 0.3)",
                              border: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(233, 216, 253, 0.2)"
                                  : "rgba(107, 70, 193, 0.2)"
                              }`,
                            },
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DatePicker
                    label="End Date"
                    value={filters.endDate}
                    onChange={(date) => handleFilterChange("endDate", date)}
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            transition: "all 0.2s ease-in-out",
                            background:
                              theme.palette.mode === "dark"
                                ? "rgba(49, 46, 129, 0.2)"
                                : "rgba(243, 232, 253, 0.2)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${
                              theme.palette.mode === "dark"
                                ? "rgba(233, 216, 253, 0.1)"
                                : "rgba(107, 70, 193, 0.1)"
                            }`,
                            "&:hover": {
                              background:
                                theme.palette.mode === "dark"
                                  ? "rgba(49, 46, 129, 0.3)"
                                  : "rgba(243, 232, 253, 0.3)",
                              border: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(233, 216, 253, 0.2)"
                                  : "rgba(107, 70, 193, 0.2)"
                              }`,
                            },
                          },
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>

          <LoadingEffect isLoading={isLoading} type="content">
            <Box sx={{ overflowX: "auto", borderRadius: "16px" }}>
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: "16px",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%)"
                      : "linear-gradient(135deg, rgba(243, 232, 253, 0.5) 0%, rgba(233, 216, 253, 0.5) 100%)",
                  backdropFilter: "blur(10px)",
                  minWidth: { xs: "800px", md: "100%" }, // Set minimum width for mobile scrolling
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Type
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Symbol
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Shares
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Value
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                        }}
                      >
                        Fees
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedTransactions.map((transaction) => (
                      <TableRow
                        key={transaction.id}
                        sx={{
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            background:
                              theme.palette.mode === "dark"
                                ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                                : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {transaction.date}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {transaction.type === "BUY" ? (
                              <Chip
                                label="BUY"
                                size="small"
                                icon={<TrendingUpIcon />}
                                sx={{
                                  background:
                                    theme.palette.mode === "dark"
                                      ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                                      : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#1E1B4B"
                                      : "#FFFFFF",
                                  fontWeight: 600,
                                  "& .MuiChip-icon": {
                                    color:
                                      theme.palette.mode === "dark"
                                        ? "#1E1B4B"
                                        : "#FFFFFF",
                                  },
                                }}
                              />
                            ) : (
                              <Chip
                                label="SELL"
                                size="small"
                                icon={<TrendingDownIcon />}
                                sx={{
                                  background:
                                    theme.palette.mode === "dark"
                                      ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                                      : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#1E1B4B"
                                      : "#FFFFFF",
                                  fontWeight: 600,
                                  "& .MuiChip-icon": {
                                    color:
                                      theme.palette.mode === "dark"
                                        ? "#1E1B4B"
                                        : "#FFFFFF",
                                  },
                                }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={transaction.symbol}
                            size="small"
                            sx={{
                              background:
                                theme.palette.mode === "dark"
                                  ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                                  : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                              color:
                                theme.palette.mode === "dark"
                                  ? "#1E1B4B"
                                  : "#FFFFFF",
                              fontWeight: 600,
                              "&:hover": {
                                background:
                                  theme.palette.mode === "dark"
                                    ? "linear-gradient(135deg, #8B6AE9 0%, #D8C3FD 100%)"
                                    : "linear-gradient(135deg, #5A3AB0 0%, #8B6AE9 100%)",
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {transaction.name}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          {transaction.shares}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          ${transaction.price.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          ${transaction.value.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                          }}
                        >
                          ${transaction.fees.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </LoadingEffect>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
              mb: 1,
              gap: 2,
            }}
          >
            <Fade in={true} timeout={800}>
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                sx={{
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, rgba(49, 46, 129, 0.6) 0%, rgba(30, 27, 75, 0.6) 100%)"
                      : "linear-gradient(135deg, rgba(243, 232, 253, 0.6) 0%, rgba(233, 216, 253, 0.6) 100%)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: { xs: "2px", sm: "4px" },
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(233, 216, 253, 0.2)"
                      : "rgba(107, 70, 193, 0.2)"
                  }`,
                }}
              >
                <IconButton
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                  size="small"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.1)"
                          : "rgba(107, 70, 193, 0.1)",
                    },
                    "&.Mui-disabled": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.3)"
                          : "rgba(107, 70, 193, 0.3)",
                    },
                  }}
                >
                  <FirstPageIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  size="small"
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.1)"
                          : "rgba(107, 70, 193, 0.1)",
                    },
                    "&.Mui-disabled": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.3)"
                          : "rgba(107, 70, 193, 0.3)",
                    },
                  }}
                >
                  <KeyboardArrowLeftIcon fontSize="small" />
                </IconButton>
                <Pagination
                  count={totalPages}
                  page={page + 1}
                  onChange={handlePageChange}
                  shape="rounded"
                  size="small"
                  siblingCount={0}
                  boundaryCount={1}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      minWidth: { xs: "28px", sm: "32px" },
                      height: { xs: "28px", sm: "32px" },
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(233, 216, 253, 0.1)"
                            : "rgba(107, 70, 193, 0.1)",
                      },
                      "&.Mui-selected": {
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                            : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                        color:
                          theme.palette.mode === "dark" ? "#1E1B4B" : "#FFFFFF",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 4px 12px rgba(233, 216, 253, 0.2)"
                            : "0 4px 12px rgba(107, 70, 193, 0.2)",
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #8B6AE9 0%, #D8C3FD 100%)"
                              : "linear-gradient(135deg, #5A3AB0 0%, #8B6AE9 100%)",
                        },
                      },
                    },
                  }}
                />
                <IconButton
                  onClick={() => setPage(page + 1)}
                  disabled={!hasNextPage}
                  size="small"
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.1)"
                          : "rgba(107, 70, 193, 0.1)",
                    },
                    "&.Mui-disabled": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.3)"
                          : "rgba(107, 70, 193, 0.3)",
                    },
                  }}
                >
                  <KeyboardArrowRightIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => setPage(totalPages - 1)}
                  disabled={!hasNextPage}
                  size="small"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.1)"
                          : "rgba(107, 70, 193, 0.1)",
                    },
                    "&.Mui-disabled": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.3)"
                          : "rgba(107, 70, 193, 0.3)",
                    },
                  }}
                >
                  <LastPageIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Fade>
            <Fade in={true} timeout={1000}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  opacity: 0.8,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  textAlign: "center",
                }}
              >
                Showing {page * rowsPerPage + 1} -{" "}
                {Math.min(
                  (page + 1) * rowsPerPage,
                  filteredTransactions.length
                )}{" "}
                of {filteredTransactions.length} transactions
              </Typography>
            </Fade>
          </Box>
        </CardContent>
      </Card>
    </>
  );

  return <Box>{content}</Box>;
};

export default TransactionHistory;
