import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, RootState } from "@/redux/store";

const NAME_SLICE = "confirmDialog";

type State = {
  open: boolean;
  text: string;
  title: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => any;
};

const INITIAL_STATE: State = {
  open: false,
  text: "Xác nhận",
  title: "Bạn có chắc chắn muốn xóa không?",
  cancelText: "Không",
  confirmText: "Có",
  onConfirm: () => {},
};

const confirmDialogSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    show: (
      state,
      action: ActionPayload<{
        text?: string;
        title?: string;
        cancelText?: string;
        confirmText?: string;
        onConfirm: () => any;
      }>
    ) => {
      const { text, title, cancelText, confirmText, onConfirm } =
        action.payload;
      state.open = true;
      state.text = text || "Bạn có chắc chắn muốn xóa không?";
      state.title = title || "Xác nhận";
      state.cancelText = cancelText || "Không";
      state.confirmText = confirmText || "Có";
      state.onConfirm = onConfirm;
    },
    hide: (state) => {
      state.open = false;
    },
  },
});

export const confirmDialogSelector = (state: RootState): State =>
  state.confirmDialog;
export const confirmDialogActions = confirmDialogSlice.actions;
export default confirmDialogSlice.reducer;
