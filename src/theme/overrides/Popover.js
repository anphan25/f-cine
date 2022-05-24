// ----------------------------------------------------------------------

export default function Popover(theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
}
