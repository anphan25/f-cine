import { Dialog, DialogTitle, Divider } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CustomDialog = ({
  open = false,
  onClose,
  children,
  title,
  sx,
  ...other
}) => {
  return (
    <Dialog
      sx={sx}
      {...other}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <Divider sx={{ mt: "20px" }} />
      {children}
    </Dialog>
  );
};

CustomDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  sx: PropTypes.object,
  title: PropTypes.string,
};

export default CustomDialog;
