import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserItemType } from "./apiSlice";

interface UserPostState {
  items: UserItemType[];
}

const initialState: UserPostState = {
  items: [],
};

const userPostSlice = createSlice({
  name: "userPost",
  initialState,
  reducers: {
    initPost: (state, action: PayloadAction<UserItemType[]>) => {
      state.items = [...state.items, ...action.payload];
    },
    likePost: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) => {
        if (item._id === action.payload) {
          return { ...item, isLike: true };
        }
        return item;
      });
    },
    // ต้องแยก like กับ dislike เพราะจะมีเคสกดที่รูป 2 ครั้งแล้วจะไม่เปลี่ยนสถานะ like
    disLikePost: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) => {
        if (item._id === action.payload) {
          return { ...item, isLike: false };
        }
        return item;
      });
    },
  },
});

export const { initPost, likePost, disLikePost } = userPostSlice.actions;
export default userPostSlice.reducer;
