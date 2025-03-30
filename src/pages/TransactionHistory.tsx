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

interface Transaction {
  id: number;
  date: string;
  type: "buy" | "sell";
  symbol: string;
  name: string;
  sector: keyof typeof sectorColors;
  shares: number;
  price: number;
  value: number;
  fees: number;
}

// Sample data - replace with real API data
const transactions: Transaction[] = [
  {
    id: 1,
    date: "2024-03-15",
    type: "buy",
    symbol: "HPG",
    name: "Hoa Phat Group",
    sector: "steel",
    shares: 1000,
    price: 25.0,
    value: 25000,
    fees: 25.0,
  },
  {
    id: 2,
    date: "2024-03-14",
    type: "sell",
    symbol: "VRE",
    name: "Vincom Retail",
    sector: "retail",
    shares: 500,
    price: 32.8,
    value: 16400,
    fees: 16.4,
  },
  {
    id: 3,
    date: "2024-03-13",
    type: "buy",
    symbol: "FPT",
    name: "FPT Corporation",
    sector: "technology",
    shares: 200,
    price: 85.5,
    value: 17100,
    fees: 17.1,
  },
  {
    id: 4,
    date: "2024-03-12",
    type: "buy",
    symbol: "TCB",
    name: "Techcombank",
    sector: "banking",
    shares: 1000,
    price: 42.8,
    value: 42800,
    fees: 42.8,
  },
  {
    id: 5,
    date: "2024-03-11",
    type: "sell",
    symbol: "VCG",
    name: "Vietnam Construction",
    sector: "construction",
    shares: 800,
    price: 15.2,
    value: 12160,
    fees: 12.16,
  },
  {
    id: 6,
    date: "2024-03-10",
    type: "buy",
    symbol: "VNM",
    name: "Vinamilk",
    sector: "consumer",
    shares: 300,
    price: 65.5,
    value: 19650,
    fees: 19.65,
  },
  {
    id: 7,
    date: "2024-03-09",
    type: "sell",
    symbol: "MSN",
    name: "Masan Group",
    sector: "consumer",
    shares: 400,
    price: 78.2,
    value: 31280,
    fees: 31.28,
  },
  {
    id: 8,
    date: "2024-03-08",
    type: "buy",
    symbol: "VJC",
    name: "Vietjet Aviation",
    sector: "transportation",
    shares: 600,
    price: 95.0,
    value: 57000,
    fees: 57.0,
  },
  {
    id: 9,
    date: "2024-03-07",
    type: "buy",
    symbol: "GVR",
    name: "GVR Group",
    sector: "realEstate",
    shares: 700,
    price: 45.5,
    value: 31850,
    fees: 31.85,
  },
  {
    id: 10,
    date: "2024-03-06",
    type: "sell",
    symbol: "PLX",
    name: "Petrolimex",
    sector: "energy",
    shares: 900,
    price: 55.8,
    value: 50220,
    fees: 50.22,
  },
  {
    id: 11,
    date: "2024-03-05",
    type: "buy",
    symbol: "VHM",
    name: "Vinhomes",
    sector: "realEstate",
    shares: 500,
    price: 88.5,
    value: 44250,
    fees: 44.25,
  },
  {
    id: 12,
    date: "2024-03-04",
    type: "sell",
    symbol: "MWG",
    name: "Mobile World",
    sector: "retail",
    shares: 400,
    price: 42.2,
    value: 16880,
    fees: 16.88,
  },
  {
    id: 13,
    date: "2024-03-03",
    type: "buy",
    symbol: "SAB",
    name: "Sabeco",
    sector: "consumer",
    shares: 300,
    price: 185.5,
    value: 55650,
    fees: 55.65,
  },
  {
    id: 14,
    date: "2024-03-02",
    type: "buy",
    symbol: "VIB",
    name: "Vietnam International Bank",
    sector: "banking",
    shares: 800,
    price: 35.8,
    value: 28640,
    fees: 28.64,
  },
  {
    id: 15,
    date: "2024-03-01",
    type: "sell",
    symbol: "DXG",
    name: "Dat Xanh Group",
    sector: "realEstate",
    shares: 600,
    price: 28.5,
    value: 17100,
    fees: 17.1,
  },
  {
    id: 16,
    date: "2024-02-28",
    type: "buy",
    symbol: "ACB",
    name: "Asia Commercial Bank",
    sector: "banking",
    shares: 700,
    price: 32.8,
    value: 22960,
    fees: 22.96,
  },
  {
    id: 17,
    date: "2024-02-27",
    type: "sell",
    symbol: "KDC",
    name: "KIDO Group",
    sector: "consumer",
    shares: 400,
    price: 45.5,
    value: 18200,
    fees: 18.2,
  },
  {
    id: 18,
    date: "2024-02-26",
    type: "buy",
    symbol: "BID",
    name: "BIDV Bank",
    sector: "banking",
    shares: 900,
    price: 48.2,
    value: 43380,
    fees: 43.38,
  },
  {
    id: 19,
    date: "2024-02-25",
    type: "buy",
    symbol: "CTG",
    name: "Commercial Bank",
    sector: "banking",
    shares: 500,
    price: 42.5,
    value: 21250,
    fees: 21.25,
  },
  {
    id: 20,
    date: "2024-02-24",
    type: "sell",
    symbol: "FLC",
    name: "FLC Group",
    sector: "realEstate",
    shares: 800,
    price: 15.8,
    value: 12640,
    fees: 12.64,
  },
  {
    id: 21,
    date: "2024-02-23",
    type: "buy",
    symbol: "HDB",
    name: "HDBank",
    sector: "banking",
    shares: 600,
    price: 38.5,
    value: 23100,
    fees: 23.1,
  },
  {
    id: 22,
    date: "2024-02-22",
    type: "sell",
    symbol: "POW",
    name: "PetroVietnam Power",
    sector: "energy",
    shares: 400,
    price: 28.2,
    value: 11280,
    fees: 11.28,
  },
  {
    id: 23,
    date: "2024-02-21",
    type: "buy",
    symbol: "SHB",
    name: "SHB Bank",
    sector: "banking",
    shares: 700,
    price: 25.5,
    value: 17850,
    fees: 17.85,
  },
  {
    id: 24,
    date: "2024-02-20",
    type: "buy",
    symbol: "STB",
    name: "Sacombank",
    sector: "banking",
    shares: 500,
    price: 32.8,
    value: 16400,
    fees: 16.4,
  },
  {
    id: 25,
    date: "2024-02-19",
    type: "sell",
    symbol: "TPB",
    name: "TPBank",
    sector: "banking",
    shares: 300,
    price: 45.5,
    value: 13650,
    fees: 13.65,
  },
  {
    id: 26,
    date: "2024-02-18",
    type: "buy",
    symbol: "VNM",
    name: "Vinamilk",
    sector: "consumer",
    shares: 400,
    price: 68.5,
    value: 27400,
    fees: 27.4,
  },
  {
    id: 27,
    date: "2024-02-17",
    type: "sell",
    symbol: "MSN",
    name: "Masan Group",
    sector: "consumer",
    shares: 200,
    price: 82.2,
    value: 16440,
    fees: 16.44,
  },
  {
    id: 28,
    date: "2024-02-16",
    type: "buy",
    symbol: "VJC",
    name: "Vietjet Aviation",
    sector: "transportation",
    shares: 500,
    price: 92.0,
    value: 46000,
    fees: 46.0,
  },
  {
    id: 29,
    date: "2024-02-15",
    type: "buy",
    symbol: "GVR",
    name: "GVR Group",
    sector: "realEstate",
    shares: 600,
    price: 42.5,
    value: 25500,
    fees: 25.5,
  },
  {
    id: 30,
    date: "2024-02-14",
    type: "sell",
    symbol: "PLX",
    name: "Petrolimex",
    sector: "energy",
    shares: 700,
    price: 58.8,
    value: 41160,
    fees: 41.16,
  },
  {
    id: 31,
    date: "2024-02-13",
    type: "buy",
    symbol: "VHM",
    name: "Vinhomes",
    sector: "realEstate",
    shares: 400,
    price: 92.5,
    value: 37000,
    fees: 37.0,
  },
  {
    id: 32,
    date: "2024-02-12",
    type: "sell",
    symbol: "MWG",
    name: "Mobile World",
    sector: "retail",
    shares: 300,
    price: 45.2,
    value: 13560,
    fees: 13.56,
  },
  {
    id: 33,
    date: "2024-02-11",
    type: "buy",
    symbol: "SAB",
    name: "Sabeco",
    sector: "consumer",
    shares: 200,
    price: 195.5,
    value: 39100,
    fees: 39.1,
  },
  {
    id: 34,
    date: "2024-02-10",
    type: "buy",
    symbol: "VIB",
    name: "Vietnam International Bank",
    sector: "banking",
    shares: 600,
    price: 38.8,
    value: 23280,
    fees: 23.28,
  },
  {
    id: 35,
    date: "2024-02-09",
    type: "sell",
    symbol: "DXG",
    name: "Dat Xanh Group",
    sector: "realEstate",
    shares: 500,
    price: 32.5,
    value: 16250,
    fees: 16.25,
  },
];

