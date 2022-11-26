import { AppBar, Box, Divider, IconButton, Tab, Tabs, Toolbar } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Props = {
  mode: 'dark' | 'light';
  setMode: (theme: 'dark' | 'light') => void
}

export default function Header({mode, setMode}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const navRoutes = ["/posts", "/albums", "/todos"];
  const currentTab = navRoutes.includes(location.pathname)
    ? location.pathname
    : false;

  const setTheme = () => {
    const newThemeMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newThemeMode)
    localStorage.setItem('theme', newThemeMode)
  }

  return (
    <AppBar
      sx={{
        position: "fixed",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: '100%',
        }}
      >
        <Toolbar sx={{position: 'relative'}}>
          <Tabs value={currentTab} textColor="secondary" indicatorColor="secondary">
            <Tab
              label="Posts"
              value={"/posts"}
              onClick={() => {
                navigate("/posts");
              }}
            />
            <Tab
              label="Albums"
              value={"/albums"}
              onClick={() => {
                navigate("/albums");
              }}
            />
            <Tab
              label="Todos"
              value={"/todos"}
              onClick={() => {
                navigate("/todos");
              }}
            />
          </Tabs>
          <IconButton onClick={setTheme} sx={{position: 'absolute', right: '-20px'}}>
            {mode === 'dark' ? <DarkModeIcon/> : <LightModeIcon/>}
          </IconButton>
        </Toolbar>
        <Divider />
      </Box>
    </AppBar>
  );
}
