import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
        return action;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
