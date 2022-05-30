// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'capitalize',
          fontSize: 20,
          fontWeight: 600,
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          textTransform: 'capitalize',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        // containedPrimary: {
        //   boxShadow: theme.customShadows.primary,
        // },
        // containedSecondary: {
        //   boxShadow: theme.customShadows.secondary,
        // },
        // containedInfo: {
        //   boxShadow: theme.customShadows.info,
        // },
        // containedSuccess: {
        //   boxShadow: theme.customShadows.success,
        // },
        // containedWarning: {
        //   boxShadow: theme.customShadows.warning,
        // },
        // containedError: {
        //   boxShadow: theme.customShadows.error,
        // },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
