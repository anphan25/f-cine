import React, { useState, useEffect } from "react";
import { styled, Box, Pagination, Stack, Button } from "@mui/material";
import { HeaderBreadcrumbs, PosterCard } from "components";
import { getMovieList } from "services/MovieService";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <HeaderBreadcrumbs
          heading="Movie List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Movie List" }]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={() => {
            navigate("add");
          }}
        >
          Add Movie
        </Button>
      </Stack>

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
