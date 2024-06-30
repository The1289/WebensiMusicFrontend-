import { createReducer } from "@reduxjs/toolkit";
import { fetchAllPlaylists } from "../actions/playlist";

const initialState = {
  playlists: [],
  isLoading: false,
};

export const playlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllPlaylists.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllPlaylists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.playlists = action.payload.playlists; 
    })
    .addCase(fetchAllPlaylists.rejected, (state) => {
      state.isLoading = false;
    });
});
