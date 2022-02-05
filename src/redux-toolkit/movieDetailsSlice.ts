import { createSlice } from "@reduxjs/toolkit";
debugger;

export const slice = createSlice({
  name: "movieDetails",
  initialState: {
    movieDetails: [],
  },
  reducers: {
    setMovieDetailsArray: (state, action) => {
      state.movieDetails = action.payload;
    },
  },
});

export const { setMovieDetailsArray } = slice.actions;

// export const selectCount = (state: any) => state.counter.count;

export default slice.reducer;
