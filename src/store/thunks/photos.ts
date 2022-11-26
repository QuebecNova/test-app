import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";

export const fetchAlbumPhotos = createAsyncThunk(
  "photos/fetchAlbumPhotos",
  async (albumId: string | number, { getState }) => {
    const state = getState() as RootState;

    if (state.photos.loadedPhotosAlbumIds.includes(albumId)) return;

    const data = (await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    )) as any;

    let entities: IPhotosEntity[] = [];
    let ids: number[] = [];

    if (data.data && data.data.length) {
      entities = data.data;
      ids = data.data.reduce((acc: number[], item: IPhotosEntity) => {
        acc.push(item.id);
        return acc;
      }, []);
    }

    return { ids, entities, albumId };
  }
);