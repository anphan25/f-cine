import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import { FiActivity } from 'react-icons/fi';
import { MdDashboard, MdOutlinePayments } from 'react-icons/md';
import { BiMoviePlay, BiBuildings } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

const ListItemContainer = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, theme }) => ({
  [theme.breakpoints.up('lg')]: {
    borderRadius: 12,
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: active ? theme.palette.primary.light : 'transparent',
    color: active ? theme.palette.primary.main : theme.palette.neutral[700],
    ':hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
  },
}));

export const SidebarList = ({ isCollapse }) => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const linksCustomer = [
    {
      id: 1,
      to: '',
      icon: <MdDashboard fontSize="24" />,
      text: 'Dashboard',
    },
    {
      id: 2,
      to: 'movies/now-showing',
      icon: <BiMoviePlay fontSize="24" />,
      text: 'Movies',
    },
    {
      id: 3,
      to: 'theaters',
      icon: <BiBuildings fontSize="24" />,
      text: 'Theaters',
    },
    {
      id: 4,
      to: 'history',
      icon: <MdOutlinePayments fontSize="24" />,
      text: 'History Payment',
    },
  ];

  return (
    <List disablePadding sx={{ pt: '36px', width: '100%' }}>
      {linksCustomer.map((link) => (
        <ListItemContainer
          component={Link}
          to={link.to}
          key={link.text}
          active={active === link.to ? true : false}
          onClick={() => setActive(link.to)}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
            {link.icon}
          </ListItemIcon>
          <ListItemText
            sx={{ display: !isCollapse ? 'block' : 'none' }}
            primary={
              <Typography whiteSpace="nowrap" variant="subtitle1SemiBold">
                {link.text}
              </Typography>
            }
          />
        </ListItemContainer>
      ))}
    </List>
  );
};
