
// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchFinancialOverview,
//   fetchTransactionTrend,
//   fetchTopTransactions,
//   fetchCategoryExpense,
//   fetchCategoryIncome,
//   fetchMostUsedCategory,
//   fetchSavingsRate,
// } from "../Thunks/analysis.thunks.js";

// const initialState = {
//   loading: false,
//   error: null,
//   financialOverview: {},
//   transactionTrend: [],
//   topTransactions: [],
//   categoryExpense: {},
//   categoryIncome: {},
//   mostUsedCategory: "",
//   savingsRate: 0,
// };

// const analysisSlice = createSlice({
//   name: "analysis",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
     
//       .addCase(fetchFinancialOverview.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchFinancialOverview.fulfilled, (state, action) => {
//         state.loading = false;
//         state.financialOverview = action.payload;
//       })
//       .addCase(fetchFinancialOverview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchTransactionTrend.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTransactionTrend.fulfilled, (state, action) => {
//         state.loading = false;
//         state.transactionTrend = action.payload;
//       })
//       .addCase(fetchTransactionTrend.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchTopTransactions.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTopTransactions.fulfilled, (state, action) => {
//         state.loading = false;
//         state.topTransactions = action.payload;
//       })
//       .addCase(fetchTopTransactions.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchCategoryExpense.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCategoryExpense.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categoryExpense = action.payload;
//       })
//       .addCase(fetchCategoryExpense.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchCategoryIncome.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCategoryIncome.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categoryIncome = action.payload;
//       })
//       .addCase(fetchCategoryIncome.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchMostUsedCategory.fulfilled, (state, action) => {
//         state.mostUsedCategory = action.payload;
//       })

//       .addCase(fetchSavingsRate.fulfilled, (state, action) => {
//         state.savingsRate = action.payload;
//       });
//   },
// });

// export default analysisSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const analysisSlice = createSlice({
  name: "analysis",
  initialState: {
    loading: false,
    error: null,
    expensePerCategory: {},
    incomePerCategory: {},
    financialOverview: {},
    transactionTrend: [],
    topTransactions: [],
    mostUsedCategory: "",
    savingsRate: 0,
  },
  reducers: {
    analysisRequest(state) {
      state.loading = true;
      state.error = null;
    },
    analysisFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setExpensePerCategory(state, action) {
      state.loading = false;
      state.expensePerCategory = action.payload;
    },
    setIncomePerCategory(state, action) {
      state.loading = false;
      state.incomePerCategory = action.payload;
    },
    setFinancialOverview(state, action) {
      state.loading = false;
      state.financialOverview = action.payload;
    },
    setTransactionTrend(state, action) {
      state.loading = false;
      state.transactionTrend = action.payload;
    },
    setTopTransactions(state, action) {
      state.loading = false;
      state.topTransactions = action.payload;
    },
    setMostUsedCategory(state, action) {
      state.loading = false;
      state.mostUsedCategory = action.payload;
    },
    setSavingsRate(state, action) {
      state.loading = false;
      state.savingsRate = action.payload;
    },
    clearAnalysisErrors(state) {
      state.error = null;
    },
  },
});

export const fetchAmountSpendPerCategory = (data) => async (dispatch) => {
  dispatch(analysisSlice.actions.analysisRequest());
  try {
    const response = await axios.post("https://expenseguru-backend.onrender.com/api/v1/analysis/category/expense", data, {
      params:data,
      withCredentials: true,
    });
    dispatch(analysisSlice.actions.setExpensePerCategory(response.data.data));
  } catch (error) {
    dispatch(analysisSlice.actions.analysisFailed(error.response?.data?.message || "Failed to fetch expense data"));
  }
};

export const fetchAmountIncomePerCategory = (data) => async (dispatch) => {
  dispatch(analysisSlice.actions.analysisRequest());
  try {
    const response = await axios.post("https://expenseguru-backend.onrender.com/api/v1/analysis/category/income", data, {
      params:data,
      withCredentials: true,
    });
    dispatch(analysisSlice.actions.setIncomePerCategory(response.data.data));
  } catch (error) {
    dispatch(analysisSlice.actions.analysisFailed(error.response?.data?.message || "Failed to fetch income data"));
  }
};

export const fetchFinancialOverview = (data) => async (dispatch) => {
  dispatch(analysisSlice.actions.analysisRequest());
  try {
    const response = await axios.post("https://expenseguru-backend.onrender.com/api/v1/analysis/overview", data, {
      params:data,
      withCredentials: true,
    });
    dispatch(analysisSlice.actions.setFinancialOverview(response.data));
  } catch (error) {
    dispatch(analysisSlice.actions.analysisFailed(error.response?.data?.message || "Failed to fetch overview"));
  }
};

export const fetchTransactionTrend = (data) => async (dispatch) => {
  dispatch(analysisSlice.actions.analysisRequest());
  try {
    console.log(data);
    const response = await axios.post("https://expenseguru-backend.onrender.com/api/v1/analysis/trend", data, {
      params:data,
      withCredentials: true,
    });
    dispatch(analysisSlice.actions.setTransactionTrend(response.data.trend));
  } catch (error) {
    dispatch(analysisSlice.actions.analysisFailed(error.response?.data?.message || "Failed to fetch trend"));
  }
};

export const fetchTopTransactions = (params) => async (dispatch) => {
  dispatch(analysisSlice.actions.analysisRequest());
  try {
    const response = await axios.post("https://expenseguru-backend.onrender.com/api/v1/analysis/top-transactions",params, {
      params:params,
      withCredentials: true,
    });
    dispatch(analysisSlice.actions.setTopTransactions(response.data.transactions));
  } catch (error) {
    dispatch(analysisSlice.actions.analysisFailed(error.response?.data?.message || "Failed to fetch top transactions"));
  }
};

export const fetchMostUsedCategory = () => async (dispatch) => {
  dispatch(analysisSlice.actions.analysisRequest());
  try {
    const response = await axios.get("https://expenseguru-backend.onrender.com/api/v1/analysis/most-used-category", {
      withCredentials: true,
    });
    dispatch(analysisSlice.actions.setMostUsedCategory(response.data.category));
  } catch (error) {
    dispatch(analysisSlice.actions.analysisFailed(error.response?.data?.message || "Failed to fetch category"));
  }
};

export const fetchSavingsRate = () => async (dispatch) => {
  dispatch(analysisSlice.actions.analysisRequest());
  try {
    const response = await axios.get("https://expenseguru-backend.onrender.com/api/v1/analysis/savings-rate",{
      withCredentials: true,
    });
    dispatch(analysisSlice.actions.setSavingsRate(response.data.savingsRate));
  } catch (error) {
    dispatch(analysisSlice.actions.analysisFailed(error.response?.data?.message || "Failed to fetch savings rate"));
  }
};

export const clearAnalysisErrors = () => (dispatch) => {
  dispatch(analysisSlice.actions.clearAnalysisErrors());
};

export default analysisSlice.reducer;
