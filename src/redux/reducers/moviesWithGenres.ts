const initialState: any[] = [];

const setMoviesWithGenres = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_GENERES_WITH_MOVIES":
      return action.payload;

    default:
      return state;
  }
};

export default setMoviesWithGenres;
