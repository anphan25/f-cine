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
        <Typography align="left" variant="h4" color="#2E2E30">
          Now showing
        </Typography>
        <Typography
          align="right"
          fontWeight="600"
          color="#6346FA"
          sx={{ cursor: "pointer" }}
        >
          View all
        </Typography>
      </TextHeader>

      <PosterCardList></PosterCardList>

      <TextHeader>
        <Typography align="left" variant="h4" color="#2E2E30">
          Upcoming soon
        </Typography>
        <Typography
          align="right"
          fontWeight="600"
          color="#6346FA"
          sx={{ cursor: "pointer" }}
        >
          View all
        </Typography>
      </TextHeader>

      <UpcomingCardList></UpcomingCardList>
    </>
  );
};

export default Home;
