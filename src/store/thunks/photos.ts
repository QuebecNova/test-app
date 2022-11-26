import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
import { IPhotosEntity } from "../slices/photos";

export const fetchAlbumPhotos = createAsyncThunk(
  "photos/fetchAlbumPhotos",
  async (albumId: string | number, { getState }) => {
    const state = getState() as RootState;

    if (state.photos.loadedPhotosAlbumIds.includes(albumId)) return;

    const response = (await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    )) as any;

    let entities: IPhotosEntity[] = [];
    let ids: number[] = [];

    if (response.data && response.data.length) {
      entities = response.data;
      ids = response.data.reduce((acc: number[], item: IPhotosEntity) => {
        acc.push(item.id);
        return acc;
      }, []);
    }

    return { ids, entities, albumId };
  }
);
