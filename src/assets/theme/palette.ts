import { PaletteOptions } from "@mui/material";

export function getPalette(mode?: 'dark' | 'light') : PaletteOptions {
  return {
    mode: mode,
    ...(mode === "dark"
      ? {
          ...darkPalette,
        }
      : {
          ...lightPalette,
        }),
  };
}

const darkPalette = {
  secondary: {
    main: '#90caf9'
  }
};

const lightPalette = {
  secondary: {
    main: '#ffffff'
  },
  grey: {
    900: '#ffffff'
  }
};
