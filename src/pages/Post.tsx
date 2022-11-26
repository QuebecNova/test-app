import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { PostComments } from "../components/UI/PostComments";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  selectPostById,
  selectPostsModuleState,
} from "../store/selectors/postsSelectors";
import { fetchPostById } from "../store/thunks/posts";
import { toast } from "react-toastify";
import { CenteredSpinner } from "../components/UI/CenteredSpinner";

export function Post() {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const post = useAppSelector((state) =>
    selectPostById(state, { postId: parseInt(postId || "1") })
  );
  const postState = useAppSelector((state) => selectPostsModuleState(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!postId || post) return;
    dispatch(fetchPostById(postId));
  }, []);

  const loadingNode = (() => {
    if (postState.loading) return <CenteredSpinner />;
    if (postState.error) toast.error(postState.error);
    return "";
  })();

  return (
    <Container sx={{ width: "45%" }}>
      {loadingNode}
      {postState.success && post && (
        <Card>
          <CardHeader
            title={
              <Box>
                <Typography variant="h5" sx={{ paddingBottom: "16px" }}>
                  Post: {post.title}
                </Typography>
                <Divider />
              </Box>
            }
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <Typography>{post.body}</Typography>
              <Typography>Comments:</Typography>
            </Box>
            <PostComments postId={post.id} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
