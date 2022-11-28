import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodosEntities, ITodosEntity } from "../slices/todos";
import { RootState } from "..";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userId: number, {getState}) => {
    const state = getState() as RootState;
  
    if (state.todos.userIdTodosFetched.some((id) => id === userId)) return;

    const response = (await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    )) as any;

    let ids: number[] = [];
    let entities: ITodosEntities = { completed: [], uncompleted: [] };

    if (response.data && response.data.length) {
      ids = response.data.reduce((acc: number[], item: ITodosEntity) => {
        acc.push(item.id);
        return acc;
      }, []);

      const completed = response.data.filter(
        (item: ITodosEntity) => item.completed
      );
      const uncompleted = response.data.filter(
        (item: ITodosEntity) => !item.completed
      );

      entities = { completed, uncompleted } as unknown as ITodosEntities;
    }

    return { ids, entities, userId };
  }
);

export const changeTodoCompletedById = createAsyncThunk(
  "todos/changeTodoCompletedById",
  async ({
    id,
    column,
    completed,
  }: {
    id: number;
    column: "completed" | "uncompleted";
    completed: boolean;
  }) => {
    await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed }
    );

    return { column, id, completed };
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({
    userId,
    column,
    title,
  }: {
    userId: string | number;
    column: "completed" | "uncompleted";
    title: string;
  }) => {
    await axios.post(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
      { title, completed: column === "completed" }
    );

    return { column, title };
  }
);

export const deleteTodoById = createAsyncThunk(
  "todos/deleteTodoById",
  async ({
    id,
    column,
  }: {
    column: "completed" | "uncompleted";
    id: number;
  }) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    return { column, id };
  }
);

export const changeTodoTitleById = createAsyncThunk(
  "todos/changeTodoTitleById",
  async ({
    id,
    column,
    title,
  }: {
    column: "completed" | "uncompleted";
    id: number;
    title: string;
  }) => {
    await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      title,
    });

    return { column, id, title };
  }
);
