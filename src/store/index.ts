import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import dialogReducer from "./dialogSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    dialog: dialogReducer,
  },
});