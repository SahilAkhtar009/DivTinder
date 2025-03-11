import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArrayFeed = state.filter((r) => r._id !== action.payload);
      return newArrayFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
