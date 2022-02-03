const initialState: object[] = [];

const setCommentsFromPayload = (state: any[], payload: any) => {
  debugger;
  let isIDExist = false;

  //if id exists
  state.forEach((stateItem) => {
    if (stateItem?.id === payload.id) {
      isIDExist = true;
      payload.comment && stateItem.comment.push(payload.comment);
    }
  });

  //if id not exist
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
