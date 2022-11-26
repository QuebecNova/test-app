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
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toast } from "react-toastify";
import {
  selectAlbumById,
  selectAlbumsModuleState,
} from "../store/selectors/albumSelectors";
import { AlbumPhotos } from "../components/UI/AlbumPhotos";
import { fetchAlbumById } from "../store/thunks/albums";
import { CenteredSpinner } from '../components/UI/CenteredSpinner';

export function Album() {
  const [params] = useSearchParams();
  const albumId = params.get("id");
  const album = useAppSelector((state) =>
    selectAlbumById(state, { albumId: parseInt(albumId || "1") })
  );
  const albumState = useAppSelector((state) => selectAlbumsModuleState(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!albumId || album) return;
    dispatch(fetchAlbumById(+albumId));
  }, []);

  const loadingNode = (() => {
    if (albumState.loading) return <CenteredSpinner />;
    if (albumState.error) toast.error(albumState.error);
    return "";
  })();

  return (
    <Container sx={{width: '850px'}}>
      {loadingNode}
      {albumState.success && album && (
        <Card>
          <CardHeader
            title={
              <Box>
                <Typography variant="h5" sx={{ paddingBottom: "16px" }}>
                  Album: {album.title}
                </Typography>
                <Divider />
              </Box>
            }
          />
          <CardContent>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Photos:
            </Typography>
            <AlbumPhotos albumId={album.id} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
