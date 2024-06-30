import { createReducer } from "@reduxjs/toolkit";
import { fetchAllSongs } from "../actions/song";

const initialState = {
  songs: [],
  isLoading: false,
};

export const songReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllSongs.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllSongs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.songs = action.payload;
    })
    .addCase(fetchAllSongs.rejected, (state) => {
      state.isLoading = false;
    }); 
});
