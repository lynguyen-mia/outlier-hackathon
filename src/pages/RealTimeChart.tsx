import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TradingViewChart from "../components/TradingViewChart";

const RealTimeChart: React.FC = () => {
  const theme = useTheme();
  const [symbol, setSymbol] = useState("VNINDEX");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!symbol) {
      setError("Please enter a stock symbol");
      return;
    }

    setLoading(true);
    setError("");
    // No need for API call as TradingView handles the data
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1, md: 3 },
        p: { xs: 0.5, md: 3 },
        width: "100%",
      }}
    >
      <Card
        sx={{
          mb: 3,
          width: "100%",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(45, 55, 72, 0.7) 0%, rgba(26, 32, 44, 0.7) 100%)"
              : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent sx={{ width: "100%", p: { xs: 2, md: 3 } }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              mb: 2,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #E9D8FD 0%, #9F7AEA 100%)"
                  : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
            }}
          >
            Real-Time Stock Chart
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Enter Stock Symbol"
                variant="outlined"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                error={!!error}
                helperText={error}
                placeholder="e.g., VNINDEX, HPG, VRE"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    transition: "all 0.2s ease-in-out",
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "inherit",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.3)"
                          : "inherit",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(233, 216, 253, 0.5)"
                          : "inherit",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor:
                        theme.palette.mode === "dark" ? "#9F7AEA" : "inherit",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(233, 216, 253, 0.7)"
                        : "inherit",
                    "&.Mui-focused": {
                      color:
                        theme.palette.mode === "dark" ? "#9F7AEA" : "inherit",
                    },
                  },
                  "& .MuiHelperText-root": {
                    color:
                      theme.palette.mode === "dark" ? "#FF4842" : "inherit",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={
                  loading ? <CircularProgress size={20} /> : <SearchIcon />
                }
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  height: "56px",
                  borderRadius: "12px",
                  textTransform: "none",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #9F7AEA 0%, #6B46C1 100%)"
                      : "linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #8B6AE9 0%, #5A3AB0 100%)"
                        : "linear-gradient(135deg, #5A3AB0 0%, #8B6AE9 100%)",
                  },
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: "100%",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(45, 55, 72, 0.7) 0%, rgba(26, 32, 44, 0.7) 100%)"
              : "linear-gradient(135deg, rgba(243, 232, 253, 0.7) 0%, rgba(233, 216, 253, 0.7) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent sx={{ width: "100%", p: { xs: 2, md: 3 } }}>
          <TradingViewChart
            symbol={symbol}
            theme={theme.palette.mode}
            height={600}
            width="100%"
            showToolbar={true}
            showStudies={true}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RealTimeChart;
