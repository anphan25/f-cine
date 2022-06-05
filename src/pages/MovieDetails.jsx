import React, { useState } from "react";
import { Button, styled, Box, Stack, Typography, Modal } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { PosterCardList } from "../components/index";
import { width } from "@mui/system";

const ImgBox = styled("div")(({ theme }) => ({
  height: "280px",
  width: "40%",
  position: "relative",
  marginTop: "40px",

  "& img": {
    height: "600px",
    width: "400px",
    borderRadius: "20px",
    position: "absolute",
    top: "-330px",
  },
}));

const CoverBox = styled("div")(({ theme }) => ({
  height: "500px",
  width: "100%",
  position: "absolute",
  left: "0",
  backgroundImage:
    "url('https://assets.htv.com.vn/Images/TAP%20CHI%20HTV/HAU%20TRUONG%20TRUYEN%20HINH/DUONG%202/RALPH%202/1%20k%E1%BA%BF%20nhi%E1%BB%87m.jpg')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

const RestrictLabel = styled("div")(({ theme }) => ({
  height: "40px",
  width: "50px",
  textAlign: "center",
  paddingTop: "8px",
  borderRadius: "5px",
  verticalAlign: "middle",
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
}));

const OverlayStyle = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundImage:
    "linear-gradient(to bottom, rgba(255,0,0,0), rgba(31,32,35,0.9))",
  borderRadius: "14px",
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  padding: "20px",
  borderRadius: "18px",
};

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
];

const MovieDetails = () => {
  const [open, setOpen] = useState(false);
  const modalHandler = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <>
      <CoverBox className="cover-img">
        <OverlayStyle></OverlayStyle>
      </CoverBox>

      <Box className="movie-detail" sx={{ marginTop: "500px" }}>
        <Stack className="movie-detail_content" direction="row">
          <ImgBox className="movie-detail_content_poster">
            <img
              src="https://ss-images.saostar.vn/wp700/2018/11/18/4081353/wir2_poster2.jpg"
              alt="poster-movie"
              sx={{}}
            ></img>
          </ImgBox>

          <Box
            className="movie-detail_content_detail_left"
            sx={{ marginTop: "40px", width: "60%" }}
          >
            <Typography variant="h3" sx={{ width: "100% " }}>
              Ralph Breaks The Internet
            </Typography>

            <Stack
              className="movie-detail_icon"
              direction="row"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: "25px" }}
            >
              <RestrictLabel>C18</RestrictLabel>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "6px",
                  fontSize: "20px",
                }}
              >
                <AccessTimeIcon
                  sx={{ color: "neutral.600", marginRight: "6px" }}
                ></AccessTimeIcon>{" "}
                120
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                <CalendarMonthIcon
                  sx={{ color: "neutral.600", marginRight: "5px" }}
                ></CalendarMonthIcon>
                04 May, 2022
              </Typography>
            </Stack>

            <Stack
              className="movie-detail_category"
              direction="row"
              sx={{ marginTop: "25px" }}
            >
              <Button
                size="large"
                variant="outlined"
                sx={{
                  marginRight: "10px",
                  border: "1.5px solid",
                  fontSize: "15px",
                  padding: "10px ",
                }}
              >
                Action
              </Button>
              <Button
                size="large"
                variant="outlined"
                sx={{
                  marginRight: "10px",
                  border: "1px solid",
                  fontSize: "15px",
                  padding: "10px ",
                }}
              >
                Cartoon
              </Button>
            </Stack>

            <Stack
              className="movie-detail_action"
              direction="row"
              sx={{ marginTop: "25px" }}
            >
              <Button
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
                startIcon={<ConfirmationNumberOutlinedIcon />}
              >
                Buy now
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: "50px", fontSize: "20px" }}
                startIcon={<SlideshowIcon />}
                onClick={modalHandler}
              >
                Watch trailer
              </Button>
            </Stack>
          </Box>
        </Stack>
        <Box className="movie-detail_bottom" sx={{ marginTop: "20px" }}>
          <Box sx={{ marginTop: "25px" }}>
            <Typography
              sx={{
                fontSize: "20px",
              }}
            >
              <span className="sub-title" style={{ fontWeight: "bold" }}>
                Director:{" "}
              </span>
              An Phan
            </Typography>
          </Box>

          <Box sx={{ marginTop: "25px" }}>
            <Typography variant="h6"></Typography>
            <Typography
              sx={{
                fontSize: "20px",
              }}
            >
              <span className="sub-title" style={{ fontWeight: "bold" }}>
                Actors/Actresses:{" "}
              </span>
              Tran Duc Bo, Le Bong, Ngoc Trinh, Thuy Lieu, Son Tung, Jack
            </Typography>
          </Box>

          <Box sx={{ marginTop: "25px" }}>
            <Typography variant="h6"></Typography>
            <Typography
              sx={{
                fontSize: "20px",
              }}
            >
              <span className="sub-title" style={{ fontWeight: "bold" }}>
                Description: <br />
              </span>
              Six years after saving the arcade from the Cy-Bugs attack and from
              Turbo's revenge, the story leaves Litwak's video arcade behind,
              venturing into the uncharted, expansive and thrilling world of the
              internet - which may or may not survive Ralph's wrecking.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Recommend movie */}
      <Stack
        sx={{
          marginTop: "30px",
          borderTop: "1.5px solid #E4E4E4",
          paddingTop: "20px",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          Recommended Movies
        </Typography>
        <PosterCardList movieList={movieList}></PosterCardList>
      </Stack>

      {/* Modal */}
      <Modal
        open={open}
        onClose={modalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ borderRadius: "10px" }}
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Ralph Breaks the Internet
          </Typography>
          <Box sx={{ width: "100%", height: "80vh", marginTop: "10px" }}>
            <embed
              style={{ height: "100%", width: "100%" }}
              src="https://www.youtube.com/embed/_BcYBFC6zfY"
            ></embed>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MovieDetails;
