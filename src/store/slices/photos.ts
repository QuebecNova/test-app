import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbumPhotos } from '../thunks/photos';

export type IPhotosEntity = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type IInitialState = {
  entities: IPhotosEntity[];
  ids: number[];
  loadedPhotosAlbumIds: Array<string | number>;
  loading: boolean;
  error: null | string;
  success: boolean;
};

const initialState: IInitialState = {
  entities: [],
  ids: [],
  loadedPhotosAlbumIds: [],
  loading: false,
  error: null,
  success: false,
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAlbumPhotos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAlbumPhotos.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      if (action.payload) {
        state.loadedPhotosAlbumIds.push(action.payload.albumId);
        state.entities.push(...action.payload.entities);
        state.ids.push(...action.payload.ids);
      }
    });
    builder.addCase(fetchAlbumPhotos.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
      state.loading = false;
    });
  },
});

export const photosReducer = photosSlice.reducer;