import React, { useState } from "react";
import {
  Button,
  styled,
  Box,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Slide,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { PosterCard, PosterCardList } from "../components/index";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MovieList = () => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("now");

  const movieList = [
    {
      movieId: 4905,
      title: "The Strait Guys",
      categories: [
        {
          cateId: 99,
          cateName: "Documentary",
        },
      ],
      ageRestrict: 0,
      duration: 0,
      releaseDate: "Jun 02,2022",
      coverImgURL:
        "https://image.tmdb.org/t/p/w500/w0Uk5XV7tkPR4SZOizLd0FoyffM.jpg",
      posterImgURL:
        "https://image.tmdb.org/t/p/w500/27k9m3swHIl3DcEP1gjem2gN9ib.jpg",
    },
    {
      movieId: 4905,
      title: "The Strait Guys",
      categories: [
        {
          cateId: 99,
          cateName: "Documentary",
        },
      ],
      ageRestrict: 0,
      duration: 0,
      releaseDate: "Jun 02,2022",
      coverImgURL:
        "https://image.tmdb.org/t/p/w500/w0Uk5XV7tkPR4SZOizLd0FoyffM.jpg",
      posterImgURL:
        "https://image.tmdb.org/t/p/w500/27k9m3swHIl3DcEP1gjem2gN9ib.jpg",
    },
    {
      movieId: 4905,
      title: "The Strait Guys",
      categories: [
        {
          cateId: 99,
          cateName: "Documentary",
        },
      ],
      ageRestrict: 0,
      duration: 0,
      releaseDate: "Jun 02,2022",
      coverImgURL:
        "https://image.tmdb.org/t/p/w500/w0Uk5XV7tkPR4SZOizLd0FoyffM.jpg",
      posterImgURL:
        "https://image.tmdb.org/t/p/w500/27k9m3swHIl3DcEP1gjem2gN9ib.jpg",
    },
    {
      movieId: 4905,
      title: "The Strait Guys",
      categories: [
        {
          cateId: 99,
          cateName: "Documentary",
        },
      ],
      ageRestrict: 0,
      duration: 0,
      releaseDate: "Jun 02,2022",
      coverImgURL:
        "https://image.tmdb.org/t/p/w500/w0Uk5XV7tkPR4SZOizLd0FoyffM.jpg",
      posterImgURL:
        "https://image.tmdb.org/t/p/w500/27k9m3swHIl3DcEP1gjem2gN9ib.jpg",
    },
    {
      movieId: 4905,
      title: "The Strait Guys",
      categories: [
        {
          cateId: 99,
          cateName: "Documentary",
        },
      ],
      ageRestrict: 0,
      duration: 0,
      releaseDate: "Jun 02,2022",
      coverImgURL:
        "https://image.tmdb.org/t/p/w500/w0Uk5XV7tkPR4SZOizLd0FoyffM.jpg",
      posterImgURL:
        "https://image.tmdb.org/t/p/w500/27k9m3swHIl3DcEP1gjem2gN9ib.jpg",
    },
    {
      movieId: 4905,
      title: "The Strait Guys",
      categories: [
        {
          cateId: 99,
          cateName: "Documentary",
        },
      ],
      ageRestrict: 0,
      duration: 0,
      releaseDate: "Jun 02,2022",
      coverImgURL:
        "https://image.tmdb.org/t/p/w500/w0Uk5XV7tkPR4SZOizLd0FoyffM.jpg",
      posterImgURL:
        "https://image.tmdb.org/t/p/w500/27k9m3swHIl3DcEP1gjem2gN9ib.jpg",
    },
    {
      movieId: 4905,
      title: "The Strait Guys",
      categories: [
        {
          cateId: 99,
          cateName: "Documentary",
        },
      ],
      ageRestrict: 0,
      duration: 0,
      releaseDate: "Jun 02,2022",
      coverImgURL:
        "https://image.tmdb.org/t/p/w500/w0Uk5XV7tkPR4SZOizLd0FoyffM.jpg",
      posterImgURL:
        "https://image.tmdb.org/t/p/w500/27k9m3swHIl3DcEP1gjem2gN9ib.jpg",
    },
  ];

  const clickFilterIcon = () => {
    setIsOpen(true);
  };

  const clickPageHandler = (e, value) => {
    setPage(value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleButtonChange = (e, anotherType) => {
    setType(anotherType);
  };

  const applyFilter = () => {};
  const closeDialog = () => {};
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
        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleButtonChange}
          sx={{ backgroundColor: "#FBFBFB" }}
        >
          <ToggleButton
            value="now"
            variant="contained"
            sx={{
              borderRadius: "10px",
              marginRight: "10px",
              // backgroundColor: "primary.main",
              // color: "neutral.0",
            }}
          >
            Now Showing
          </ToggleButton>
          <ToggleButton
            value="upcoming"
            variant="contained"
            sx={{
              borderRadius: "10px",
            }}
            // className="btn btn-"
          >
            Upcoming Soon
          </ToggleButton>
        </ToggleButtonGroup>

        {/* <FilterAltOutlinedIcon
          onClick={clickFilterIcon}
          sx={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            padding: "2px",
            border: "1.75px solid",
            color: "neutral.700",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "neutral.0",
              border: "2px solid #6346FA",
              transition: "0.3s",
            },
          }}
        /> */}
      </Box>

      <Box>
        <PosterCardList movieList={movieList}></PosterCardList>
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
            <Pagination count={10} page={page} onChange={clickPageHandler} />
          </PagingDiv>
        </Stack>
      </Box>

      {/* Filter Dialog */}
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button onClick={applyFilter}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieList;
