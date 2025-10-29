import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    infoUser: {},
    outfits : [],
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
    addOutfit : (state,action) => {
      state.value.outfits.push(action.payload);
    },
  },
});

export const { addUserToStore, logout, updateUser, addOutfit } = usersSlice.actions;
export default usersSlice.reducer;
