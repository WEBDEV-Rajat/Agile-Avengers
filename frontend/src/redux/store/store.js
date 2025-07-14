import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Slices/user.slices.js"
import analysisReducer from "../Slices/analysis.slices.js"
const store = configureStore({
  reducer: {
    user: userReducer,
    analysis: analysisReducer
  },
});

export default store;
