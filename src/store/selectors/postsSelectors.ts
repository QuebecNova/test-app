import { RootState } from "..";

export const selectPostsModuleState = (state: RootState) => state.posts;

export const selectPostsIds = (state: RootState) =>
  selectPostsModuleState(state).ids;

export const selectPostsEntities = (state: RootState) =>
  selectPostsModuleState(state).entities;

export const selectPostById = (
  state: RootState,
  { postId }: { postId: number | string }
) => selectPostsEntities(state).find((post) => post.id === postId);
