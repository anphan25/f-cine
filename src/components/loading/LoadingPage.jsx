import { alpha, Avatar, Box, styled } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { logo } from "assets/images";

const MainContainer = styled("div")(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const LoadingPage = () => {
  return (
    <MainContainer>
      <Box
        component={motion.div}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: 360 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <Avatar src={logo} alt="logo" sx={{ w: 64, h: 64 }} />
      </Box>

      <Box
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
        sx={{
          p: 2,
          position: "absolute",
          border: (theme) => `solid 3px ${theme.palette.primary.main}`,
          width: 100,
          height: 100,
        }}
      />
      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          ease: "linear",
          duration: 3.2,
          repeat: Infinity,
        }}
        sx={{
          p: 2,
          position: "absolute",
          border: (theme) =>
            `solid 8px ${alpha(theme.palette.primary.main, 0.2)}`,
          width: 120,
          height: 120,
        }}
      />
    </MainContainer>
  );
};

export default LoadingPage;
