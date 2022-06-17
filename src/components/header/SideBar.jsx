import { IconButton, Stack, styled } from "@mui/material";
import React from "react";
import { SIDEBAR } from "utils/constants";
import Logo from "./Logo";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import { SidebarList } from "./SidebarList";

const RootStyle = styled("div", {
  shouldForwardProp: (prop) => prop !== "isCollapse",
})(({ isCollapse, theme }) => ({
  position: "fixed",
  borderRight: "1px solid #E4E4E4",
  left: 0,
  top: 0,
  bottom: 0,
  width: isCollapse ? SIDEBAR.COLLAPSE_WIDTH : SIDEBAR.BASE_WIDTH,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  backgroundColor: theme.palette.neutral[0],
}));

const SideBar = () => {
  const {
    collapseClick,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
    isCollapse,
  } = useCollapseDrawer();

  return (
    <RootStyle
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      isCollapse={isCollapse}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "48px", width: "100%" }}
      >
        <Logo logoOnly={true} />

        <IconButton
          onClick={() => {
            onToggleCollapse();
          }}
          sx={{
            display: !isCollapse ? "flex" : "none",
            height: 48,
            width: 48,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!collapseClick ? (
            <MdOutlineKeyboardArrowLeft />
          ) : (
            <MdOutlineKeyboardArrowRight />
          )}
        </IconButton>
      </Stack>
      <SidebarList isCollapse={isCollapse} />
    </RootStyle>
  );
};

export default SideBar;
