import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios from 'axios';
import { ICommentsEntity } from '../slices/comments';

export const fetchPostComments = createAsyncThunk(
    "post/fetchPostComments",
    async (postId: string | number, {getState}) => {
  
      const state = getState() as RootState
  
      if (state.comments.loadedCommentsPostIds.includes(postId)) return
  
      const data = (await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      )) as any;
  
      let entities: ICommentsEntity[] = [];
      let ids: number[] = [];
  
      if (data.data && data.data.length) {
        entities = data.data;
        ids = data.data.reduce((acc: number[], item: ICommentsEntity) => {
          acc.push(item.id);
          return acc;
        }, []);
      }
  
      return { ids, entities, postId };
    }
  );