const transactionTypes = ["ALL", "BUY", "SELL"];

// Add new sample data for sector distribution
const sectorData = [
  { name: "Banking", value: 25.0, color: "#ED64A6" },
  { name: "Real Estate", value: 20.0, color: "#B794F4" },
  { name: "Consumer", value: 15.0, color: "#F6E05E" },
  { name: "Technology", value: 10.0, color: "#4299E1" },
  { name: "Steel", value: 8.0, color: "#F6AD55" },
  { name: "Retail", value: 7.0, color: "#9F7AEA" },
  { name: "Transportation", value: 7.0, color: "#63B3ED" },
  { name: "Energy", value: 5.0, color: "#F56565" },
  { name: "Construction", value: 3.0, color: "#48BB78" },
];

// Add sample data for frequently traded stocks
const frequentlyTradedStocks = [
  {
    symbol: "VNM",
    name: "Vinamilk",
    transactions: 4,
    percentage: 15.0,
  },
  {
    symbol: "VJC",
    name: "Vietjet Aviation",
    transactions: 4,
    percentage: 12.0,
  },
  {
    symbol: "MSN",
    name: "Masan Group",
    transactions: 3,
    percentage: 10.0,
  },
  {
    symbol: "VHM",
    name: "Vinhomes",
    transactions: 3,
    percentage: 9.0,
  },
  {
    symbol: "GVR",
    name: "GVR Group",
    transactions: 3,
    percentage: 8.0,
  },
  {
    symbol: "SAB",
    name: "Sabeco",
    transactions: 2,
    percentage: 7.0,
  },
  {
    symbol: "PLX",
    name: "Petrolimex",
    transactions: 2,
    percentage: 6.0,
  },
  {
    symbol: "MWG",
    name: "Mobile World",
    transactions: 2,
    percentage: 5.0,
  },
  {
    symbol: "FPT",
    name: "FPT Corporation",
    transactions: 2,
    percentage: 4.0,
  },
  {
    symbol: "HPG",
    name: "Hoa Phat Group",
    transactions: 1,
    percentage: 3.0,
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

// Add sector color mapping
const sectorColors = {
  steel: "#F6AD55", // Orange
  retail: "#9F7AEA", // Purple
  construction: "#48BB78", // Green
  technology: "#4299E1", // Blue
  banking: "#ED64A6", // Pink
  consumer: "#F6E05E", // Yellow
  transportation: "#63B3ED", // Light Blue
  realEstate: "#B794F4", // Light Purple
  energy: "#F56565", // Red
} as const;

// Add transaction type colors
const transactionTypeColors = {
  buy: {
    background: "rgba(72, 187, 120, 0.1)",
    color: "#48BB78",
    border: "rgba(72, 187, 120, 0.2)",
  },
  sell: {
    background: "rgba(245, 101, 101, 0.1)",
    color: "#F56565",
    border: "rgba(245, 101, 101, 0.2)",
  },
};

const TransactionHistory: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [isSectorLoading, setIsSectorLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "ALL",
    minValue: "",
    maxValue: "",
    startDate: null,
    endDate: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorDateRange, setSectorDateRange] = useState({
    startDate: null, // Set to null to show all-time data
    endDate: new Date(),
  });

  // Function to calculate sector distribution based on date range
  const calculateSectorDistribution = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (startDate && transactionDate < startDate) return false;
      if (endDate && transactionDate > endDate) return false;
      return true;
    });

    // Calculate total value for each sector
    const sectorTotals = filteredTransactions.reduce((acc, transaction) => {
      const sector = transaction.sector;
      acc[sector] = (acc[sector] || 0) + transaction.value;
      return acc;
    }, {} as Record<string, number>);

    // Calculate total value across all sectors
    const totalValue = Object.values(sectorTotals).reduce(
      (sum, value) => sum + value,
      0
    );

    // Convert to percentage and format data
    return Object.entries(sectorTotals).map(([sector, value]) => ({
      name: sector.charAt(0).toUpperCase() + sector.slice(1),
      value: Number(((value / totalValue) * 100).toFixed(1)),
      color: sectorColors[sector as keyof typeof sectorColors],
    }));
  };

  // Function to calculate summary metrics based on date range
  const calculateSummaryMetrics = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (startDate && transactionDate < startDate) return false;
      if (endDate && transactionDate > endDate) return false;
      return true;
    });

    const totalTransactions = filteredTransactions.length;
    const sellTransactions = filteredTransactions.filter(
      (t) => t.type === "sell"
    );
    const profitableTransactions = sellTransactions.filter(
      (t) => ((t.price - 25) / 25) * 100 > 0
    );

    return {
      totalTransactions,
      profitablePercentage:
        totalTransactions > 0
          ? Number(
              (
                (profitableTransactions.length / sellTransactions.length) *
                100
              ).toFixed(1)
            )
          : 0,
      averageHoldingDays: 301, // This would need actual holding period data
      averageProfitPercentage: 8.7, // This would need actual profit data
      averageLossPercentage: -22.3, // This would need actual loss data
      totalProfitLossPercentage: 16.25, // This would need actual P/L data
    };
  };

  // Update sector data when date range changes
  const handleSectorDateRangeChange = (field: string, value: Date | null) => {
    setIsSectorLoading(true);
    setSectorDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTimeout(() => {
      setIsSectorLoading(false);
    }, 800);
  };

  // Calculate current sector data based on selected date range
  const currentSectorData = calculateSectorDistribution(
    sectorDateRange.startDate,
    sectorDateRange.endDate
  );

  // Calculate current summary metrics based on selected date range
  const currentSummaryMetrics = calculateSummaryMetrics(
    sectorDateRange.startDate,
    sectorDateRange.endDate
  );

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

  const filteredTransactions = transactions.filter((transaction) => {
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
  });

  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    Math.min((page + 1) * rowsPerPage, filteredTransactions.length)
  );

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const hasNextPage = (page + 1) * rowsPerPage < filteredTransactions.length;

  const content = (
    <>
      {/* Summary Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(95, 61, 196, 0.2)"
                  : "rgba(107, 70, 193, 0.1)"
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(95, 61, 196, 0.15)"
                    : "0 8px 24px rgba(107, 70, 193, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1.5,
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                Transactions
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  background: "#6B46C1",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  mb: 1,
                }}
              >
                {currentSummaryMetrics.totalTransactions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(95, 61, 196, 0.2)"
                  : "rgba(107, 70, 193, 0.1)"
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(95, 61, 196, 0.15)"
                    : "0 8px 24px rgba(107, 70, 193, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1.5,
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                Profit Ratio
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  background: "#48BB78",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  mb: 1,
                }}
              >
                {currentSummaryMetrics.profitablePercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(95, 61, 196, 0.2)"
                  : "rgba(107, 70, 193, 0.1)"
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(95, 61, 196, 0.15)"
                    : "0 8px 24px rgba(107, 70, 193, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1.5,
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                Avg Holding Days
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: 700,
                  fontSize: "2rem",
                }}
              >
                {currentSummaryMetrics.averageHoldingDays} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(95, 61, 196, 0.2)"
                  : "rgba(107, 70, 193, 0.1)"
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(95, 61, 196, 0.15)"
                    : "0 8px 24px rgba(107, 70, 193, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1.5,
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                Avg Profit
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  background: "#48BB78",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  mb: 1,
                }}
              >
                {formatCurrency(currentSummaryMetrics.averageProfitPercentage)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(95, 61, 196, 0.2)"
                  : "rgba(107, 70, 193, 0.1)"
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(95, 61, 196, 0.15)"
                    : "0 8px 24px rgba(107, 70, 193, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1.5,
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                Avg Loss
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  background: "#DD6B20",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  mb: 1,
                }}
              >
                {formatCurrency(currentSummaryMetrics.averageLossPercentage)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card
            sx={{
              borderRadius: "16px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(95, 61, 196, 0.2)"
                  : "rgba(107, 70, 193, 0.1)"
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(95, 61, 196, 0.15)"
                    : "0 8px 24px rgba(107, 70, 193, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  mb: 1.5,
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                P/L (%)
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  background: "#48BB78",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  mb: 1,
                }}
              >
                {currentSummaryMetrics.totalProfitLossPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sector Distribution and Trading Details */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Sector Distribution */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "20px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(95, 61, 196, 0.2)"
                  : "rgba(107, 70, 193, 0.1)"
              }`,
              height: "100%",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(95, 61, 196, 0.15)"
                    : "0 8px 24px rgba(107, 70, 193, 0.1)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  Sector Distribution
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(95, 61, 196, 0.2)"
                        : "rgba(243, 232, 253, 0.2)",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(95, 61, 196, 0.1)"
                        : "rgba(107, 70, 193, 0.1)"
                    }`,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(95, 61, 196, 0.25)"
                          : "rgba(243, 232, 253, 0.25)",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(95, 61, 196, 0.2)"
                          : "rgba(107, 70, 193, 0.2)"
                      }`,
                    },
                  }}
                >
                  <DatePicker
                    label="Start Date"
                    value={sectorDateRange.startDate}
                    onChange={(newValue) =>
                      handleSectorDateRangeChange("startDate", newValue)
                    }
                    sx={{
                      width: 140,
                      "& .MuiInputLabel-root": {
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      },
                      "& .MuiInputBase-root": {
                        fontSize: "14px",
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          theme.palette.mode === "dark"
                            ? "rgba(95, 61, 196, 0.2)"
                            : "rgba(107, 70, 193, 0.2)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          theme.palette.mode === "dark"
                            ? "rgba(95, 61, 196, 0.3)"
                            : "rgba(107, 70, 193, 0.3)",
                      },
                    }}
                  />
                  <DatePicker
                    label="End Date"
                    value={sectorDateRange.endDate}
                    onChange={(newValue) =>
                      handleSectorDateRangeChange("endDate", newValue)
                    }
                    sx={{
                      width: 140,
                      "& .MuiInputLabel-root": {
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      },
                      "& .MuiInputBase-root": {
                        fontSize: "14px",
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          theme.palette.mode === "dark"
                            ? "rgba(95, 61, 196, 0.2)"
                            : "rgba(107, 70, 193, 0.2)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          theme.palette.mode === "dark"
                            ? "rgba(95, 61, 196, 0.3)"
                            : "rgba(107, 70, 193, 0.3)",
                      },
                    }}
                  />
                </Box>
              </Box>
              <LoadingEffect isLoading={isSectorLoading} type="content">
                <Box
                  sx={{
                    height: 200,
                    position: "relative",
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(95, 61, 196, 0.3)"
                        : "rgba(255, 255, 255, 0.5)",
                    borderRadius: "12px",
                    p: 1.5,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {currentSectorData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={currentSectorData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {currentSectorData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke={
                                theme.palette.mode === "dark"
                                  ? "rgba(233, 216, 253, 0.1)"
                                  : "rgba(107, 70, 193, 0.1)"
                              }
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => `${value}%`}
                          contentStyle={{
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "#1E1B4B"
                                : "#FFFFFF",
                            borderRadius: "8px",
                            border: `1px solid ${
                              theme.palette.mode === "dark"
                                ? "rgba(233, 216, 253, 0.2)"
                                : "rgba(107, 70, 193, 0.1)"
                            }`,
                            boxShadow:
                              theme.palette.mode === "dark"
                                ? "0 4px 12px rgba(233, 216, 253, 0.1)"
                                : "0 4px 12px rgba(107, 70, 193, 0.1)",
                          }}
                          labelStyle={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                          fontWeight: 500,
                        }}
                      >
                        No data available
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                          opacity: 0.7,
                        }}
                      >
                        Try adjusting the date range
                      </Typography>
                    </Box>
                  )}
                </Box>
              </LoadingEffect>
              <Box
                sx={{
                  mt: 2,
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, rgba(95, 61, 196, 0.3) 0%, rgba(95, 61, 196, 0.2) 100%)"
                      : "rgba(255, 255, 255, 0.5)",
                  borderRadius: "12px",
                  p: 1.5,
                  backdropFilter: "blur(10px)",
                }}
              >
                {currentSectorData.length > 0 ? (
                  currentSectorData.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        p: 0.5,
                        borderRadius: "6px",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(233, 216, 253, 0.1)"
                              : "rgba(107, 70, 193, 0.05)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                          mr: 1.5,
                          boxShadow: `0 2px 4px ${item.color}40`,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                          flex: 1,
                          fontWeight: 500,
                          fontSize: "0.8rem",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                        }}
                      >
                        {item.value}%
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        opacity: 0.7,
                      }}
                    >
                      No sectors to display
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Frequently Traded Stocks */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "20px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(95, 61, 196, 0.2)"
                  : "rgba(107, 70, 193, 0.1)"
              }`,
              height: "100%",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(95, 61, 196, 0.15)"
                    : "0 8px 24px rgba(107, 70, 193, 0.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: 700,
                  mb: 2,
                  fontSize: "1.1rem",
                  letterSpacing: "0.5px",
                }}
              >
                Frequently Traded Stocks
              </Typography>
              <TableContainer
                sx={{
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(30, 27, 75, 0.3)"
                      : "rgba(255, 255, 255, 0.5)",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#E9D8FD"
                              : "#6B46C1",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          pb: 1,
                          pt: 1.5,
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
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          pb: 1,
                          pt: 1.5,
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
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          pb: 1,
                          pt: 1.5,
                        }}
                      >
                        Weight
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {frequentlyTradedStocks.map((stock) => (
                      <TableRow
                        key={stock.symbol}
                        sx={{
                          transition: "all 0.2s ease",
                          "&:hover": {
                            background:
                              theme.palette.mode === "dark"
                                ? "rgba(233, 216, 253, 0.1)"
                                : "rgba(107, 70, 193, 0.05)",
                          },
                        }}
                      >
                        <TableCell sx={{ py: 0.75 }}>
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
                                fontWeight: 600,
                                fontSize: "0.8rem",
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
                                fontSize: "0.7rem",
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
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            py: 0.75,
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
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            py: 0.75,
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
      </Grid>

      {/* Transaction List */}
      <Card
        sx={{
          borderRadius: "20px",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(95, 61, 196, 0.15) 0%, rgba(95, 61, 196, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
          backdropFilter: "blur(10px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(95, 61, 196, 0.2)"
              : "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(95, 61, 196, 0.2)"
              : "rgba(255, 255, 255, 0.2)"
          }`,
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
                    ? "linear-gradient(135deg, rgba(95, 61, 196, 0.3) 0%, rgba(95, 61, 196, 0.2) 100%)"
                    : "linear-gradient(135deg, rgba(243, 232, 253, 0.3) 0%, rgba(233, 216, 253, 0.3) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                p: { xs: 2, sm: 3 },
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(95, 61, 196, 0.1)"
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
                sx={{
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, rgba(95, 61, 196, 0.3) 0%, rgba(95, 61, 196, 0.2) 100%)"
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(95, 61, 196, 0.2)"
                      : "rgba(255, 255, 255, 0.2)"
                  }`,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 4px 6px -1px rgba(95, 61, 196, 0.3), 0 2px 4px -1px rgba(95, 61, 196, 0.2)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.9)"
                              : "rgba(0, 0, 0, 0.87)",
                          fontWeight: 500,
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        Type
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        Symbol
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        Shares
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        Value
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        Fees
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                          borderBottom: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.12)"
                          }`,
                          py: 1.5,
                        }}
                      >
                        P/L (%)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedTransactions.map((transaction) => {
                      // Calculate P/L for sell transactions
                      const profitLoss =
                        transaction.type === "sell"
                          ? ((transaction.price - 25) / 25) * 100 // Using a base price of 25 for demonstration
                          : 0;

                      return (
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
                                  ? "rgba(255, 255, 255, 0.9)"
                                  : "rgba(0, 0, 0, 0.87)",
                              fontWeight: 500,
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            {transaction.date}
                          </TableCell>
                          <TableCell
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            <Chip
                              label={transaction.type.toUpperCase()}
                              size="small"
                              sx={{
                                backgroundColor:
                                  transactionTypeColors[transaction.type]
                                    .background,
                                color:
                                  transactionTypeColors[transaction.type].color,
                                fontWeight: 600,
                                border: `1px solid ${
                                  transactionTypeColors[transaction.type].border
                                }`,
                                "&:hover": {
                                  backgroundColor:
                                    transactionTypeColors[transaction.type]
                                      .background,
                                  opacity: 0.9,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Chip
                                label={transaction.symbol}
                                size="small"
                                sx={{
                                  backgroundColor:
                                    sectorColors[transaction.sector],
                                  color: "#FFFFFF",
                                  fontWeight: 600,
                                  "&:hover": {
                                    backgroundColor:
                                      sectorColors[transaction.sector],
                                    opacity: 0.9,
                                  },
                                }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            {transaction.name}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            {transaction.shares}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            ${transaction.price.toFixed(2)}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            ${transaction.value.toLocaleString()}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            ${transaction.fees.toFixed(2)}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.7)"
                                  : "rgba(0, 0, 0, 0.6)",
                              borderBottom: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.12)"
                              }`,
                              py: 1.5,
                            }}
                          >
                            {profitLoss > 0
                              ? `+${profitLoss.toFixed(2)}`
                              : profitLoss.toFixed(2)}
                            %
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                      ? "linear-gradient(135deg, rgba(95, 61, 196, 0.6) 0%, rgba(95, 61, 196, 0.5) 100%)"
                      : "linear-gradient(135deg, rgba(243, 232, 253, 0.6) 0%, rgba(233, 216, 253, 0.6) 100%)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: { xs: "2px", sm: "4px" },
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(95, 61, 196, 0.2)"
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

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default TransactionHistory;
