import { createSlice } from "@reduxjs/toolkit";
import { GroupProduct, GroupProductHeader } from "../../utils/types";
import { ActionPayload, RootState } from "../store";

const NAME_SLICE = "groupProduct";

type State = {
  groupProducts: GroupProduct[];
  headerData: GroupProductHeader[];
};

const INITIAL_STATE: State = {
  groupProducts: [],
  headerData: [],
};

export const groupProductSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    setGroupProducts: (state, action: ActionPayload<GroupProduct[]>) => {
      const items = action.payload;
      state.groupProducts = items;
    },
    setHeaderData: (state, action: ActionPayload<GroupProductHeader[]>) => {
      const items = action.payload;
      state.headerData = items;
    },
  },
});

export const groupProductSelector = (state: RootState) => state.groupProduct;
export const groupProductActions = groupProductSlice.actions;
export default groupProductSlice.reducer;
