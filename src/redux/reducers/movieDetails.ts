const initialState: object[] = [];

const setMovieDetailsArray = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_MOVIE_DETAILS":
      debugger;
      return action.payload;
  }
  return state;
};

export default setMovieDetailsArray;