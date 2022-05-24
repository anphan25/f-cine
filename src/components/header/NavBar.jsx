import { AppBar, styled } from '@mui/material';
import React from 'react';
import { SIDEBAR, NAVBAR } from '../../utils/constants';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const DashboardStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})(({ isCollapse, theme }) => ({
  boxShadow: 'none',
  height: NAVBAR.BASE_HEIGHT,
  width: `calc(100% - ${SIDEBAR.BASE_WIDTH}px)`,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    ...(isCollapse && {
      width: `calc(100% - ${SIDEBAR.COLLAPSE_WIDTH}px)`,
    }),
  },
}));

const HomeStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  height: NAVBAR.BASE_HEIGHT,
  width: '100%',
  zIndex: theme.zIndex.appBar + 1,
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}));

const NavBar = ({ isCollapse = false }) => {
  const { pathname } = useLocation();

  const isDashboard = pathname === '/dashboard';
  return !isDashboard ? (
    <HomeStyle>NavBar</HomeStyle>
  ) : (
    <DashboardStyle isCollapse={isCollapse}>NavBar</DashboardStyle>
  );
};

NavBar.propTypes = {
  isCollapse: PropTypes.bool,
};

export default NavBar;
