import { createSlice } from "@reduxjs/toolkit";
import { fetchStocks } from "../actions/stockActions";
import type { Stock } from "../actions/stockActions";

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

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stocks";
      });
  },
});

export default stockSlice.reducer;
