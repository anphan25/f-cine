import { alpha } from '@mui/material/styles';

const PRIMARY = {
  lighter: '#ECEAFE',
  light: '#CABDFF',
  main: '#8E59FF',
  dark: '#623CE7',
  darker: alpha('#ECEAFE', 0.08),
};
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#B1E5FC',
  main: '#2A85FF',
  dark: '#1939B7',
  darker: '#091A7A',
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: alpha('#FFE7D9', 0.08),
};

const GREY = {
  0: '#FFFFFF',
  100: '#FCFCFC',
  200: '#F4F4F4',
  300: '#EFEFEF',
  400: '#6F767E',
  500: '#33383F',
  600: '#272B30',
  700: '#1A1D1F',
  800: '#111315',
  900: '#000000',
  400_40: alpha('#6F767E', 0.4),
  400_75: '#9A9FA5',
  800_50: alpha('#111315', 0.5),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COMMON = {
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  chart: CHART_COLORS,
};

const palette = {
  ...COMMON,
  text: {
    primary: GREY[700],
    disabled: GREY[400_75],
  },
  background: {
    // primary: GREY[200],
    // primaryColor: PRIMARY.lighter,
    // default: GREY[100],
    // neutral: GREY[0],
    // popover: GREY[0],
    // body: GREY[200],
  },
  border: { primary: GREY[300] },
};

export default palette;
