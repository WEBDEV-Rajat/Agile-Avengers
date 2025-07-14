// redux/analysis/analysisSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFinancialOverview,
  fetchTransactionTrend,
  fetchTopTransactions,
  fetchCategoryExpense,
  fetchCategoryIncome,
  fetchMostUsedCategory,
  fetchSavingsRate,
} from "../Thunks/analysis.thunks.js";

const initialState = {
  loading: false,
  error: null,
  financialOverview: {},
  transactionTrend: [],
  topTransactions: [],
  categoryExpense: {},
  categoryIncome: {},
  mostUsedCategory: "",
  savingsRate: 0,
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Financial Overview
      .addCase(fetchFinancialOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFinancialOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.financialOverview = action.payload;
      })
      .addCase(fetchFinancialOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Transaction Trend
      .addCase(fetchTransactionTrend.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionTrend = action.payload;
      })
      .addCase(fetchTransactionTrend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Top Transactions
      .addCase(fetchTopTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.topTransactions = action.payload;
      })
      .addCase(fetchTopTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Category Expense
      .addCase(fetchCategoryExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryExpense = action.payload;
      })
      .addCase(fetchCategoryExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Category Income
      .addCase(fetchCategoryIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryIncome = action.payload;
      })
      .addCase(fetchCategoryIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Most Used Category
      .addCase(fetchMostUsedCategory.fulfilled, (state, action) => {
        state.mostUsedCategory = action.payload;
      })

      // Savings Rate
      .addCase(fetchSavingsRate.fulfilled, (state, action) => {
        state.savingsRate = action.payload;
      });
  },
});

export default analysisSlice.reducer;
