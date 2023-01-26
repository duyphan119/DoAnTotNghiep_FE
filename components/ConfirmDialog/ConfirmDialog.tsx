import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export type ConfirmDialogProps = Partial<{
  open: boolean;
  onClose: any;
  onConfirm: any;
  title: string;
  text: string;
  cancelText: string;
  confirmText: string;
}>;

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  text,
  cancelText,
  confirmText,
}: ConfirmDialogProps) => {
  const handleClose = () => {
    onClose();
  };
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };
  return (
    <Dialog open={open || false} onClose={handleClose}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title || "Tiêu đề"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{text || "Bạn có chắc chắn?"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          {cancelText || "Đóng"}
        </Button>
        <Button onClick={handleConfirm}>{confirmText || "Có"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
