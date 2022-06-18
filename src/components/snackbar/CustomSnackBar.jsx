import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackBar = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenClose = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <>
      <Snackbar
        sx={{ marginTop: "60px" }}
        open={isOpen}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleOpenClose}
        key={"top" + "right"}
      >
        <Alert
          onClose={handleOpenClose}
          severity={props.status ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackBar;
