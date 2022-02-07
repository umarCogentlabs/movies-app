import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIClient from "../components/common/API/index";

const apiClient = new APIClient();

const initialState = {
  movieDetails: [],
};

export const fetchMovieDetails = createAsyncThunk(
  "fetchMovieDetails",
  (movieId: string, { dispatch }) => {
    apiClient.fetchMovieDetails(movieId || "").then((res) => {
      const movieDetailsData = res.data;
      movieDetailsData.comments = [];
      dispatch(setMovieDetailsArray(movieDetailsData));
    });
  }
);

export const slice = createSlice({
  name: "movieDetails",
  initialState,

  reducers: {
    setMovieDetailsArray: (state, action) => {
      state.movieDetails = action.payload;
    },
  },
});

export const { setMovieDetailsArray } = slice.actions;

export const selectMovieDetails = (state: any) => state.movieDetails;

export default slice.reducer;
