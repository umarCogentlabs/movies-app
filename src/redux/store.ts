import { configureStore } from "@reduxjs/toolkit";
import movieWithGenereReducer from "./movieWithGenere";
import likesReducer from "./likes";
import movieDetailsReducer from "./movieDetails";
import commentsReducer from "./comments";
const store = configureStore({
  reducer: {
    movieWithGenere: movieWithGenereReducer,
    likes: likesReducer,
    movieDetails: movieDetailsReducer,
    comments: commentsReducer,
  },
});

export default store;
