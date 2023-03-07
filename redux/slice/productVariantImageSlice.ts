import { createSlice } from "@reduxjs/toolkit";

type State = {
  uploadResults: any;
};

const NAME_SLICE = "productVariantImage";

const INITIAL_STATE = {
  uploadResults: [],
};

const productVariantImageSlice = createSlice({
  name: NAME_SLICE,
  reducers: {
    setUploadResults: (state, action) => {
      state.uploadResults = action.payload;
    },
  },
  initialState: INITIAL_STATE,
});
