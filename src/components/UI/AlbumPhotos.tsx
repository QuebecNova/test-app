import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import {
  selectPhotosByAlbumId,
  selectPhotosModuleState,
} from "../../store/selectors/photosSelectors";
import { fetchAlbumPhotos } from "../../store/thunks/photos";
import { Slider } from "./Slider";

export function AlbumPhotos({ albumId }: { albumId: number }) {
  const albumPhotos = useAppSelector((state) =>
    selectPhotosByAlbumId(state, { albumId })
  );
  const albumPhotosState = useAppSelector((state) =>
    selectPhotosModuleState(state)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (albumPhotos.length) return;
    dispatch(fetchAlbumPhotos(albumId));
  }, []);

  const loadingNode = (() => {
    if (albumPhotosState.loading) return <CircularProgress />;
    if (albumPhotosState.error) toast.error(albumPhotosState.error);
    return "";
  })();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        marginBottom: "15px",
      }}
    >
      {loadingNode}
      {!!albumPhotos.length && <Slider images={albumPhotos} />}
    </Container>
  );
}
