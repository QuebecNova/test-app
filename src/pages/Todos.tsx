import { Container, Grid, Box, Typography } from "@mui/material";
import React, { createRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeTodoCompletedById, fetchTodos } from "../store/thunks/todos";
import { reorderTodos } from "../store/slices/todos";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CenteredSpinner } from "../components/UI/CenteredSpinner";
import { TodosColumn } from "../components/TodosColumn";

interface IExtendedDropResult extends DropResult {
  source: {
    droppableId: "completed" | "uncompleted";
    index: number;
  };
  destination: {
    droppableId: "completed" | "uncompleted";
    index: number;
  };
}

export function Todos() {
  const [params, setParams] = useSearchParams();
  const todoId = params.get("id");

  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const form = createRef<HTMLFormElement>();

  useEffect(() => {
    if (!todoId) return setParams({ id: "1" });
    if (todos.ids.length) return;
    dispatch(fetchTodos(+todoId));
  }, [todoId]);

  const loadingNode = (() => {
    if (todos.loading) return <CenteredSpinner />;
    if (todos.error) toast.error(todos.error);
    return "";
  })();

  const onDragEnd = (data: IExtendedDropResult) => {
    const fromColumn = data.source.droppableId;
    if (data.destination) {
      const toColumn = data.destination.droppableId;

      if (fromColumn !== toColumn) {
        const completed = toColumn === "completed" ? true : false;
        dispatch(
          changeTodoCompletedById({
            id: parseInt(data.draggableId),
            completed,
            column: fromColumn,
          })
        );
      }
      dispatch(
        reorderTodos({
          fromIndex: data.source.index,
          toIndex: data.destination.index,
          fromColumn,
          toColumn,
        })
      );
    }

    toast.success("Todos reordered!");
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box>
        <Typography
          variant="h2"
          sx={{ textAlign: "center", marginBottom: "15px" }}
        >
          Todos
        </Typography>
        {loadingNode}
        {todos.success && (
          <DragDropContext onDragEnd={onDragEnd}>
            <form ref={form}>
              <Grid container spacing={2} justifyContent="center" wrap="nowrap">
                <Droppable droppableId="completed">
                  {(provided) => (
                    <Grid
                      item
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ width: "400px" }}
                    >
                      <TodosColumn
                        form={form}
                        completed
                        placeholder={provided.placeholder}
                      />
                    </Grid>
                  )}
                </Droppable>
                <Droppable droppableId="uncompleted">
                  {(provided) => (
                    <Grid
                      item
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ width: "400px" }}
                    >
                      <TodosColumn
                        form={form}
                        placeholder={provided.placeholder}
                      />
                    </Grid>
                  )}
                </Droppable>
              </Grid>
            </form>
          </DragDropContext>
        )}
      </Box>
    </Container>
  );
}
