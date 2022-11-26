import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAlbums } from "../store/thunks/albums";
import { CenteredSpinner } from "../components/UI/CenteredSpinner";

export function Albums() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const albumsLimit = params.get("limit") || '10';
  const albumsStart = params.get("start") || '1';

  const albums = useAppSelector((state) => state.albums);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAlbums({ start: +albumsStart, limit: +albumsLimit }));
  }, []);

  const loadingNode = (() => {
    if (albums.loading) return <CenteredSpinner />;
    if (albums.error) toast.error(albums.error);
    return "";
  })();

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Albums
        </Typography>
        {loadingNode}
        {albums.success &&
          albums.entities.map((album) => (
            <Card key={album.id}>
              <CardHeader
                sx={{ paddingBottom: "5px" }}
                title={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {album.title}
                    <Button onClick={() => navigate(`/album?id=${album.id}`)}>
                      Open
                    </Button>
                  </Box>
                }
              />
            </Card>
          ))}
      </Box>
    </Container>
  );
}
