import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

// Action to fetch all playlists
export const fetchAllPlaylists = createAsyncThunk("playlists/fetchAll", async () => {
  try {
    const response = await axios.get(`${server}/playlist/get-all-playlists`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all playlists:", error);
    throw error;
  }
});
