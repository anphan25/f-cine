import { Typography, styled, Box, Dialog } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Slider, PosterCardList, UpcomingCardList } from "../components/index";
import axios from "axios";

const TextHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px 10px",
  borderBottom: `1px solid ${theme.palette.neutral[300]}`,
  margin: "60px 0 20px",
}));

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [posters, setPosters] = useState([]);
  const [incomingMovies, setIncomingMovies] = useState([]);

  const getMovieListForHomePage = async () => {
    const res = await axios.get(
      "https://www.fcinema.tk/api/movie/get-movies-for-homepage"
    );

    let moviesList = res.data.movieList.slice(0, 4);

    setMovies(moviesList);
    setPosters(res.data.movieList);
  };

  const getIncomingMovieListForHomePage = async () => {
    const res = await axios.get(
      "https://www.fcinema.tk/api/movie/get-incoming-movies-for-homepage"
    );

    setIncomingMovies(res.data.losslessMovieList);
  };

  useEffect(() => {
    getMovieListForHomePage();
    getIncomingMovieListForHomePage();
  }, []);

  return (
    <>
      {/* <Slider moviePosterList={posters}></Slider> */}
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

        <PosterCardList movieList={movies}></PosterCardList>

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

        <UpcomingCardList incomingMovies={incomingMovies}></UpcomingCardList>
      </Box>
    </>
  );
};

export default Home;
