import { createSlice } from "@reduxjs/toolkit";

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
const initialState = {
  likes: [],
};
export const slice = createSlice({
  name: "likes",
  initialState,

  reducers: {
    setLike: (state, { payload }) => {
      //@ts-ignore
      state.likes = setLikeFromPayload(state.likes, payload);
    },
  },
});

export const { setLike } = slice.actions;

export default slice.reducer;
