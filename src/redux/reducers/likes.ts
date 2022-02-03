const initialState: object[] = [];

const setLikeFromPayload = (state: any[], payload: any) => {
  debugger;
  let isIDExist = false;

  //if id exists
  state.forEach((stateItem) => {
    if (stateItem?.id === payload.id) {
      isIDExist = true;
      payload.isLiked && (stateItem.islike = payload.isLiked);
    }
  });

  //if id not exist
  let like = {};

  if (isIDExist === false) {
    let islike = false;

    payload.isLiked && (islike = payload.isLiked);

    like = {
      id: payload.id,
      islike: islike,
    };
  }
  const likes = [...state, like];
  return likes;
};

const setLikes = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_LIKE":
      return setLikeFromPayload(state, action.payload);

    default:
      return state;
  }
};

export default setLikes;
