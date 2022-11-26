import { configureStore } from "@reduxjs/toolkit";
import {
  albumsReducer,
  postsReducer,
  todosReducer,
  commentsReducer,
  photosReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    photos: photosReducer,
    todos: todosReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
