import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPosts } from "../store/thunks/posts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PostComments } from "../components/UI/PostComments";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CenteredSpinner } from "../components/UI/CenteredSpinner";
import { ExpandMore } from "../components/UI/ExpandMore";

export function Posts() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const postsLimit = params.get("limit");
  const postsStart = params.get("start");

  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchPosts({ start: postsStart, limit: postsLimit }));
  }, []);

  const handleExpand = (postId: number) => {
    if (expandedPosts.includes(postId)) {
      return setExpandedPosts((prev) => prev.filter((id) => id !== postId));
    }

    setExpandedPosts((prev) => prev.concat([postId]));
  };

  const loadingNode = (() => {
    if (posts.loading) return <CenteredSpinner />;
    if (posts.error) toast.error(posts.error);
    return "";
  })();

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Posts
        </Typography>
        {loadingNode}
        {posts.success &&
          posts.entities.map((post) => (
            <Card key={post.id}>
              <CardHeader
                title={
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {post.title}
                    <Button onClick={() => navigate(`/post?id=${post.id}`)}>
                      Open
                    </Button>
                  </Box>
                }
              />
              <CardContent>{post.body}</CardContent>
              <CardActions>
                <Box sx={{ marginLeft: "auto" }}>
                  Comments
                  <ExpandMore
                    expand={expandedPosts.includes(post.id)}
                    onClick={() => handleExpand(post.id)}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Box>
              </CardActions>
              <Collapse in={expandedPosts.includes(post.id)} unmountOnExit>
                <PostComments postId={post.id} />
              </Collapse>
            </Card>
          ))}
      </Box>
    </Container>
  );
}
