export default function Popover(theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '1rem',
          padding: '16px',
        },
      },
    },
  };
}
