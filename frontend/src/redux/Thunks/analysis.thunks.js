import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance.js';

export const fetchFinancialOverview = createAsyncThunk(
  'analysis/fetchFinancialOverview',
  async (datePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/analysis/overview', datePayload);
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch financial overview');
    }
  }
);

export const fetchTransactionTrend = createAsyncThunk(
  'analysis/fetchTransactionTrend',
  async (datePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/analysis/trend', datePayload);
      console.log(response.data.trend);
      return response.data.trend;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch transaction trend');
    }
  }
);

export const fetchTopTransactions = createAsyncThunk(
  'analysis/fetchTopTransactions',
  async (datePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/analysis/top-transactions', datePayload);
      return response.data.transactions;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch top transactions');
    }
  }
);


export const fetchCategoryExpense = createAsyncThunk(
  'analysis/fetchCategoryExpense',
  async (datePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/analysis/category/expense', datePayload);
      return response.data.category; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch category expense');
    }
  }
);

export const fetchCategoryIncome = createAsyncThunk(
  'analysis/fetchCategoryIncome',
  async (datePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/analysis/category/expense', datePayload);
      return response.data.category;  
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch category income');
    }
  }
);

export const fetchMostUsedCategory = createAsyncThunk(
  'analysis/fetchMostUsedCategory',
  async (datePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/analysis/most-used-category', datePayload);
      return response.data.category;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch most used category');
    }
  }
);

export const fetchSavingsRate = createAsyncThunk(
  'analysis/fetchSavingsRate',
  async (datePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/analysis/savings-rate', datePayload);
      return response.data.savingsRate;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch savings rate');
    }
  }
);
