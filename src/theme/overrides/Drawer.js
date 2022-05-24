import { alpha } from '@mui/material';

// ----------------------------------------------------------------------

export default function Drawer(theme) {
  return {
    MuiDrawer: {
      styleOverrides: {
        modal: {
          '&[role="presentation"]': {
            '& .MuiDrawer-paperAnchorLeft': {
              boxShadow: `8px 24px 24px 12px ${alpha(
                theme.palette.grey[900],
                0.16
              )}`,
            },
            '& .MuiDrawer-paperAnchorRight': {
              boxShadow: `-8px 24px 24px 12px ${alpha(
                theme.palette.grey[900],
                0.16
              )}`,
            },
          },
        },
      },
    },
  };
}
