import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, RootState } from "@/redux/store";

type SnackbarType = "success" | "info" | "error" | "warning";

type State = {
  open: boolean;
  text: string;
  type: SnackbarType;
};

type ShowType = {
  msg: string;
} & Partial<{ type: SnackbarType }>;

const INITIAL_STATE: State = {
  open: false,
  text: "Thành công",
  type: "info",
};

const NAME_SLICE = "snackbar";

const snackbarSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    show: (state, action: ActionPayload<ShowType>) => {
      const { msg, type } = action.payload;
      state.open = true;
      state.text = msg;
      state.type = type || "info";
    },
    hide: (state) => {
      state.open = false;
    },
    success: (state, { payload: text }: ActionPayload<string>) => {
      state.text = text;
      state.type = "success";
    },
    error: (state, { payload: text }: ActionPayload<string>) => {
      state.text = text;
      state.type = "error";
    },
    info: (state, { payload: text }: ActionPayload<string>) => {
      state.text = text;
      state.type = "info";
    },
  },
});

export const snackbarSelector = (state: RootState): State => state.snackbar;
export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice.reducer;
