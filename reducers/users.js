import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    infoUser: {},
    outfits: [],
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
      state.value = null;
    },
    updateUser: (state, action) => {
      state.value.infoUser = action.payload;
    },
    addOutfit: (state, action) => {
      state.value.outfits.push(action.payload);
    },
    deleteOutfit: (state, action) => {
      state.value.outfits = state.value.outfits.filter(
        (e) => e.id !== action.payload
      );
    },
  },
});

export const { addUserToStore, logout, updateUser, addOutfit, deleteOutfit } =
  usersSlice.actions;
export default usersSlice.reducer;
