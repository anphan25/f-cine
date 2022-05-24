import { AppBar, styled } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { SIDEBAR } from 'utils/constants';

const RootStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})(({ isCollapse, theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: SIDEBAR.BASE_WIDTH,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    ...(isCollapse && {
      width: SIDEBAR.COLLAPSE_WIDTH,
    }),
  },
}));

const SideBar = () => {
  const isDesktop = useResponsive('up', 'lg');

  return <RootStyle>SideBar</RootStyle>;
};

export default SideBar;
