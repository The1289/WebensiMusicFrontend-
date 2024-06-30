// artistActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

// Action to fetch all artists
export const fetchAllArtists = createAsyncThunk("artists/fetchAll", async () => {
  try {
    const response = await axios.get(`${server}/artist/get-all-artists`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all artists:", error);
    throw error;
  }
});
