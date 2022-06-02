import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const userInfo = useSelector((state) => state.auth.auth?.user);
  return (
    <>
      {userInfo.Role === 'Customer' && <Box>{userInfo.Name}</Box>}
      {userInfo.Role === 'Admin' && <Box>{userInfo.Role}</Box>}
      {userInfo.Role === 'Manager' && <Box>{userInfo.Role}</Box>}
    </>
  );
};

export default Dashboard;
