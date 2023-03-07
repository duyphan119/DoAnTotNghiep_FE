import React from "react";
import { Snackbar as MuiSnackbar, Slide, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { SlideProps } from "@mui/material/Slide";
import {
  snackbarActions,
  snackbarSelector,
} from "../../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../../redux/store";

type Props = {};

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

const Snackbar = (props: Props) => {
  const { open, text, type } = useSelector(snackbarSelector);
  const appDispatch = useAppDispatch();

  const handleClose = () => {
    appDispatch(snackbarActions.hide());
  };

  return (
    <MuiSnackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      key={new Date().getTime()}
      autoHideDuration={4567}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
