// import { pxToRem, responsiveFontSizes } from '../utils/getFontValue';

// ----------------------------------------------------------------------

const FONT_PRIMARY = 'Poppins, sans-serif';

const typography = {
  fontFamily: FONT_PRIMARY,
  h1: {
    fontWeight: 600,
    lineHeight: '64px',
    fontSize: 64,
    // ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 600,
    lineHeight: '48px',
    fontSize: 48,
  },
  h3: {
    fontWeight: 600,
    lineHeight: '48px',
    fontSize: 40,
  },
  h4: {
    fontWeight: 600,
    lineHeight: '40px',
    fontSize: 32,
  },
  h5: {
    fontWeight: 600,
    lineHeight: '32px',
    fontSize: 24,
  },
  title1SemiBold: {
    fontWeight: 600,
    lineHeight: '32px',
    fontSize: 20,
  },
  title1Meidum: {
    fontWeight: 500,
    lineHeight: '32px',
    fontSize: 20,
  },
  title2: {
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: 18,
  },
  subtitle1SemiBold: {
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: 16,
  },
  subtitle1Bold: {
    fontWeight: 700,
    lineHeight: '24px',
    fontSize: 16,
  },
  subtitle1Medium: {
    fontWeight: 500,
    lineHeight: '24px',
    fontSize: 16,
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: '24px',
    fontSize: 14,
  },
  caption1: {
    fontWeight: 600,
    lineHeight: '16px',
    fontSize: 13,
  },
  caption1Medium: {
    fontWeight: 500,
    lineHeight: '16px',
    fontSize: 13,
  },
  caption2Bold: {
    fontWeight: 700,
    lineHeight: '16px',
    fontSize: 12,
  },
  caption2Medium: {
    fontWeight: 500,
    lineHeight: '12px',
    fontSize: 12,
  },
  button1: {
    fontWeight: 700,
    lineHeight: '24px',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  button2: {
    fontWeight: 700,
    lineHeight: '24px',
    fontSize: 14,
    textTransform: 'capitalize',
  },
};

export default typography;
