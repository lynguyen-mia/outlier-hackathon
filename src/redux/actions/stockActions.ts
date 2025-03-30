import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
}

interface StockState {
  stocks: Stock[];
  loading: boolean;
  error: string | null;
}

const initialState: StockState = {
  stocks: [],
  loading: false,
  error: null,
};

export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  // TODO: Replace with actual API call
  const mockStocks: Stock[] = [
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 150.25,
      change: 2.5,
      changePercent: 1.67,
      sector: "Technology",
    },
    {
      id: "2",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 2750.75,
      change: -15.25,
      changePercent: -0.55,
      sector: "Technology",
    },
    {
      id: "3",
      symbol: "JPM",
      name: "JPMorgan Chase",
      price: 145.3,
      change: 1.2,
      changePercent: 0.83,
      sector: "Finance",
    },
    {
      id: "4",
      symbol: "JNJ",
      name: "Johnson & Johnson",
      price: 165.45,
      change: -0.8,
      changePercent: -0.48,
      sector: "Healthcare",
    },
  ];
  return mockStocks;
});
