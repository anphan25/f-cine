import { PosterCard } from "../index";
import { styled, Stack } from "@mui/material";
import React, { useState } from "react";

const PosterCardList = (props) => {
  return (
    <Stack
      direction="row"
      // justifyContent="space-between"
      flexWrap="wrap"
      sx={{ gap: 1.9 }}
    >
      {props.movieList.map((movie, index) => {
        return (
          <PosterCard
            movie={movie}
            key={index}
            // sx={{ width: "24%" }}
          ></PosterCard>
        );
      })}
    </Stack>
  );
};

export default PosterCardList;
