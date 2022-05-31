import { Typography, styled, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Slider, PosterCardList, UpcomingCardList } from "../components/index";
import axios from "axios";

const TextHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px 10px",
  borderBottom: `1px solid ${theme.palette.neutral[300]}`,
  margin: "80px 0 20px",
}));

const Home = () => {
  return (
    <>
      <Slider></Slider>
      <Box sx={{ mt: "700px" }}>
        <TextHeader>
          <Typography align="left" variant="h4" color=" .800">
            Now Showing
          </Typography>
          <Typography
            align="right"
            fontWeight="600"
            color="primary.main"
            sx={{ cursor: "pointer" }}
          >
            View All
          </Typography>
        </TextHeader>

        <PosterCardList></PosterCardList>

        <TextHeader>
          <Typography align="left" variant="h4" color="neutral.800">
            Upcoming Soon
          </Typography>
          <Typography
            align="right"
            fontWeight="600"
            color="primary.main"
            sx={{ cursor: "pointer" }}
          >
            View All
          </Typography>
        </TextHeader>

        <UpcomingCardList></UpcomingCardList>
      </Box>
    </>
  );
};

export default Home;
