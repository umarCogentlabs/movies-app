import changeTheNumber from "./counter";
import setMoviesWithGenres from "./moviesWithGenres";
import setMovieDetailsArray from "./movieDetails";
import setComments from "./comments";
import setLikes from "./likes";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheNumber: changeTheNumber,
  setMoviesWithGenres: setMoviesWithGenres,
  setMovieDetailsArray: setMovieDetailsArray,
  setComments: setComments,
  setLikes: setLikes,
});

export default rootReducer;
