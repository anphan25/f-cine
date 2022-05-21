import React, { useMemo } from 'react';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import breakpoints from './breakpoints';
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import useAppTheme from 'hooks/useAppTheme';

const ThemeProvider = ({ children }) => {
  const { mode } = useAppTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: mode === 'light' ? palette.light : palette.dark,
        breakpoints,
        typography,
        shadows: mode === 'light' ? shadows.light : shadows.dark,
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export default ThemeProvider;
