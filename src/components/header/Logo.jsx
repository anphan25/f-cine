import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import { logo } from 'assets/images';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <Stack direction="row" spacing={2}>
        <Avatar src={logo} />
        <Typography fontSize={24} fontWeight="700">
          F-Cine
        </Typography>
      </Stack>
    </Link>
  );
};

export default Logo;
