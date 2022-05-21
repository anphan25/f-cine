import { alpha } from '@mui/material';
import palette from './palette';

const createShadow = () => {
  return {
    ...Array(25).fill('none'),
    s1: `inset 0px -2px 1px ${alpha(
      palette.grey[900],
      0.4
    )}, inset 0px 1px 1px ${alpha(palette.grey[0], 0.11)}`,

    s2: `inset 1px 0px 0px ${palette.grey[800]}, inset 0 -1px 0px ${palette.grey[800]}`,
    // button: `0px 4px 8px -4px ${alpha(
    //   palette.dark.common.black,
    //   0.25
    // )}, inset 0px -1px 1px ${alpha(
    //   palette.dark.common.black,
    //   0.04
    // )}, inset 0px 2px 0px ${alpha(palette.dark.common.white, 0.25)}`,
  };
};

const shadows = {
  shadow: createShadow(),
};

export default shadows;
