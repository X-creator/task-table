import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchStr: "",
  founded: 0
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search(state, action) {
      return {
        ...state,
        searchStr: action.payload
      };
    },
    found(state, action) {
      return {
        ...state,
        founded: action.payload
      };
    }
  }
});

export const { search, found } = searchSlice.actions;

export default searchSlice.reducer;
