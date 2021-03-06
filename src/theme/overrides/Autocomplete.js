export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {},
        root: {
          borderRadius: 12,
          "& .MuiOutlinedInput-root": {
            padding: "6px",
          },
        },
        listbox: {
          padding: theme.spacing(0, 1),
          "& .MuiAutocomplete-option": {
            padding: theme.spacing(1),
            margin: theme.spacing(1, 0),
            borderRadius: 12,
          },
        },
      },
    },
  };
}
