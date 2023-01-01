import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export type ConfirmDialogProps = {
  open?: boolean;
  onClose?: any;
  onConfirm?: any;
  title?: string;
  text?: string;
  cancelText?: string;
  confirmText?: string;
};

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const handleClose = () => {
    props.onClose();
  };
  const handleConfirm = () => {
    props.onConfirm();
    handleClose();
  };
  return (
    <Dialog open={props.open || false} onClose={handleClose}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {props.title || "Tiêu đề"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.text || "Bạn có chắc chắn?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          {props.cancelText || "Đóng"}
        </Button>
        <Button onClick={handleConfirm}>{props.confirmText || "Có"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
