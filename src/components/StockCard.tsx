import React from "react";
import { CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StockCardProps {
  stock: Stock;
}

export const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const theme = useTheme();
  const isPositiveChange = stock.change >= 0;

  return (
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {stock.symbol}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stock.name}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            ${stock.price.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isPositiveChange ? "success.main" : "error.main",
              fontWeight: 500,
            }}
          >
            {isPositiveChange ? "+" : ""}
            {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </Typography>
        </Box>
      </Box>
    </CardContent>
  );
};
