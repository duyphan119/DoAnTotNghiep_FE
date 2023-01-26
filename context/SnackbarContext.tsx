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
type State = {
  open: boolean;
  text: string;
  type: SnackbarType;
};
const SnackbarWrapper = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    open: false,
    text: "Thành công",
    type: "info",
  });

  const { open, text, type } = state;

  const handleClose = () => {
    setState((s) => ({ ...s, open: false }));
  };

  const show = (msg: string, type?: SnackbarType) => {
    setState({ text: msg, open: true, type: type || "info" });
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
