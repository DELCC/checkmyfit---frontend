import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
  },
};

export const usersSlice = createSlice({
  name: "users",

  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.value.token = action.payload;
    },
    logout: (state) => {
      state.value.token = null;
    },
  },
});

export const { addUserToStore, logout } = usersSlice.actions;
export default usersSlice.reducer;
