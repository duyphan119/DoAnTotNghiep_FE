import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  confirmDialogActions,
  confirmDialogSelector,
} from "@/redux/slice/confirmDialogSlice";
import { useAppDispatch } from "@/redux/store";
import ButtonControl from "../ButtonControl";

const ConfirmDialog = () => {
  const appDispatch = useAppDispatch();
  const handleClose = () => {
    appDispatch(confirmDialogActions.hide());
  };
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const { open, title, text, onConfirm, cancelText, confirmText } = useSelector(
    confirmDialogSelector
  );

  return (
    <Dialog open={open || false} onClose={handleClose}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title || "Xác nhận"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{text || "Bạn có chắc chắn xoá?"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonControl variant="outlined" autoFocus onClick={handleClose}>
          {cancelText || "Không"}
        </ButtonControl>
        <ButtonControl onClick={handleConfirm}>
          {confirmText || "Có"}
        </ButtonControl>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
