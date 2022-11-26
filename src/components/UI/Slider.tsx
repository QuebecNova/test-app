import { Box, CircularProgress, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import { IPhotosEntity } from "../../store/slices/photos";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import DotFilledIcon from "@mui/icons-material/FiberManualRecord";
import DotOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";

type Props = {
  images: IPhotosEntity[];
};

export function Slider({ images }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const showNextSlide = () => {
    const newSlideIndex = slideIndex === images.length - 1 ? 0 : slideIndex + 1;
    setSlideIndex(newSlideIndex);
    setImgLoaded(false)
  };

  const showPrevSlide = () => {
    const newSlideIndex = slideIndex === 0 ? images.length - 1 : slideIndex - 1;
    setSlideIndex(newSlideIndex);
    setImgLoaded(false)
  };

  const setSlide = (index: number) => {
    setSlideIndex(index);
    setImgLoaded(false)
  };

  return (
    <Box
      sx={{ position: "relative", display: "flex", justifyContent: "center" }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <IconButton
          onClick={showPrevSlide}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={() => showNextSlide()}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
        <Paper
          sx={{ position: "relative", padding: 2, width: "fit-content" }}
          elevation={12}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: '600px',
              height: '600px'
            }}
          >
            {!imgLoaded && <CircularProgress />}
            <img
              style={imgLoaded ? {} : {display: 'none'}}
              src={images[slideIndex].url}
              onLoad={() => setImgLoaded(true)}
            />
          </Box>
        </Paper>
        <Box
          sx={{
            display: "flex",
            gap: "1px",
            paddingLeft: "10px",
            mt: 2,
          }}
        >
          {images.map((image, index) => {
            return (
              <IconButton
                key={image.id}
                sx={{ width: "12px", height: "12px" }}
                onClick={() => setSlide(index)}
              >
                {index === slideIndex ? <DotFilledIcon /> : <DotOutlinedIcon />}
              </IconButton>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
