import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../redux/actions/stockActions";
import { AppDispatch } from "../redux/store";
import type { Stock } from "../redux/actions/stockActions";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MyStocks: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const stocks = useSelector((state: any) => state.stocks.stocks);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  // Sample data for the chart
  const chartData = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 120 },
    { name: "Mar", value: 115 },
    { name: "Apr", value: 130 },
    { name: "May", value: 125 },
    { name: "Jun", value: 140 },
  ];

  // Function to get sector color
  const getSectorColor = (sector: string) => {
    const colors: { [key: string]: string } = {
      Technology: "#9F7AEA", // Pastel Purple
      Finance: "#48BB78", // Pastel Green
      Healthcare: "#F6AD55", // Pastel Orange
      default: "#718096", // Default Gray
    };
    return colors[sector] || colors.default;
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Summary Cards */}
      <Grid container spacing={3} style={{ marginBottom: "32px" }}>
        <Grid item xs={12} md={4}>
          <Card
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(159, 122, 234, 0.4) 0%, rgba(107, 70, 193, 0.4) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(159, 122, 234, 0.3)",
              border: "2px solid rgba(159, 122, 234, 0.5)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              transform: "translateY(0)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(159, 122, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(159, 122, 234, 0.3)";
            }}
          >
            <CardContent
              style={{ padding: "32px", position: "relative", zIndex: 1 }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "#9F7AEA",
                  marginBottom: "16px",
                  fontWeight: 600,
                  fontSize: "1.3rem",
                  letterSpacing: "1px",
                  textShadow: "0 2px 4px rgba(159, 122, 234, 0.3)",
                  position: "relative",
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, #9F7AEA, #B794F4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Total Value
                <div
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    left: 0,
                    width: "50px",
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #9F7AEA, rgba(159, 122, 234, 0.5))",
                    borderRadius: "2px",
                  }}
                />
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontWeight: 700,
                  fontSize: "2.8rem",
                  letterSpacing: "1px",
                  textShadow: "0 4px 8px rgba(159, 122, 234, 0.3)",
                  background: "linear-gradient(135deg, #9F7AEA, #B794F4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginTop: "8px",
                }}
              >
                $1,234,567
              </Typography>
            </CardContent>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100px",
                background:
                  "linear-gradient(135deg, rgba(159, 122, 234, 0.2) 0%, rgba(107, 70, 193, 0.2) 100%)",
                borderRadius: "0 20px 0 0",
                zIndex: 0,
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(72, 187, 120, 0.4) 0%, rgba(48, 133, 144, 0.4) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(72, 187, 120, 0.3)",
              border: "2px solid rgba(72, 187, 120, 0.5)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              transform: "translateY(0)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(72, 187, 120, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(72, 187, 120, 0.3)";
            }}
          >
            <CardContent
              style={{ padding: "32px", position: "relative", zIndex: 1 }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "#48BB78",
                  marginBottom: "16px",
                  fontWeight: 600,
                  fontSize: "1.3rem",
                  letterSpacing: "1px",
                  textShadow: "0 2px 4px rgba(72, 187, 120, 0.3)",
                  position: "relative",
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, #48BB78, #9AE6B4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Daily Gain
                <div
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    left: 0,
                    width: "50px",
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #48BB78, rgba(72, 187, 120, 0.5))",
                    borderRadius: "2px",
                  }}
                />
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontWeight: 700,
                  fontSize: "2.8rem",
                  letterSpacing: "1px",
                  textShadow: "0 4px 8px rgba(72, 187, 120, 0.3)",
                  background: "linear-gradient(135deg, #48BB78, #9AE6B4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginTop: "8px",
                }}
              >
                +$12,345
              </Typography>
            </CardContent>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100px",
                background:
                  "linear-gradient(135deg, rgba(72, 187, 120, 0.2) 0%, rgba(48, 133, 144, 0.2) 100%)",
                borderRadius: "0 20px 0 0",
                zIndex: 0,
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(246, 173, 85, 0.4) 0%, rgba(237, 137, 54, 0.4) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(246, 173, 85, 0.3)",
              border: "2px solid rgba(246, 173, 85, 0.5)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              transform: "translateY(0)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(246, 173, 85, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(246, 173, 85, 0.3)";
            }}
          >
            <CardContent
              style={{ padding: "32px", position: "relative", zIndex: 1 }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "#F6AD55",
                  marginBottom: "16px",
                  fontWeight: 600,
                  fontSize: "1.3rem",
                  letterSpacing: "1px",
                  textShadow: "0 2px 4px rgba(246, 173, 85, 0.3)",
                  position: "relative",
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, #F6AD55, #FBD38D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Total Return
                <div
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    left: 0,
                    width: "50px",
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #F6AD55, rgba(246, 173, 85, 0.5))",
                    borderRadius: "2px",
                  }}
                />
              </Typography>
              <Typography
                variant="h4"
                style={{
                  fontWeight: 700,
                  fontSize: "2.8rem",
                  letterSpacing: "1px",
                  textShadow: "0 4px 8px rgba(246, 173, 85, 0.3)",
                  background: "linear-gradient(135deg, #F6AD55, #FBD38D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginTop: "8px",
                }}
              >
                +15.6%
              </Typography>
            </CardContent>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100px",
                background:
                  "linear-gradient(135deg, rgba(246, 173, 85, 0.2) 0%, rgba(237, 137, 54, 0.2) 100%)",
                borderRadius: "0 20px 0 0",
                zIndex: 0,
              }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Stock Table */}
      <Card
        style={{
          borderRadius: "20px",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(49, 46, 129, 0.8) 0%, rgba(30, 27, 75, 0.8) 100%)"
              : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.3)"
              : "0 8px 32px rgba(0, 0, 0, 0.15)",
          border: `2px solid ${
            theme.palette.mode === "dark"
              ? "rgba(233, 216, 253, 0.3)"
              : "rgba(0, 0, 0, 0.1)"
          }`,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    padding: "16px",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#2D3748",
                  }}
                >
                  Stock
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    padding: "16px",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#2D3748",
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    padding: "16px",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#2D3748",
                  }}
                >
                  Change
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    padding: "16px",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#2D3748",
                  }}
                >
                  Chart
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    padding: "16px",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
                    color:
                      theme.palette.mode === "dark" ? "#E9D8FD" : "#2D3748",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock: Stock) => (
                <TableRow
                  key={stock.id}
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      theme.palette.mode === "dark"
                        ? "rgba(233, 216, 253, 0.15)"
                        : "rgba(0, 0, 0, 0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <TableCell style={{ padding: "16px" }}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Chip
                        label={stock.sector || "Unknown"}
                        size="small"
                        style={{
                          backgroundColor: getSectorColor(
                            stock.sector || "default"
                          ),
                          color: "white",
                          fontWeight: 600,
                          borderRadius: "16px",
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 600, fontSize: "1.1rem" }}
                      >
                        {stock.symbol}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ padding: "16px" }}>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 600, fontSize: "1.1rem" }}
                    >
                      ${stock.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ padding: "16px" }}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUpIcon
                          style={{ color: "#48BB78", fontSize: "1.5rem" }}
                        />
                      ) : (
                        <TrendingDownIcon
                          style={{ color: "#F56565", fontSize: "1.5rem" }}
                        />
                      )}
                      <Typography
                        variant="body1"
                        style={{
                          fontWeight: 600,
                          color: stock.change >= 0 ? "#48BB78" : "#F56565",
                          fontSize: "1.1rem",
                        }}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ padding: "16px" }}>
                    <Box style={{ width: "200px", height: "60px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E2E8F0"
                          />
                          <XAxis dataKey="name" hide />
                          <YAxis hide />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={stock.change >= 0 ? "#48BB78" : "#F56565"}
                            strokeWidth={3}
                            dot={{
                              r: 5,
                              fill: stock.change >= 0 ? "#48BB78" : "#F56565",
                              stroke: "white",
                              strokeWidth: 2,
                            }}
                            activeDot={{
                              r: 7,
                              fill: stock.change >= 0 ? "#48BB78" : "#F56565",
                              stroke: "white",
                              strokeWidth: 2,
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </TableCell>
                  <TableCell style={{ padding: "16px" }}>
                    <Typography
                      variant="body2"
                      style={{
                        color: "#6B46C1",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(107, 70, 193, 0.1)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(107, 70, 193, 0.2)";
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(107, 70, 193, 0.1)";
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      View Details
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default MyStocks;
