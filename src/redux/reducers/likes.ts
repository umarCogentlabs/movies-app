const initialState: object[] = [];

const setLikeFromPayload = (state: any[], payload: any) => {
  let isIDExist = false;

  state.forEach((stateItem) => {
    if (stateItem?.id === payload.id) {
      isIDExist = true;
      stateItem.islike = payload.isLiked;
    }
  });

  let like = {};

  if (isIDExist === false) {
    let islike = false;

    islike = payload.isLiked;

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
