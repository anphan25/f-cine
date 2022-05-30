import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";

export const SidebarList = () => {
  return (
    <>
      <Box direction="column" sx={{ marginTop: "15px" }}>
        <List>
          <ListItem sx={{ padding: "0" }}>
            <ListItemButton
              sx={{
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                },
              }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ padding: "0" }}>
            <ListItemButton
              sx={{
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                },
              }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ padding: "0" }}>
            <ListItemButton
              sx={{
                // padding: "0",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                },
              }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};
