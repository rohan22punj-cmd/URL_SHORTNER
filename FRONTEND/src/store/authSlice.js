import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isCheckingSession: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setSessionChecked: (state) => {
      state.isCheckingSession = false;
    },
  },
});

export const { setUser, clearUser, setSessionChecked } = authSlice.actions;
export default authSlice.reducer;
