import { RootState } from "..";

export const selectAlbumsModuleState = (state: RootState) => state.albums;

export const selectAlbumsIds = (state: RootState) =>
  selectAlbumsModuleState(state).ids;

export const selectAlbumsEntities = (state: RootState) =>
  selectAlbumsModuleState(state).entities;

export const selectAlbumById = (
  state: RootState,
  { albumId }: { albumId: number }
) => selectAlbumsEntities(state).find((album) => album.id === albumId);
