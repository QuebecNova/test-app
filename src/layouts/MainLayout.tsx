import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import createPalette from "@mui/material/styles/createPalette";
import React, { useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { getPalette } from "../assets/theme/palette";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { Routing } from "../Routing";
import "react-toastify/dist/ReactToastify.css";

const sysMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
const localStorageMode = localStorage.getItem('theme') as 'dark' || 'light'
const initialMode = localStorageMode || sysMode || 'dark'

export function MainLayout() {
  const [mode, setMode] = useState<'dark' | 'light'>(initialMode);
  const palette = createPalette(getPalette(mode));

  const theme = createTheme({ palette });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ToastContainer
        theme="dark"
        hideProgressBar
        limit={3}
        transition={Slide}
      />
      <Header mode={mode} setMode={setMode}/>
      <Box sx={{ marginTop: "75px" }} />
      <Routing />
      <Footer />
    </ThemeProvider>
  );
}
