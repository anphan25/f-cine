import { PosterCard } from "../index";
import { styled, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

const PosterCardList = (props) => {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   setMovies(props.movieList);
  // }, [props.movieList]);
  console.log(props.movieList);

  return (
    <Stack direction="row" flexWrap="wrap" sx={{ gap: 1.9 }}>
      {props?.movieList?.map((movie, index) => {
        return <PosterCard movie={movie} key={index}></PosterCard>;
      })}
    </Stack>
  );
};

export default PosterCardList;
