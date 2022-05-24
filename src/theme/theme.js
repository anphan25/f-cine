import React from 'react';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import breakpoints from './breakpoints';
import palette from './palette';
import typography from './typography';
import Overrides from './overrides';

const ThemeProvider = ({ children }) => {
  const theme = createTheme({
    palette,
    breakpoints,
    typography,
  });

  theme.components = Overrides(theme);

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
