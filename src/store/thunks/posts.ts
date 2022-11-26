import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { IPostEntity } from '../slices/posts';

export const fetchPostById = createAsyncThunk(
    "posts/fetchPostById",
    async (postId: string | number, { getState }) => {
      const data = (await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      )) as any;
  
      const state = getState() as RootState;
  
      if (state.posts.ids.some((id) => id === postId)) return;
  
      let id: number | null = null;
      let entity: IPostEntity | null = null;
  
      if (data.data) {
        id = data.data.id as number;
        entity = data.data as IPostEntity;
      }
  
      return { id, entity };
    }
  );
  
  export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async ({
      start,
      limit,
    }: {
      start: string | number | null;
      limit: string | number | null;
    }) => {
      const data = (await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${start || 1}&_limit=${
          limit || 10
        }`
      )) as any;
  
      let ids: number[] = [];
      let entities: IPostEntity[] = [];
  
      if (data.data && data.data.length) {
        ids = data.data.reduce((acc: number[], item: IPostEntity) => {
          acc.push(item.id);
          return acc;
        }, []);
  
        entities = data.data;
      }
  
      return { ids, entities };
    }
  );