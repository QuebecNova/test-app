import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addTodo,
  changeTodoCompletedById,
  changeTodoTitleById,
  deleteTodoById,
  fetchTodos,
} from "../thunks/todos";

export type ITodosEntity = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export type ITodosEntities = {
  completed: ITodosEntity[];
  uncompleted: ITodosEntity[];
};

type IInitialState = {
  entities: ITodosEntities;
  ids: number[];
  userIdTodosFetched: number[];
  loading: boolean;
  error: null | string;
  success: boolean;
};

const initialState: IInitialState = {
  entities: { completed: [], uncompleted: [] },
  ids: [],
  userIdTodosFetched: [],
  loading: false,
  error: null,
  success: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reorderTodos(
      state,
      action: PayloadAction<{
        fromColumn: "completed" | "uncompleted";
        toColumn: "completed" | "uncompleted";
        fromIndex: number;
        toIndex: number;
      }>
    ) {
      const [reorderedItem] = state.entities[action.payload.fromColumn].splice(
        action.payload.fromIndex,
        1
      );
      state.entities[action.payload.toColumn].splice(
        action.payload.toIndex,
        0,
        reorderedItem
      );
    },
  },
  extraReducers: (builder) => {
    function sharedPendingReducer(state: IInitialState) {
      state.error = null;
    }

    builder
      .addCase(changeTodoCompletedById.pending, sharedPendingReducer)
      .addCase(addTodo.pending, sharedPendingReducer)
      .addCase(deleteTodoById.pending, sharedPendingReducer)
      .addCase(changeTodoTitleById.pending, sharedPendingReducer)
      .addCase(fetchTodos.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.success = false;
      });

    builder
      .addCase(changeTodoCompletedById.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(deleteTodoById.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(changeTodoTitleById.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
        state.success = false;
      });

    builder
      .addCase(changeTodoCompletedById.fulfilled, (state, action) => {
        if (action.payload) {
          const todo = state.entities[action.payload.column].find(
            (todo) => todo.id === action.payload.id
          );
          if (todo) {
            todo.completed = action.payload.completed;
          }
        }
        state.error = null;
        toast.success("Todos reordered");
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.entities[action.payload.column].push({
          id: state.ids.length + 1,
          userId: state.entities["completed"][0].userId,
          title: action.payload.title,
          completed: action.payload.column === "completed",
        });
        state.ids.push(state.ids.length + 1);
        toast.success("Todo added");
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        if (action.payload) {
          state.entities.completed = state.entities.completed.concat(
            action.payload.entities.completed
          );
          state.entities.uncompleted = state.entities.uncompleted.concat(
            action.payload.entities.uncompleted
          );
          state.ids = state.ids.concat(action.payload.ids);
          state.userIdTodosFetched.push(action.payload.userId);
        }
      })
      .addCase(deleteTodoById.fulfilled, (state, action) => {
        state.entities[action.payload.column] = state.entities[
          action.payload.column
        ].filter((todo) => todo.id !== action.payload.id);
        state.ids = state.ids.filter((id) => id !== action.payload.id);
        toast.success("Todo deleted");
      })
      .addCase(changeTodoTitleById.fulfilled, (state, action) => {
        const todo = state.entities[action.payload.column].find(
          (todo) => todo.id === action.payload.id
        );
        if (todo) {
          todo.title = action.payload.title;
          toast.success("Todo title changed");
        }
      });
  },
});

export const { reorderTodos } = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
