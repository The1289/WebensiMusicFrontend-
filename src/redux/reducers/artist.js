// artistReducer.js

import { createReducer } from "@reduxjs/toolkit";
import { fetchAllArtists } from "../actions/artist";

const initialState = {
  artists: [],
  isLoading: false,
};

export const artistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllArtists.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllArtists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.artists = action.payload.artists;
    })
    .addCase(fetchAllArtists.rejected, (state) => {
      state.isLoading = false;
    });
});
