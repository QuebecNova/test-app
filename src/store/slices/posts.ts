import { createSlice } from "@reduxjs/toolkit";
import { fetchPostById, fetchPosts } from "../thunks/posts";

export type IPostEntity = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type IInitialState = {
  entities: IPostEntity[];
  ids: number[];
  loading: boolean;
  postLoading: number[];
  error: null | string;
  success: boolean;
};

const initialState: IInitialState = {
  entities: [],
  ids: [],
  postLoading: [],
  loading: false,
  error: null,
  success: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.error = null;
        state.loading = true;
      });
      
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        if (action.payload) {
          state.entities = action.payload.entities;
          state.ids = action.payload.ids;
        }
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload?.entity && action.payload.id) {
          state.entities.push(action.payload.entity);
          state.ids.push(action.payload.id);
        }
        state.loading = false;
        state.success = true;
      });

    builder
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
        state.success = false;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.postLoading.filter((id) => id !== action.payload);
        state.success = false;
      });
  },
});

export const postsReducer = postsSlice.reducer;
