import React, { useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { SideBar, NavBar } from 'components';
import { SIDEBAR, NAVBAR } from 'utils/constants';
import useCollapseDrawer from 'hooks/useCollapseDrawer';

const RootStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('lg')]: {
    marginLeft: SIDEBAR.BASE_WIDTH,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: SIDEBAR.COLLAPSE_WIDTH,
    }),
  },
}));

const MainStyle = styled('main')(({ theme }) => ({
  marginTop: NAVBAR.BASE_HEIGHT,
  backgroundColor: theme.palette.neutral[200],
}));

export const DashboardLayout = () => {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <SideBar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <RootStyle collapseClick={collapseClick}>
        <NavBar />
        <MainStyle>
          <Outlet />
          <Typography variant="caption" component="p">
            © 2020 - All rights reserved
            <br /> made by &nbsp;
            <Link to="/">F-Cine</Link>
          </Typography>
        </MainStyle>
      </RootStyle>
    </Box>
  );
};
