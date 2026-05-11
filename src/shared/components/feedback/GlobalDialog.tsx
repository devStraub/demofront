import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  
  import { useDispatch, useSelector } from "react-redux";
  import { closeDialog } from "../../../store/dialogSlice";
  
  export function GlobalDialog() {
    const dispatch = useDispatch();
    const { open, title, content, onConfirm } = useSelector(
      (state: any) => state.dialog
    );
  
    function handleClose() {
      dispatch(closeDialog());
    }
  
    function handleConfirm() {
      if (onConfirm) onConfirm();
      dispatch(closeDialog());
    }
  
    return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
  
        <DialogContent>{content}</DialogContent>
  
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }