import { AppBar, styled, Button, Typography } from "@mui/material";
import React from "react";
import { SIDEBAR, NAVBAR } from "../../utils/constants";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Logo } from "../index";
import "./NavBar.css";

const DashboardStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isCollapse",
})(({ isCollapse, theme }) => ({
  boxShadow: "none",
  height: NAVBAR.BASE_HEIGHT,
  width: `calc(100% - ${SIDEBAR.BASE_WIDTH}px)`,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    ...(isCollapse && {
      width: `calc(100% - ${SIDEBAR.COLLAPSE_WIDTH}px)`,
    }),
  },
}));

const HomeStyle = styled(AppBar)(({ theme }) => ({
  color: theme.palette.neutral[900],
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  height: NAVBAR.BASE_HEIGHT,
  width: "100%",
  backgroundColor: theme.palette.neutral[0],
  boxShadow: "0px 4px 20px rgba(102, 102, 102, 0.1)",
  zIndex: theme.zIndex.appBar + 1,
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

const NavItemStyle = styled("div")(({ theme }) => ({
  "& ul": { listStyle: "none", display: "flex" },
  "& ul li": { marginLeft: "20px", marginRight: "20px", cursor: "pointer" },
  // "& .nav-bar_text": { position: "relative" },
  // "& .nav-bar-text::before": {
  //   content: '""',
  //   position: "absolute",
  //   bottom: "0",
  //   left: "0",
  //   right: "0",
  //   height: "2px",
  //   backgroundColor: theme.palette.primary["dark"],
  //   transformOrigin: "bottom right",
  //   transform: "scaleX(0)",
  //   transition: "transform 0.5s ease",
  // },

  // "& .nav-bar-text:hover::before": {
  //   transformOrigin: "bottom left",
  //   transform: "scaleX(1)",
  // },
}));

const NavBar = ({ isCollapse = false }) => {
  const { pathname } = useLocation();

  const isDashboard = pathname === "/dashboard";
  return !isDashboard ? (
    <HomeStyle className="HomeStyle">
      <Logo></Logo>
      <NavItemStyle className="nav-item">
        <ul>
          <li>
            <span className="nav-bar_text">Home</span>
          </li>
          <li>
            <span className="nav-bar_text">Movie</span>
          </li>
          <li>
            <span className="nav-bar_text">Theater</span>
          </li>
        </ul>
      </NavItemStyle>
      <Button variant="contained" sx={{ width: 100, borderRadius: 10 }}>
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
