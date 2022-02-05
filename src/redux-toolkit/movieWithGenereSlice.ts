import { createSlice } from "@reduxjs/toolkit";
debugger;

export const slice = createSlice({
  name: "moviesWithGenres",
  initialState: {
    moviesWithGenres: [],
  },
  reducers: {
    setMoviesWithGenres: (state, action) => {
      state.moviesWithGenres = action.payload;
    },
  },
});

export const { setMoviesWithGenres } = slice.actions;

// export const selectCount = (state: any) => state.counter.count;

export default slice.reducer;
