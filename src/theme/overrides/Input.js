export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background[0],
          padding: '12px',
          fontWeight: 600,
          borderRadius: '12px',
          border: `2px solid transparent`,
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.neutral[700] },
          },
          '&.Mui-focused': {
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.neutral[0],
          },
        },

        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.neutral[700],
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background[0],
        },
        underline: {},
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.grey[500_16],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500_32],
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
