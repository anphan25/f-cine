// ----------------------------------------------------------------------

export default function Fab(theme) {
  return {
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.grey[400],
          },
        },
        primary: {
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        secondary: {
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        },
        extended: {
          '& svg': {
            marginRight: theme.spacing(1),
          },
        },
      },
    },
  };
}
