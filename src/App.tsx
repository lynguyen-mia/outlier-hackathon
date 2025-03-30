import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { lightTheme, darkTheme } from "./theme";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import RealTimeChart from "./pages/RealTimeChart";
import MyStocks from "./pages/StockList";
import TransactionHistory from "./pages/TransactionHistory";
import LoadingEffect from "./components/LoadingEffect";

// Create a wrapper component that uses useLocation
const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate initial loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <LoadingEffect isLoading={isLoading} type="page">
          <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
            <Box sx={{ p: 2, width: "100%" }}>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/real-time" element={<RealTimeChart />} />
                <Route path="/stocks" element={<MyStocks />} />
                <Route path="/transactions" element={<TransactionHistory />} />
              </Routes>
            </Box>
          </Layout>
        </LoadingEffect>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

// Main App component that provides Router context
const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
