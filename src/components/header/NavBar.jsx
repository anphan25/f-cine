import { AppBar, styled, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { SIDEBAR, NAVBAR } from '../../utils/constants';
import PropTypes from 'prop-types';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Logo } from 'components';

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
  color: theme.palette.neutral[900],
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: NAVBAR.BASE_HEIGHT,
  width: '100%',
  backgroundColor: theme.palette.neutral[0],
  boxShadow: '0px 4px 20px rgba(102, 102, 102, 0.1)',
  zIndex: theme.zIndex.appBar + 1,
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}));

const LinkStyle = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  position: 'relative',
  color: active ? theme.palette.primary.main : theme.palette.neutral[800],
  fontWeight: 500,

  '::before': {
    position: 'absolute',
    content: '""',
    ...(active
      ? { transformOrigin: 'bottom left', transform: 'scaleX(1)' }
      : { transformOrigin: 'bottom right', transform: 'scaleX(0)' }),
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: theme.palette.primary.main,

    transition: 'transform 0.3s ease',
  },

  ':hover': {
    color: theme.palette.primary.main,
    '::before': {
      transformOrigin: 'bottom left',
      transform: 'scaleX(1)',
    },
  },
}));

const links = [
  { id: 1, name: 'Home', to: '/' },
  { id: 2, name: 'Movies', to: '/movies/now-showing' },
  { id: 3, name: 'Theaters', to: '/theaters' },
];

const NavBar = ({ isCollapse = false }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname);
  const navigate = useNavigate();

  const isDashboard = pathname === '/dashboard';

  return !isDashboard ? (
    <HomeStyle>
      <Logo></Logo>
      <Stack direction="row" spacing={5}>
        {links.map((link) => (
          <LinkStyle
            active={active === link.to ? true : false}
            onClick={() => setActive(link.to)}
            key={link.id}
            to={link.to}
          >
            {link.name}
          </LinkStyle>
        ))}
      </Stack>
      <Button
        onClick={() => navigate('login')}
        variant="contained"
        sx={{
          borderRadius: '50px',
          p: '8px 26px',
        }}
      >
        Sign In
      </Button>
    </HomeStyle>
  ) : (
    <DashboardStyle isCollapse={isCollapse}>NavBar</DashboardStyle>
  );
};

NavBar.propTypes = {
  isCollapse: PropTypes.bool,
};

export default NavBar;
