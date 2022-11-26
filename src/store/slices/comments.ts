import { createSlice } from "@reduxjs/toolkit";
import { fetchPostComments } from "../thunks/comments";

export type ICommentsEntity = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type IInitialState = {
  entities: ICommentsEntity[];
  ids: number[];
  loadedCommentsPostIds: Array<string | number>
  loading: boolean;
  error: null | string;
  success: boolean;
};

const initialState: IInitialState = {
  entities: [],
  ids: [],
  loadedCommentsPostIds: [],
  loading: false,
  error: null,
  success: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      if (action.payload) {
          state.loadedCommentsPostIds.push(action.payload.postId)
          state.entities.push(...action.payload.entities);
          state.ids.push(...action.payload.ids);
      }
    });
    builder.addCase(fetchPostComments.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
      state.loading = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;