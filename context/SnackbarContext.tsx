import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Snackbar, Slide, Alert } from "@mui/material";
import { SlideProps } from "@mui/material/Slide";
const SnackbarContext = createContext<any>({});

type Props = {
  children?: ReactNode;
};

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}
type SnackbarType = "success" | "info" | "error" | "warning";
const SnackbarWrapper = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("Thành công");
  const [type, setType] = useState<SnackbarType>("info");

  const handleClose = () => {
    setOpen(false);
  };

  const show = (msg: string, type?: SnackbarType) => {
    setText(msg);
    setOpen(true);
    setType(type || "info");
  };

  return (
    <SnackbarContext.Provider
      value={{
        show,
      }}
    >
      <>
        <Snackbar
          open={open}
          onClose={handleClose}
          TransitionComponent={TransitionLeft}
          key={new Date().getTime()}
          autoHideDuration={4567}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {text}
          </Alert>
        </Snackbar>
        {children}
      </>
    </SnackbarContext.Provider>
  );
};

export function useSnackbarContext() {
  return useContext(SnackbarContext);
}
export default SnackbarWrapper;
