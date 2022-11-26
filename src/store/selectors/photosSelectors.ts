import { RootState } from "..";

export const selectPhotosModuleState = (state: RootState) => state.photos;

export const selectPhotosIds = (state: RootState) =>
  selectPhotosModuleState(state).ids;

export const selectPhotosEntities = (state: RootState) =>
  selectPhotosModuleState(state).entities;

export const selectPhotosByAlbumId = (
  state: RootState,
  { albumId }: { albumId: number }
) => selectPhotosEntities(state).filter((photo) => photo.albumId === albumId);
