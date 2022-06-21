import React, { useState, useRef, useEffect } from "react";
import { styled, Box, Pagination, Stack, Typography } from "@mui/material";
import { PosterCard } from "../components/index";
import { getMovieList } from "../services/MovieService";

const PagingDiv = styled("div")(({ theme }) => ({
  "& .MuiPagination-ul .Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },

  "& .MuiPaginationItem-circular": {
    "&:hover": { backgroundColor: theme.palette.primary.lighter },
  },

  "& .MuiPaginationItem-previousNext": {
    color: theme.palette.primary.dark,
  },
}));

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState({
    PageIndex: 1,
    PageSize: 12,
    totalPages: 1,
  });

  useEffect(() => {
    const getMovies = () => {
      getMovieList(page).then((res) => {
        setPage({
          ...page,
          PageIndex: res.movies.page,
          totalPages: res.movies.total,
        });
        setMovies(res.movies.results);
        console.log(res.movies.results);
      });
    };
    getMovies();
  }, [page.PageIndex]);

  const clickPageHandler = (e, value) => {
    setPage({ ...page, PageIndex: value });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "30px",
          borderBottom: "1px solid #e3e3e3",
          marginBottom: "30px",
          marginTop: "30px",
        }}
      >
        <Typography variant="h3">Movies List</Typography>
      </Box>

      <Box>
        <Stack direction="row" flexWrap="wrap" sx={{ gap: 1.9 }}>
          {movies?.map((movie) => (
            <PosterCard movie={movie} key={movie.id}></PosterCard>
          ))}
        </Stack>
      </Box>

      <Box
        className="paging-section"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "30px 0 40px 0",
        }}
      >
        <Stack spacing={2}>
          <PagingDiv>
            <Pagination
              count={page.totalPages}
              page={page.PageIndex}
              onChange={clickPageHandler}
            />
          </PagingDiv>
        </Stack>
      </Box>
    </>
  );
};

export default MovieList;
