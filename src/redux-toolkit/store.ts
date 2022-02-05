import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import movieWithGenereSlice from "./movieWithGenereSlice";
import likesSlice from "./likesSlice";
import movieDetailsSlice from "./movieDetailsSlice";
import commentsSlice from "./commentsSlice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    movieWithGenereSlice: movieWithGenereSlice,
    likesSlice: likesSlice,
    movieDetailsSlice: movieDetailsSlice,
    commentsSlice: commentsSlice,
  },
});

export default store;
