import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbumById, fetchAlbums } from "../thunks/albums";

export type IAlbumEntity = {
  userId: number;
  id: number;
  title: string;
};

type IInitialState = {
  entities: IAlbumEntity[];
  albumLoading: number[];
  ids: number[];
  loading: boolean;
  error: null | string;
  success: boolean;
};

const initialState: IInitialState = {
  entities: [],
  ids: [],
  albumLoading: [],
  loading: false,
  error: null,
  success: false,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchAlbumById.pending, (state) => {
        state.error = null;
        state.loading = true;
      });
    builder
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        if (action.payload) {
          state.entities = state.entities.concat(action.payload.entities);
          state.ids = state.ids.concat(action.payload.ids);
        }
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.error = null;
        if (action.payload?.entity && action.payload.id) {
          state.entities.push(action.payload.entity);
          state.ids.push(action.payload.id);
        }
        state.loading = false;
        state.success = true;
      });
    builder
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
        state.success = false;
      })
      .addCase(fetchAlbumById.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.albumLoading.filter((id) => id !== action.payload);
        state.success = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
