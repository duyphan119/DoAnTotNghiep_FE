import { createSlice } from "@reduxjs/toolkit";
import { ResponseGetAllModel, UserModel } from "../../models";
import { UserParams } from "../../types/params";
import { ActionPayload, RootState } from "@/redux/store";

type State = {
  userData: ResponseGetAllModel<UserModel>;
  current: UserModel;
};

const NAME_SLICE = "user";

const INITIAL_STATE: State = {
  userData: new ResponseGetAllModel(),
  current: new UserModel(),
};

const userSlice = createSlice({
  name: NAME_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    fetchGetAll: (state, action: ActionPayload<UserParams>) => {},
    setUserData: (
      state,
      action: ActionPayload<ResponseGetAllModel<UserModel>>
    ) => {
      state.userData = action.payload;
    },
    setCurrent: (state, action: ActionPayload<UserModel>) => {
      state.current = action.payload;
    },
  },
});

export const userReducer = {
  fetchGetAll: `${NAME_SLICE}/fetchGetAll`,
};
export const userSelector = (state: RootState): State => state.user;
export const userActions = userSlice.actions;
export default userSlice.reducer;
