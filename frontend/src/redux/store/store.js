import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Slices/user.slices.js"
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
