import React from "react";
import { Box, Link, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10px",
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      <footer>
        <Link href="https://github.com/QuebecNova/test-app">
          <Typography variant="body1">QuebecNova</Typography>
        </Link>
      </footer>
    </Box>
  );
}
