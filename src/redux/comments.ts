import { createSlice } from "@reduxjs/toolkit";

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

interface State {
  comments: [];
}

const initialState: State = {
  comments: [],
};

export const slice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setComment: (state, { payload }) => {
      //@ts-ignore
      state.comments = setCommentsFromPayload(state.comments, payload);
    },
  },
});

export const { setComment } = slice.actions;

export const selectCount = (state: any) => state.counter.likes;

export default slice.reducer;
