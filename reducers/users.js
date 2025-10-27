import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    infoUser: {},
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
    updateUser: (state, action) => {
      state.value.infoUser = action.payload;
    },
  },
});

export const { addUserToStore, logout, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
