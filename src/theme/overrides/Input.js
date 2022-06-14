export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background[0],
          padding: "10px",
          fontWeight: 400,
          borderRadius: "12px",
          border: `2px solid transparent`,
          "&.Mui-disabled": {
            "& svg": { color: theme.palette.neutral[700] },
          },
          "&.Mui-focused": {
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.neutral[0],
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          "& .MuiOutlinedInput-notchedOutline, & .Mui-hovered": {
            border: "none",
          },
        },

        input: {
          "&::placeholder": {
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
        underline: {
          "&&&:before": {
            borderBottom: "none",
          },
          "&&:after": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          "&:hover": {
            backgroundColor: theme.palette.grey[500_16],
          },
          "&.Mui-focused": {
            backgroundColor: theme.palette.action.focus,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          "&:before": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderBottom: "none",
          },
          borderRadius: "12px",
        },
      },
    },
  };
}
