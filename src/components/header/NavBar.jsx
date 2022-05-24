import { AppBar, styled } from '@mui/material';
import React from 'react';
import { SIDEBAR, NAVBAR } from '../../utils/constants';
import PropTypes from 'prop-types';

const RootStyle = styled(AppBar, {
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

const NavBar = ({ onOpenSidebar, isCollapse = false }) => {
  return <RootStyle>NavBar</RootStyle>;
};

NavBar.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default NavBar;
