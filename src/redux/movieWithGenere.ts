import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import APIClient from "../components/common/API/index";

const apiClient = new APIClient();

const initialState = {
  moviesWithGenres: [],
};

const filterMovies = (genres: any[], movies: any[]) => {
  const filteredMovies = genres.map((genre) => {
    const newMovies = movies.filter((movie) =>
      movie.genre_ids.includes(genre.id)
    );

    return {
      ...genre,
      movies: newMovies,
    };
  });

  return filteredMovies;
};

export const fetchMoviesWithGenere = createAsyncThunk(
  "fetchMoviesWithGenere",
  (params, { dispatch }) => {
    axios.all([apiClient.fetchGeneres(), apiClient.fetchMovies()]).then(
      axios.spread((...res) => {
        const generes = res[0].data.genres;
        const movies = res[1].data.results;
        const filteredMovies = filterMovies(generes, movies);
        dispatch(setMoviesWithGenres(filteredMovies));
      })
    );
  }
);

export const slice = createSlice({
  name: "moviesWithGenres",
  initialState,

  reducers: {
    setMoviesWithGenres: (state, action) => {
      state.moviesWithGenres = action.payload;
    },
  },

  extraReducers: {
    //@ts-ignore
    [fetchMoviesWithGenere.fulfilled]: (state: any, action: any) => {},
  },
});

export const { setMoviesWithGenres } = slice.actions;

export default slice.reducer;
