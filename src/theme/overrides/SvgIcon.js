export default function SvgIcon() {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          width: 16,
          height: 16,
          fontSize: 'inherit',
        },
        fontSizeLarge: {
          width: 24,
          height: 24,
          fontSize: 'inherit',
        },
      },
    },
  };
}
