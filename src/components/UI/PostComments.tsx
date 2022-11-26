import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectCommentsByPostId,
  selectCommentsModuleState,
} from "../../store/selectors/commentsSelector";
import { fetchPostComments } from "../../store/thunks/comments";
import {
  Card,
  Container,
  Paper,
  CardHeader,
  CardContent,
  useTheme,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export function PostComments({ postId }: { postId: string | number }) {
  const theme = useTheme();

  const postComments = useAppSelector((state) =>
    selectCommentsByPostId(state, { postId })
  );
  const postCommentsState = useAppSelector((state) =>
    selectCommentsModuleState(state)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postComments.length) return;
    dispatch(fetchPostComments(postId));
  }, []);

  const loadingNode = (() => {
    if (postCommentsState.loading) return <CircularProgress />;
    if (postCommentsState.error) toast.error(postCommentsState.error);
    return "";
  })();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginBottom: "15px",
      }}
    >
      {loadingNode}
      {!!postComments.length &&
        postComments.map((comment) => (
          <Paper key={comment.id} elevation={12}>
            <Card sx={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '' }}>
              <CardHeader
              sx={{paddingBottom: 0}}
                title={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <Typography variant="caption">{comment.email}</Typography>

                    <Typography variant="h6">{comment.name}</Typography>
                    <Divider />
                  </Box>
                }
              />
              <CardContent>{comment.body}</CardContent>
            </Card>
          </Paper>
        ))}
    </Container>
  );
}
