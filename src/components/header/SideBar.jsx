import { IconButton, Stack, styled } from '@mui/material';
import React from 'react';
import { SIDEBAR } from 'utils/constants';
import Logo from './Logo';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import useCollapseDrawer from 'hooks/useCollapseDrawer';
import { SidebarList } from './SidebarList';

const RootStyle = styled('div')(({ isCollapse, theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: SIDEBAR.BASE_WIDTH,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    ...(isCollapse
      ? {
          width: SIDEBAR.COLLAPSE_WIDTH,
        }
      : { width: SIDEBAR.BASE_WIDTH }),
  },
}));

const SideBar = () => {
  const { collapseClick, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  return (
    <RootStyle onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Logo />

        <IconButton
          onClick={() => {
            onToggleCollapse();
          }}
        >
          {!collapseClick ? (
            <MdOutlineKeyboardArrowLeft />
          ) : (
            <MdOutlineKeyboardArrowRight />
          )}
        </IconButton>
      </Stack>
      <SidebarList />
    </RootStyle>
  );
};

export default SideBar;
