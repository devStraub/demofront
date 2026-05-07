import { createSlice } from "@reduxjs/toolkit";

type AlertType = "success" | "info" | "warning" | "error";

type AlertState = {
  open: boolean;
  message: string;
  type: AlertType;
};

const initialState: AlertState = {
  open: false,
  message: "",
  type: "info",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideAlert: (state) => {
      state.open = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;