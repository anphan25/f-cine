import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import { logo } from 'assets/images';
import { Link } from 'react-router-dom';

const Logo = ({ logoOnly = false }) => {
  return (
    <>
      {logoOnly ? (
        <Link to="/">
          <Stack sx={{ width: 48, height: 48 }}>
            <img src={logo} alt="logo" />
          </Stack>
        </Link>
      ) : (
        <Link to="/">
          <Stack direction="row" spacing="20px" sx={{ whiteSpace: 'nowrap' }}>
            <Avatar src={logo} />
            <Typography fontSize={24} fontWeight="700">
              F-Cine
            </Typography>
          </Stack>
        </Link>
      )}
    </>
  );
};

export default Logo;
