import { createSlice } from "@reduxjs/toolkit";

type DialogState = {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
};

const initialState: DialogState = {
  open: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.onConfirm = action.payload.onConfirm;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;