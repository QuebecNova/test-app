import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { IAlbumEntity } from "../slices/albums";

export const fetchAlbumById = createAsyncThunk(
  "albums/fetchAlbumById",
  async (albumId: number, { getState }) => {
    const response = (await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`
    )) as any;

    const state = getState() as RootState;

    console.log(state.albums.ids.some((id) => id === albumId))

    if (state.albums.ids.some((id) => id === albumId)) return;

    let id: number | null = null;
    let entity: IAlbumEntity | null = null;

    if (response.data) {
      id = response.data.id as number;
      entity = response.data as IAlbumEntity;
    }

    return { id, entity };
  }
);

export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async ({
    start,
    limit,
  }: {
    start: number | null;
    limit: number | null;
  }, {getState}) => {
    const response = (await axios.get(
      `https://jsonplaceholder.typicode.com/albums?_start=${
        start || 1
      }&_limit=${limit || 10}`
    )) as any;

    const state = getState() as RootState;

    let fetched = 0

    for (let i = start || 1; i <= (limit || 10); i++) {
        if (state.albums.ids.includes(i)) {
            fetched++
        }
    }

    if (fetched === (limit || 10) - 1) return;

    let ids: number[] = [];
    let entities: IAlbumEntity[] = [];

    if (response.data && response.data.length) {
      ids = response.data.reduce((acc: number[], item: IAlbumEntity) => {
        acc.push(item.id);
        return acc;
      }, []);

      entities = response.data;
    }

    return { ids, entities };
  }
);
