import { createSlice } from "@reduxjs/toolkit";

const ConnectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => null,
  },
});

export const { addConnection, removeConnection } = ConnectionsSlice.actions;

export default ConnectionsSlice.reducer;
