import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

// Action to fetch all songs
export const fetchAllSongs = createAsyncThunk("songs/fetchAll", async () => {
  try {
    const response = await axios.get(`${server}/song/get-all-songs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all songs:", error);
    throw error;
  }
});
