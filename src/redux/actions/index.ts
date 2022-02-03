export const incNumber = (num: number) => {
  return {
    type: "INCREMENT",
    payload: num,
  };
};

export const decNumber = () => {
  return {
    type: "DECREMENT",
  };
};

export const setNumber = () => {
  return {
    type: "SET_NUMBER",
  };
};

export const setMoviesWithGeneres = (payload: object[]) => {
  return {
    type: "SET_GENERES_WITH_MOVIES",
  };
};

export const setMovieDetails = (payload: object[]) => {
  return {
    type: "SET_MOVIE_DETAILS",
  };
};

export const setComments = (payload: any) => {
  return {
    type: "SET_COMMENT",
  };
};

export const setLike = (payload: any) => {
  return {
    type: "SET_LIKE",
  };
};
