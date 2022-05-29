import React from "react";
import { styled } from "@mui/material";

const BackGroundStyle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background[0],
}));

const Background = (props) => {
  return (
    <>
      <BackGroundStyle>{props.children}</BackGroundStyle>
    </>
  );
};

export default Background;
