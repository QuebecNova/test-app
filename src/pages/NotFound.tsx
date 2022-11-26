import React from "react";
import { Box, Button, Typography } from "@mui/material";
import cat from "../assets/images/404_not_found.png";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography variant="h5">How did you get here???</Typography>
      <img src={cat} width={512} height={341} />
      <Button
        variant="outlined"
        sx={{ width: "fit-content" }}
        onClick={() => navigate('/posts')}
      >
        Go to posts?
      </Button>
    </Box>
  );
}
