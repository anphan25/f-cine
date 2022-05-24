import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import { logo } from 'assets/images';

const Logo = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={logo} />
      <Typography fontSize={24} fontWeight="700">
        F-Cine
      </Typography>
    </Stack>
  );
};

export default Logo;
