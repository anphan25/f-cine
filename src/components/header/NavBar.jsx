import { AppBar, styled } from "@mui/material";
import React from "react";
import { SIDEBAR, NAVBAR } from "utils/constants";
import PropTypes from "prop-types";
import { NavBarAccount } from "./NavBarAccount";

const DashboardStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isCollapse",
})(({ isCollapse, theme }) => ({
  padding: "24px 40px",
  boxShadow: "inset 1px 0px 0px #F4F4F4",
  height: NAVBAR.BASE_HEIGHT,
  flexDirection: "row",
  alignItems: "center",

  justifyContent: "flex-end",
  width: `calc(100% - ${SIDEBAR.BASE_WIDTH}px)`,
  zIndex: theme.zIndex.appBar + 1,
  color: theme.palette.neutral[700],
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  backgroundColor: theme.palette.neutral[0],
  [theme.breakpoints.up("lg")]: {
    ...(isCollapse && {
      width: `calc(100% - ${SIDEBAR.COLLAPSE_WIDTH}px)`,
    }),
  },
}));

const NavBar = ({ isCollapse = false }) => {
  return (
    <DashboardStyle isCollapse={isCollapse}>
      {/* <SearchBar /> */}
      <NavBarAccount />
    </DashboardStyle>
  );
};

NavBar.propTypes = {
  isCollapse: PropTypes.bool,
};

export default NavBar;
