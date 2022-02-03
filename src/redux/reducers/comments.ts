const initialState: object[] = [];

const setCommentsFromPayload = (state: any[], payload: any) => {
  let isIDExist = false;

  state.forEach((stateItem) => {
    if (stateItem?.id === payload.id) {
      isIDExist = true;
      payload.comment && stateItem.comment.push(payload.comment);
    }
  });

  let userComment = {};

  if (isIDExist === false) {
    let comment = [];
    comment.push(payload.comment);

    userComment = {
      id: payload.id,
      comment: comment,
    };
  }

  const comments = [...state, userComment];
  return comments;
};

const setComments = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_COMMENT":
      return setCommentsFromPayload(state, action.payload);

    default:
      return state;
  }
};

export default setComments;
