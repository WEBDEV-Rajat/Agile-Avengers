import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    forgotPasswordRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload.message;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload.message;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false; 
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
  },
});


export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    

    
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error?.response?.data?.message || "Registration failed"));
  }
};


export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log("hjdsfuhsanmvhjdcds",response);
    
    // console.log("hjdsfuhcds",response.data);
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};


export const forgotPassword = (data) => async (dispatch) => {
  dispatch(userSlice.actions.forgotPasswordRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/forgot-password",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.forgotPasswordSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.forgotPasswordFailed(error.response.data.message));
  }
};
export const resetPassword = (data) => async (dispatch) => {
  dispatch(userSlice.actions.resetPasswordRequest());
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/users/reset-password/${data.token}`,
      { password: data.password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.resetPasswordSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.resetPasswordFailed(error.response.data.message));
  }
};


export const GetUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    // console.log("ggbd");
    
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/get-user",
      {
        withCredentials: true,
      }
    );
    // console.log(response);
    
    dispatch(userSlice.actions.fetchUserSuccess(response.data.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : "Something went wrong!";
    dispatch(userSlice.actions.fetchUserFailed(errorMessage));
  }
};


export const logout = () => async (dispatch) => {
  try {
    await axios.get(
      "http://localhost:5000/api/v1/users/logout",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};


export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};


export default userSlice.reducer;





