import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  Tabs,
  Tab,
  Chip,
  Link,
  Divider,
  Button,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";

// Sample data - using the same data from StockList
const portfolioData = {
  stocks: [
    {
      symbol: "HPG",
      name: "Hoa Phat Group",
      value: 142500,
      color: "#9B8AFB",
      sector: "Materials",
      gainLoss: 14.0,
    },
    {
      symbol: "VRE",
      name: "Vincom Retail",
      value: 65600,
      color: "#B4A9FF",
      sector: "Real Estate",
      gainLoss: -6.3,
    },
    {
      symbol: "VCG",
      name: "Vietnam Construction",
      value: 45600,
      color: "#7A6DF9",
      sector: "Construction",
      gainLoss: 8.6,
    },
    {
      symbol: "FPT",
      name: "FPT Corporation",
      value: 85500,
      color: "#E6B3B3",
      sector: "Technology",
      gainLoss: 14.0,
    },
    {
      symbol: "TCB",
      name: "Techcombank",
      value: 107000,
      color: "#A8D1B2",
      sector: "Finance",
      gainLoss: 12.6,
    },
  ],
  monthlyData: [
    { date: "Jan", value: 170000, vni: 165000 },
    { date: "Feb", value: 215000, vni: 180000 },
    { date: "Mar", value: 225000, vni: 190000 },
    { date: "Apr", value: 230000, vni: 195000 },
    { date: "May", value: 240000, vni: 200000 },
    { date: "Jun", value: 250000, vni: 210000 },
  ],
  quarterlyData: [
    { date: "Q1", value: 225000, vni: 190000 },
    { date: "Q2", value: 240000, vni: 200000 },
    { date: "Q3", value: 245000, vni: 205000 },
    { date: "Q4", value: 250000, vni: 210000 },
  ],
  yearlyData: [
    { date: "2020", value: 180000, vni: 160000 },
    { date: "2021", value: 210000, vni: 180000 },
    { date: "2022", value: 230000, vni: 195000 },
    { date: "2023", value: 250000, vni: 210000 },
  ],
  monthlyPnL: [
    { month: "Apr/2024", profit: -15000 },
    { month: "May/2024", profit: -8000 },
    { month: "Jun/2024", profit: -12000 },
    { month: "Jul/2024", profit: 5000 },
    { month: "Aug/2024", profit: 8000 },
    { month: "Sep/2024", profit: 6000 },
    { month: "Oct/2024", profit: -10000 },
    { month: "Nov/2024", profit: 15000 },
    { month: "Dec/2024", profit: 20000 },
    { month: "Jan/2025", profit: 12000 },
    { month: "Feb/2025", profit: 18000 },
    { month: "Mar/2025", profit: 22000 },
  ],
  monthlyRisk: [
    { month: "Apr/2024", risk: 7.5 },
    { month: "May/2024", risk: 6.8 },
    { month: "Jun/2024", risk: 7.2 },
    { month: "Jul/2024", risk: 7.0 },
    { month: "Aug/2024", risk: 7.2 },
    { month: "Sep/2024", risk: 6.5 },
    { month: "Oct/2024", risk: 8.5 },
    { month: "Nov/2024", risk: 6.2 },
    { month: "Dec/2024", risk: 5.8 },
    { month: "Jan/2025", risk: 6.0 },
    { month: "Feb/2025", risk: 5.5 },
    { month: "Mar/2025", risk: 5.2 },
  ],
};

// Sample news data
const newsData = [
  {
    id: 1,
    title: "HPG Reports Strong Q1 2024 Results with 25% Growth",
    source: "Financial Times",
    date: "2024-03-20",
    category: "Earnings",
    stock: "HPG",
  },
  {
    id: 2,
    title: "VRE Announces New Shopping Mall Development in Hanoi",
    source: "Bloomberg",
    date: "2024-03-19",
    category: "Business",
    stock: "VRE",
  },
  {
    id: 3,
    title: "FPT Corporation Secures Major IT Contract in Southeast Asia",
    source: "Reuters",
    date: "2024-03-18",
    category: "Contracts",
    stock: "FPT",
  },
  {
    id: 4,
    title: "TCB Launches New Digital Banking Platform",
    source: "TechCrunch",
    date: "2024-03-17",
    category: "Technology",
    stock: "TCB",
  },
  {
    id: 5,
    title: "VCG Wins Infrastructure Project in Ho Chi Minh City",
    source: "Construction Weekly",
    date: "2024-03-16",
    category: "Projects",
    stock: "VCG",
  },
];

