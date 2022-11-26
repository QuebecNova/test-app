import { RootState } from "..";

export const selectCommentsModuleState = (state: RootState) => state.comments;

export const selectCommentsIds = (state: RootState) =>
  selectCommentsModuleState(state).ids;

export const selectCommentsEntities = (state: RootState) =>
  selectCommentsModuleState(state).entities;

export const selectCommentsByPostId = (
  state: RootState,
  { postId }: { postId: number | string }
) =>
  selectCommentsEntities(state).filter((comment) => comment.postId === postId);
