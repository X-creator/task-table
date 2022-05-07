import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    makeRequest() {
      return {
        ...initialState,
        loading: true
      };
    },
    onSuccess(_, action) {
      return {
        ...initialState,
        data: action.payload
      };
    },
    onFailure(_, action) {
      return {
        ...initialState,
        error: action.payload
      };
    }
  }
});

export const { makeRequest, onSuccess, onFailure } = dataSlice.actions;

export default dataSlice.reducer;