interface Transaction {
  id: number;
  date: string;
  type: "buy" | "sell";
  symbol: string;
  name: string;
  sector: string;
  shares: number;
  price: number;
  value: number;
  fees: number;
}

const Overview: React.FC = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    endDate: new Date(),
  });
  const [timeRange, setTimeRange] = useState(0);
  const [viewMode, setViewMode] = useState<"name" | "sector">("name");

  // Sample transactions data for the past 30 days
  const transactions: Transaction[] = [
    {
      id: 1,
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      type: "buy",
      symbol: "HPG",
      name: "Hoa Phat Group",
      sector: "Materials",
      shares: 100,
      price: 25,
      value: 2500,
      fees: 10,
    },
    {
      id: 2,
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      type: "sell",
      symbol: "VRE",
      name: "Vincom Retail",
      sector: "Real Estate",
      shares: 50,
      price: 30,
      value: 1500,
      fees: 10,
    },
    // Add more sample transactions as needed
  ];

  // Function to calculate metrics for the past 30 days
  const calculateMetrics = () => {
    const filteredTransactions = transactions.filter(
      (transaction: Transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= dateRange.startDate &&
          transactionDate <= dateRange.endDate
        );
      }
    );

    const totalValue = filteredTransactions.reduce(
      (sum: number, t: Transaction) => sum + t.value,
      0
    );
    const totalFees = filteredTransactions.reduce(
      (sum: number, t: Transaction) => sum + t.fees,
      0
    );
    const buyTransactions = filteredTransactions.filter(
      (t: Transaction) => t.type === "buy"
    );
    const sellTransactions = filteredTransactions.filter(
      (t: Transaction) => t.type === "sell"
    );

    return {
      totalValue,
      totalFees,
      buyCount: buyTransactions.length,
      sellCount: sellTransactions.length,
      averageTransactionValue: totalValue / filteredTransactions.length,
    };
  };

  const metrics = calculateMetrics();

  React.useEffect(() => {
    // Simulate loading state for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTimeRangeChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTimeRange(newValue);
  };

  const getPerformanceData = () => {
    switch (timeRange) {
      case 0:
        return portfolioData.monthlyData;
      case 1:
        return portfolioData.quarterlyData;
      case 2:
        return portfolioData.yearlyData;
      default:
        return portfolioData.monthlyData;
    }
  };

  const getSectorData = () => {
    const sectorMap = new Map<string, number>();
    portfolioData.stocks.forEach((stock) => {
      const currentValue = sectorMap.get(stock.sector) || 0;
      sectorMap.set(stock.sector, currentValue + stock.value);
    });

    return Array.from(sectorMap.entries()).map(([sector, value]) => ({
      sector,
      value,
    }));
  };

  const getTotalGainLoss = () => {
    const totalValue = portfolioData.stocks.reduce(
      (sum, stock) => sum + stock.value,
      0
    );
    const totalGainLoss = portfolioData.stocks.reduce((sum, stock) => {
      return sum + stock.gainLoss * (stock.value / totalValue);
    }, 0);
    return totalGainLoss;
  };

  const getTotalGainLossColor = () => {
    const gainLoss = getTotalGainLoss();
    return gainLoss >= 0
      ? theme.palette.success.main
      : theme.palette.error.main;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1, md: 3 },
        p: { xs: 0.5, md: 3 },
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Grid container spacing={{ xs: 1, md: 3 }} sx={{ width: "100%" }}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 12px 40px rgba(233, 216, 253, 0.2)"
                    : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
              borderRadius: "20px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.2)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.9) 0%, rgba(30, 27, 75, 0.9) 100%)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(233, 216, 253, 0.2)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #9F7AEA, #E9D8FD)"
                    : "linear-gradient(90deg, #6B46C1, #9F7AEA)",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: 0.9,
                  mb: { xs: 1.5, sm: 2 },
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Total Portfolio Value
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #E9D8FD 0%, #9F7AEA 100%)"
                      : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2rem",
                }}
              >
                $
                {portfolioData.stocks
                  .reduce((acc, stock) => acc + stock.value, 0)
                  .toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 12px 40px rgba(233, 216, 253, 0.2)"
                    : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
              borderRadius: "20px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.2)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.9) 0%, rgba(30, 27, 75, 0.9) 100%)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(233, 216, 253, 0.2)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #2e7d32, #81C784)",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: 0.9,
                  mb: { xs: 1.5, sm: 2 },
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Number of Stocks
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #E9D8FD 0%, #9F7AEA 100%)"
                      : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2rem",
                }}
              >
                {portfolioData.stocks.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 12px 40px rgba(233, 216, 253, 0.2)"
                    : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
              borderRadius: "20px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.2)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.9) 0%, rgba(30, 27, 75, 0.9) 100%)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(233, 216, 253, 0.2)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: 0.9,
                  mb: { xs: 1.5, sm: 2 },
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                Largest Position
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #E9D8FD 0%, #9F7AEA 100%)"
                      : "linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2rem",
                }}
              >
                {
                  portfolioData.stocks.reduce((max, stock) =>
                    stock.value > max.value ? stock : max
                  ).symbol
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 12px 40px rgba(233, 216, 253, 0.2)"
                    : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
              borderRadius: "20px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.2)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.9) 0%, rgba(30, 27, 75, 0.9) 100%)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(233, 216, 253, 0.2)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #2e7d32, #81C784)",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: 0.9,
                  mb: { xs: 1.5, sm: 2 },
                  color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                YTD Return
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #2e7d32 0%, #81C784 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "2rem",
                }}
              >
                +16.25%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Performance */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              mb: { xs: 1, sm: 3 },
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
                  mb: { xs: 1, sm: 2 },
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                      : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    width: "60px",
                    height: "4px",
                    background: "linear-gradient(90deg, #FF9800, #FFB74D)",
                    borderRadius: "2px",
                  },
                }}
              >
                Portfolio Performance
              </Typography>
              <Tabs
                value={timeRange}
                onChange={handleTimeRangeChange}
                sx={{
                  mb: 2,
                  "& .MuiTabs-indicator": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                        : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                  },
                  "& .MuiTab-root": {
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                    "&.Mui-selected": {
                      color:
                        theme.palette.mode === "dark" ? "#9F7AEA" : "#6B46C1",
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <Tab label="Monthly" />
                <Tab label="Quarterly" />
                <Tab label="Yearly" />
              </Tabs>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={getPerformanceData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
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
                          theme.palette.mode === "dark" ? "#9F7AEA" : "#6B46C1"
                        }
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={
                          theme.palette.mode === "dark" ? "#9F7AEA" : "#6B46C1"
                        }
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="vniGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={
                          theme.palette.mode === "dark" ? "#FF9800" : "#FF9800"
                        }
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={
                          theme.palette.mode === "dark" ? "#FF9800" : "#FF9800"
                        }
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={
                      theme.palette.mode === "dark"
                        ? "rgba(233, 216, 253, 0.1)"
                        : "rgba(107, 70, 193, 0.1)"
                    }
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke={
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1"
                    }
                    tick={{
                      fill:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      fontSize: "0.875rem",
                    }}
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis
                    stroke={
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1"
                    }
                    tick={{
                      fill:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      fontSize: "0.875rem",
                    }}
                    padding={{ top: 20, bottom: 20 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, rgba(49, 46, 129, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)"
                          : "linear-gradient(135deg, rgba(243, 232, 253, 0.95) 0%, rgba(233, 216, 253, 0.95) 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                      backdropFilter: "blur(8px)",
                      padding: "12px 16px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                    labelStyle={{
                      color:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                    itemStyle={{
                      color:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      fontSize: "0.875rem",
                    }}
                    formatter={(value: number, name: string) => {
                      const formattedValue = `$${value.toLocaleString()}`;
                      const percentage = (
                        ((value - getPerformanceData()[0].value) /
                          getPerformanceData()[0].value) *
                        100
                      ).toFixed(2);
                      return [formattedValue, `${name} (${percentage}%)`];
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Portfolio"
                    stroke={
                      theme.palette.mode === "dark" ? "#9F7AEA" : "#6B46C1"
                    }
                    strokeWidth={2.5}
                    fill="url(#portfolioGradient)"
                    dot={{
                      fill:
                        theme.palette.mode === "dark" ? "#9F7AEA" : "#6B46C1",
                      stroke:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#FFFFFF",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{
                      fill:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#9F7AEA",
                      stroke:
                        theme.palette.mode === "dark" ? "#9F7AEA" : "#6B46C1",
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="vni"
                    name="VN-Index"
                    stroke={
                      theme.palette.mode === "dark" ? "#FF9800" : "#FF9800"
                    }
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    fill="url(#vniGradient)"
                    dot={{
                      r: 3,
                      fill:
                        theme.palette.mode === "dark" ? "#FF9800" : "#FF9800",
                      stroke:
                        theme.palette.mode === "dark" ? "#FF9800" : "#FF9800",
                      strokeWidth: 1,
                    }}
                    activeDot={{
                      r: 4,
                      fill:
                        theme.palette.mode === "dark" ? "#FF9800" : "#FF9800",
                      stroke:
                        theme.palette.mode === "dark" ? "#FF9800" : "#FF9800",
                      strokeWidth: 1,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Distribution */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: { xs: 2, sm: 3 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                        : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-8px",
                      left: 0,
                      width: "60px",
                      height: "4px",
                      background: "linear-gradient(90deg, #FF9800, #FFB74D)",
                      borderRadius: "2px",
                    },
                  }}
                >
                  Portfolio Distribution
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(233, 216, 253, 0.1)"
                        : "rgba(107, 70, 193, 0.05)",
                    borderRadius: "20px",
                    p: 0.5,
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 4px 12px rgba(233, 216, 253, 0.1)"
                        : "0 4px 12px rgba(107, 70, 193, 0.1)",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: viewMode === "name" ? "4px" : "calc(50% + 4px)",
                      transform: "translateY(-50%)",
                      width: "calc(50% - 4px)",
                      height: "calc(100% - 8px)",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                          : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                      borderRadius: "16px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: 0,
                    },
                  }}
                >
                  <Button
                    variant="text"
                    onClick={() => setViewMode("name")}
                    size="small"
                    sx={{
                      borderRadius: "16px",
                      textTransform: "none",
                      minWidth: "100px",
                      position: "relative",
                      zIndex: 1,
                      color:
                        viewMode === "name"
                          ? theme.palette.mode === "dark"
                            ? "#1E1B4B"
                            : "#FFFFFF"
                          : theme.palette.mode === "dark"
                          ? "#E9D8FD"
                          : "#6B46C1",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        color:
                          viewMode === "name"
                            ? theme.palette.mode === "dark"
                              ? "#1E1B4B"
                              : "#FFFFFF"
                            : theme.palette.mode === "dark"
                            ? "#9F7AEA"
                            : "#6B46C1",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    By Name
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setViewMode("sector")}
                    size="small"
                    sx={{
                      borderRadius: "16px",
                      textTransform: "none",
                      minWidth: "100px",
                      position: "relative",
                      zIndex: 1,
                      color:
                        viewMode === "sector"
                          ? theme.palette.mode === "dark"
                            ? "#1E1B4B"
                            : "#FFFFFF"
                          : theme.palette.mode === "dark"
                          ? "#E9D8FD"
                          : "#6B46C1",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        color:
                          viewMode === "sector"
                            ? theme.palette.mode === "dark"
                              ? "#1E1B4B"
                              : "#FFFFFF"
                            : theme.palette.mode === "dark"
                            ? "#9F7AEA"
                            : "#6B46C1",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    By Sector
                  </Button>
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={
                      viewMode === "name"
                        ? portfolioData.stocks
                        : getSectorData()
                    }
                    dataKey="value"
                    nameKey={viewMode === "name" ? "name" : "sector"}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={80}
                    paddingAngle={5}
                    label={({
                      name,
                      percent,
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius =
                        innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const displayName =
                        (name || "").length > 15
                          ? (name || "").substring(0, 12) + "..."
                          : name || "";
                      const totalItems =
                        viewMode === "name"
                          ? portfolioData?.stocks?.length || 0
                          : getSectorData()?.length || 0;
                      const angleStep = 360 / totalItems;
                      const labelRadius = outerRadius + 40;
                      const labelX =
                        cx + labelRadius * Math.cos(-midAngle * RADIAN);
                      const labelY =
                        cy + labelRadius * Math.sin(-midAngle * RADIAN);
                      return (
                        <g>
                          <text
                            x={x}
                            y={y}
                            fill={
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1"
                            }
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                              fontSize: "14px",
                              fontWeight: 800,
                              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                              letterSpacing: "0.5px",
                              opacity: 1,
                            }}
                          >
                            {(percent * 100).toFixed(0)}%
                          </text>
                          <text
                            x={labelX}
                            y={labelY}
                            fill={
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1"
                            }
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                              fontSize: "14px",
                              fontWeight: 800,
                              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                              letterSpacing: "0.5px",
                              opacity: 1,
                            }}
                          >
                            {displayName}
                          </text>
                        </g>
                      );
                    }}
                    labelLine={{
                      stroke:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      strokeWidth: 2.5,
                      opacity: 0.7,
                    }}
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      fill:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                      letterSpacing: "0.5px",
                      opacity: 1,
                    }}
                    animationBegin={0}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {portfolioData.stocks.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index % 3 === 0
                            ? "rgba(183, 148, 244, 0.8)" // Pastel Purple
                            : index % 3 === 1
                            ? "rgba(129, 199, 132, 0.8)" // Pastel Green
                            : "rgba(255, 167, 38, 0.8)" // Pastel Orange
                        }
                        stroke={
                          theme.palette.mode === "dark" ? "#1E1B4B" : "#FFFFFF"
                        }
                        strokeWidth={2}
                        style={{
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          filter: "brightness(1)",
                        }}
                        onMouseEnter={(e) => {
                          if (e.currentTarget) {
                            e.currentTarget.style.filter = "brightness(1.2)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (e.currentTarget) {
                            e.currentTarget.style.filter = "brightness(1)";
                          }
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, rgba(49, 46, 129, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)"
                          : "linear-gradient(135deg, rgba(243, 232, 253, 0.95) 0%, rgba(233, 216, 253, 0.95) 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                      backdropFilter: "blur(8px)",
                      padding: "12px 16px",
                      fontSize: "0.875rem",
                      fontWeight: 800,
                    }}
                    labelStyle={{
                      color:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      letterSpacing: "0.5px",
                      opacity: 1,
                    }}
                    itemStyle={{
                      color:
                        theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                      fontSize: "0.875rem",
                      letterSpacing: "0.5px",
                      fontWeight: 600,
                      opacity: 1,
                    }}
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()}`,
                      name,
                    ]}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: "32px",
                      fontWeight: 800,
                      fill: getTotalGainLossColor(),
                      transition: "all 0.3s ease",
                      opacity: 0.9,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                      letterSpacing: "0.5px",
                      textShadow: "0 1px 1px rgba(0,0,0,0.3)",
                    }}
                  >
                    {getTotalGainLoss() >= 0 ? "+" : ""}
                    {getTotalGainLoss().toFixed(1)}%
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly P&L Performance */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
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
                  mb: { xs: 1, sm: 2 },
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                      : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    width: "60px",
                    height: "4px",
                    background: "linear-gradient(90deg, #FF9800, #FFB74D)",
                    borderRadius: "2px",
                  },
                }}
              >
                Monthly P&L Performance
              </Typography>
              <Box sx={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={portfolioData.monthlyPnL}
                    margin={{ top: 40, right: 20, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.1)"
                          : "rgba(107, 70, 193, 0.1)"
                      }
                    />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => value.split("/")[0]}
                      tick={{
                        fill:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontSize: "14px",
                        fontWeight: 500,
                        letterSpacing: "0.5px",
                      }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tick={{
                        fill:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontSize: "14px",
                        fontWeight: 500,
                        letterSpacing: "0.5px",
                      }}
                      padding={{ top: 20, bottom: 20 }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(49, 46, 129, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)"
                            : "linear-gradient(135deg, rgba(243, 232, 253, 0.95) 0%, rgba(233, 216, 253, 0.95) 100%)",
                        border: "none",
                        borderRadius: "12px",
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                        backdropFilter: "blur(8px)",
                        padding: "12px 16px",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                      labelStyle={{
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        letterSpacing: "0.5px",
                      }}
                      itemStyle={{
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontSize: "0.875rem",
                        letterSpacing: "0.5px",
                      }}
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString()} USD`,
                        name,
                      ]}
                    />
                    <Bar
                      dataKey="profit"
                      fill="url(#colorGradient)"
                      radius={[6, 6, 0, 0]}
                    >
                      {portfolioData.monthlyPnL.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.profit >= 0
                              ? theme.palette.mode === "dark"
                                ? "rgba(76, 175, 80, 0.8)"
                                : "rgba(76, 175, 80, 0.8)"
                              : theme.palette.mode === "dark"
                              ? "rgba(255, 72, 66, 0.8)"
                              : "rgba(255, 72, 66, 0.8)"
                          }
                          style={{
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            filter: "brightness(1)",
                          }}
                          onMouseEnter={(e) => {
                            if (e.currentTarget) {
                              e.currentTarget.style.filter =
                                "brightness(1.2) saturate(1.5) hue-rotate(240deg)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (e.currentTarget) {
                              e.currentTarget.style.filter = "brightness(1)";
                            }
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Risk Assessment */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              mb: { xs: 1, sm: 3 },
              borderRadius: "20px",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.8) 0%, rgba(30, 27, 75, 0.8) 100%)"
                  : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(233, 216, 253, 0.2)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                  : "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ p: { xs: 1, sm: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: { xs: 1, sm: 2 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                        : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-8px",
                      left: 0,
                      width: "60px",
                      height: "4px",
                      background: "linear-gradient(90deg, #FF9800, #FFB74D)",
                      borderRadius: "2px",
                    },
                  }}
                >
                  Portfolio Risk Assessment
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={portfolioData.monthlyRisk}
                    margin={{ top: 40, right: 80, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.1)"
                          : "rgba(107, 70, 193, 0.1)"
                      }
                    />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => value.split("/")[0]}
                      tick={{
                        fill:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      domain={[0, 10]}
                      tick={{
                        fill:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(49, 46, 129, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)"
                            : "linear-gradient(135deg, rgba(243, 232, 253, 0.95) 0%, rgba(233, 216, 253, 0.95) 100%)",
                        border: "none",
                        borderRadius: "12px",
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                        backdropFilter: "blur(8px)",
                        padding: "12px 16px",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                      labelStyle={{
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                      itemStyle={{
                        color:
                          theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
                        fontSize: "0.875rem",
                      }}
                      formatter={(value: number, name: string) => [
                        `${value.toFixed(1)}`,
                        name,
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="#FF4842"
                      strokeWidth={2.5}
                      dot={{
                        r: 4,
                        fill: "#FF4842",
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#FF4842",
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                      }}
                    />
                    <ReferenceLine
                      y={7}
                      stroke="#FF4842"
                      strokeDasharray="3 3"
                      label={{
                        value: "High Risk",
                        position: "right",
                        fill: "#FF4842",
                        fontSize: "0.875rem",
                        offset: 5,
                      }}
                    />
                    <ReferenceLine
                      y={3}
                      stroke="#4CAF50"
                      strokeDasharray="3 3"
                      label={{
                        value: "Low Risk",
                        position: "right",
                        fill: "#4CAF50",
                        fontSize: "0.875rem",
                        offset: 5,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Summary */}
        <Grid item xs={12}>
          <Card
            sx={{
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "translateY(-4px)" },
              borderRadius: "20px",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                  : "0 4px 20px rgba(0, 0, 0, 0.1)",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                  : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: { xs: 1, sm: 3 } }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  mb: { xs: 1, sm: 3 },
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                      : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    width: "60px",
                    height: "4px",
                    background: "linear-gradient(90deg, #FF9800, #FFB74D)",
                    borderRadius: "2px",
                  },
                }}
              >
                Portfolio Summary
              </Typography>
              <Grid container spacing={{ xs: 1, sm: 3 }}>
                {/* Top Performers */}
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "20px",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(249, 250, 251, 0.75) 100%)",
                      backdropFilter: "blur(10px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                          : "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: { xs: 2, sm: 3 },
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                              : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 600,
                        }}
                      >
                        Top Performers
                      </Typography>
                      {portfolioData.stocks
                        .sort((a, b) => b.gainLoss - a.gainLoss)
                        .slice(0, 3)
                        .map((stock, index) => (
                          <Box
                            key={stock.symbol}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: { xs: 1.5, sm: 2 },
                              p: { xs: 1.5, sm: 2 },
                              borderRadius: "12px",
                              background:
                                theme.palette.mode === "dark"
                                  ? "rgba(233, 216, 253, 0.1)"
                                  : "rgba(107, 70, 193, 0.05)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateX(4px)",
                                background:
                                  theme.palette.mode === "dark"
                                    ? "rgba(233, 216, 253, 0.15)"
                                    : "rgba(107, 70, 193, 0.1)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#E9D8FD"
                                      : "#6B46C1",
                                  fontWeight: 700,
                                  minWidth: "24px",
                                }}
                              >
                                {index + 1}
                              </Typography>
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color:
                                      theme.palette.mode === "dark"
                                        ? "#E9D8FD"
                                        : "#6B46C1",
                                    fontWeight: 600,
                                  }}
                                >
                                  {stock.symbol}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color:
                                      theme.palette.mode === "dark"
                                        ? "#E9D8FD"
                                        : "#6B46C1",
                                    opacity: 0.8,
                                  }}
                                >
                                  {stock.name}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                color: theme.palette.success.main,
                                fontWeight: 700,
                                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            >
                              +{stock.gainLoss.toFixed(1)}%
                            </Typography>
                          </Box>
                        ))}
                    </CardContent>
                  </Card>
                </Grid>

                {/* Sector Distribution */}
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "20px",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(30, 27, 75, 0.7) 100%)"
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(249, 250, 251, 0.75) 100%)",
                      backdropFilter: "blur(10px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                          : "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: { xs: 2, sm: 3 },
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                              : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 600,
                        }}
                      >
                        Sector Distribution
                      </Typography>
                      {getSectorData()
                        .sort((a, b) => b.value - a.value)
                        .map((sector, index) => (
                          <Box
                            key={sector.sector}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: { xs: 1.5, sm: 2 },
                              p: { xs: 1.5, sm: 2 },
                              borderRadius: "12px",
                              background:
                                theme.palette.mode === "dark"
                                  ? "rgba(233, 216, 253, 0.1)"
                                  : "rgba(107, 70, 193, 0.05)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateX(4px)",
                                background:
                                  theme.palette.mode === "dark"
                                    ? "rgba(233, 216, 253, 0.15)"
                                    : "rgba(107, 70, 193, 0.1)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#E9D8FD"
                                      : "#6B46C1",
                                  fontWeight: 700,
                                  minWidth: "24px",
                                }}
                              >
                                {index + 1}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#E9D8FD"
                                      : "#6B46C1",
                                  fontWeight: 600,
                                }}
                              >
                                {sector.sector}
                              </Typography>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#E9D8FD"
                                    : "#6B46C1",
                                fontWeight: 700,
                                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            >
                              ${(sector.value / 1000).toFixed(1)}K
                            </Typography>
                          </Box>
                        ))}
                    </CardContent>
                  </Card>
                </Grid>

                {/* Risk Metrics */}
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "20px",
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.1)"
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(249, 250, 251, 0.75) 100%)",
                      backdropFilter: "blur(10px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                          : "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: { xs: 2, sm: 3 },
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                              : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 600,
                        }}
                      >
                        Risk Metrics
                      </Typography>
                      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                            mb: 1,
                            fontWeight: 500,
                          }}
                        >
                          Current Risk Score
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{
                            color: theme.palette.warning.main,
                            fontWeight: 700,
                            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        >
                          {portfolioData.monthlyRisk[
                            portfolioData.monthlyRisk.length - 1
                          ].risk.toFixed(1)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                            mb: 1,
                            fontWeight: 500,
                          }}
                        >
                          Risk Trend
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.success.main,
                              fontWeight: 600,
                            }}
                          >
                            Decreasing
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#E9D8FD"
                                  : "#6B46C1",
                              opacity: 0.8,
                            }}
                          >
                            (Last 3 months)
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Performance Metrics */}
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "20px",
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.1)"
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(249, 250, 251, 0.75) 100%)",
                      backdropFilter: "blur(10px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 4px 20px rgba(0, 0, 0, 0.2)"
                          : "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: { xs: 2, sm: 3 },
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)"
                              : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: 600,
                        }}
                      >
                        Performance Metrics
                      </Typography>
                      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                            mb: 1,
                            fontWeight: 500,
                          }}
                        >
                          YTD Return
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{
                            background:
                              "linear-gradient(135deg, #2e7d32 0%, #81C784 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 700,
                            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        >
                          +16.25%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#E9D8FD"
                                : "#6B46C1",
                            mb: 1,
                            fontWeight: 500,
                          }}
                        >
                          Monthly Performance
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.success.main,
                              fontWeight: 600,
                            }}
                          >
                            +2.5%
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#E9D8FD"
                                  : "#6B46C1",
                              opacity: 0.8,
                            }}
                          >
                            vs last month
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
