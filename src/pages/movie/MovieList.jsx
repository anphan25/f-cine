import React, { useState, useEffect } from "react";
import {
  styled,
  Box,
  Pagination,
  Stack,
  Button,
  Card,
  Skeleton,
  Paper,
  Typography,
} from "@mui/material";
import { HeaderBreadcrumbs, PosterCard } from "components";
import {
  getMovieNowShowingList,
  getMovieStopShowingList,
  getAllMovies,
} from "services/MovieService";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SearchBar } from "../../components/header/SearchBar";

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
  const [tab, setTab] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState({
    PageIndex: 1,
    PageSize: 12,
    totalPages: 1,
    SearchKey: "",
  });

  const handleTabChange = (event, value) => {
    setTab(value);
    setPage({ ...page, PageIndex: 1 });
  };

  const searchHandler = (searchValue) => {
    setPage((old) => ({
      ...old,
      SearchKey: searchValue.searchTerm,
      PageIndex: 1,
    }));
  };

  useEffect(() => {
    const getMovies = () => {
      switch (tab) {
        case 1:
          getMovieNowShowingList(page).then((res) => {
            setPage({
              ...page,
              PageIndex: res.movies.page,
              totalPages: res.movies.maxPage,
            });
            setIsLoading(false);
            setMovies(res.movies.results);
          });
          break;
        case 2:
          getMovieStopShowingList(page).then((res) => {
            setPage({
              ...page,
              PageIndex: res.movies.page,
              totalPages: res.movies.maxPage,
            });
            setIsLoading(false);
            setMovies(res.movies.results);
          });
          break;
        case 3:
          getAllMovies(page).then((res) => {
            setPage({
              ...page,
              PageIndex: res.movies.page,
              totalPages: res.movies.maxPage,
            });
            setIsLoading(false);
            setMovies(res.movies.results);
          });
          break;

        default:
          console.log("meo");
      }
    };
    setIsLoading(true);
    getMovies();
  }, [page.PageIndex, tab, page.SearchKey]);

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
          sx={{ width: "150px", marginBottom: "20px", marginLeft: "auto" }}
          variant="contained"
          startIcon={<MdAdd />}
          onClick={() => {
            navigate("add");
          }}
        >
          Add Movie
        </Button>
      </Stack>

      <Stack justifyContent="space-between" direction="row">
        <Tabs
          onChange={handleTabChange}
          value={tab}
          sx={{ marginBottom: "25px" }}
        >
          <Tab label="Now Showing" value={1} />
          <Tab label="Stop Showing" value={2} />
          <Tab label="All" value={3} />
        </Tabs>
        <SearchBar
          placeholder="Enter movie's name..."
          onSubmit={searchHandler}
        />
      </Stack>

      {/* Skeleton Loading */}
      <Stack direction="row" flexWrap="wrap" sx={{ gap: 1.9 }}>
        {isLoading &&
          [...Array(12).keys()].map((e) => (
            <Paper
              key={e}
              elevation={2}
              sx={{ padding: "15px", width: "24%", borderRadius: "10px" }}
            >
              <Stack direction="column">
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ marginBottom: "15px" }}
                />
                <Skeleton variant="text" />
                <Skeleton variant="text" width={230} />
                <Skeleton variant="text" width={230} />
              </Stack>
            </Paper>
          ))}
      </Stack>

      <Box>
        <Stack direction="row" flexWrap="wrap" sx={{ gap: 1.9 }}>
          {movies.length > 0 ? (
            movies?.map((movie) => (
              <PosterCard movie={movie} key={movie.id}></PosterCard>
            ))
          ) : (
            <Typography
              variant="h3"
              sx={{ height: "250px", margin: "0 auto", paddingTop: "100px" }}
            >
              No movies found
            </Typography>
          )}
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
