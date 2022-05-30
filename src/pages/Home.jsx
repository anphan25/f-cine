import { Typography, styled } from "@mui/material";
import React from "react";
import { Slider, PosterCardList, UpcomingCardList } from "../components/index";

const TextHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px 10px",
  borderBottom: `1px solid ${theme.palette.neutral[300]}`,
  margin: "50px 0 20px",
}));

const Home = () => {
  return (
    <>
      <Slider></Slider>
      <TextHeader>
        <Typography align="left" variant="h4" color="neutral.800">
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
    </>
  );
};

export default Home;
