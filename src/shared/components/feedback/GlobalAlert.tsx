import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../../store/alertSlice";

export function GlobalAlert() {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((state: any) => state.alert);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideAlert())}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={type} onClose={() => dispatch(hideAlert())}>
        {message}
      </Alert>
    </Snackbar>
  );
}