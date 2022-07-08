import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import {
  Button,
  styled,
  Box,
  Stack,
  Typography,
  Modal,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import {
  getMovieDetail,
  deleteMovie,
  restoreMovie,
} from "../../services/MovieService";
import moment from "moment";
import { NAVBAR } from "utils/constants";
import { imageNotAvailable } from "assets/images";
import { CategoryTag } from "components/tag/CategoryTag";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { CustomDialog, CustomSnackBar } from "../../components";

const ImgBox = styled("div")(({ theme }) => ({
  height: "280px",
  width: "38%",
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
  top: `${NAVBAR.BASE_HEIGHT}px`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const RestrictLabel = styled("div")(({ theme }) => ({
  height: "40px",
  width: "50px",
  textAlign: "center",
  paddingTop: "8px",
  marginRight: "15px",
  borderRadius: "5px",
  verticalAlign: "middle",
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
  "& .restrict": {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
  },

  "& .noRestrict": {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.main,
  },
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

const restrictedStyle = {
  backgroundColor: "#FFBC99",
  color: "#FF4842",
};

const noRestrictStyle = {
  backgroundColor: "#AAF27F",
  color: "#54D62C",
};

const MovieDetails = () => {
  let { id } = useParams();
  const [open, setOpen] = useState(false);
  const modalHandler = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const [detail, setDetail] = useState({});
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmRestoreOpen, setIsConfirmRestoreOpen] = useState(false);

  const convertToEmbedUrl = (url) => {
    return url?.replace("watch?v=", "embed/");
  };

  const handleConfirmDeleteOpen = () => {
    isConfirmDeleteOpen
      ? setIsConfirmDeleteOpen(false)
      : setIsConfirmDeleteOpen(true);
  };

  const handleConfirmRestoreOpen = () => {
    isConfirmRestoreOpen
      ? setIsConfirmRestoreOpen(false)
      : setIsConfirmRestoreOpen(true);
  };

  const handleDeleteMovie = async () => {
    const res = await deleteMovie(id);
    if (res.message === "Success") {
      setAlert({
        message:
          "Delete movie successfully !!! (Data will update in 5 minutes)",
        status: true,
        type: "success",
      });

      handleConfirmDeleteOpen();
    }
  };

  const handleRestoreMovie = async () => {
    const res = await restoreMovie(id);

    if (res.message === "Success") {
      setAlert({
        message:
          "Restore movie successfully !!! (Data will update in 5 minutes)",
        status: true,
        type: "success",
      });

      handleConfirmRestoreOpen();
    }
  };

  const renderAgeRestricted = (param) => {
    switch (param) {
      case 0:
        return "P";

      case 13:
        return "C13";
      case 16:
        return "C16";

      case 18:
        return "C18";
    }
  };

  const deleteConfirmContent = () => {
    return (
      <Stack flex={1}>
        <DialogContent>
          Are you sure to delete{" "}
          <span style={{ fontWeight: "600" }}>{detail.title}</span> ?
        </DialogContent>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={handleConfirmDeleteOpen}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "error.main",
              "&:hover": { backgroundColor: "error.dark" },
            }}
            type="submit"
            variant="contained"
            autoFocus
            onClick={handleDeleteMovie}
          >
            Delete
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  const restoreConfirmContent = () => {
    return (
      <Stack flex={1}>
        <DialogContent>
          Are you sure to restore{" "}
          <span style={{ fontWeight: "600" }}>{detail.title}</span> ?
        </DialogContent>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={handleConfirmRestoreOpen}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "success.main",
              "&:hover": { backgroundColor: "success.dark" },
            }}
            type="submit"
            variant="contained"
            autoFocus
            onClick={handleRestoreMovie}
          >
            Restore
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  const getMovieDetails = async () => {
    const res = await getMovieDetail(id);
    setDetail(res.result);
  };

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  return (
    <>
      <CoverBox
        className="cover-img"
        sx={{
          backgroundImage: `url(${
            detail?.coverImageUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBCGH3ttKv97u7GnSxpSM4_ijDWF7yPb7GKmva3LU4_ZDJ-X2Jnfw2DVcwgsqmdome8Uo&usqp=CAU"
          })`,
        }}
      >
        <OverlayStyle></OverlayStyle>
      </CoverBox>

      <Box className="movie-detail" sx={{ marginTop: "500px" }}>
        <Stack className="movie-detail_content" direction="row">
          <ImgBox className="movie-detail_content_poster">
            <img
              src={
                detail?.posterImageUrl
                  ? detail?.posterImageUrl
                  : imageNotAvailable
              }
              alt="poster-movie"
            ></img>
          </ImgBox>

          <Box
            className="movie-detail_content_detail_left"
            sx={{ width: "60%" }}
          >
            <Typography variant="h3" sx={{ width: "100% " }}>
              {detail.title}
            </Typography>

            <Stack
              className="movie-detail_icon"
              direction="row"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: "25px" }}
            >
              <RestrictLabel
                sx={
                  detail.restrictedAge === 0 ? noRestrictStyle : restrictedStyle
                }
              >
                {renderAgeRestricted(detail.restrictedAge)}
              </RestrictLabel>

              <Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                  }}
                >
                  Running Time
                </Typography>

                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon
                    sx={{ color: "neutral.600", marginRight: "6px" }}
                  ></AccessTimeIcon>
                  {detail.duration} minutes
                </Typography>
              </Stack>

              <Stack>
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
                  Release Date
                </Typography>

                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarMonthIcon
                    sx={{ color: "neutral.600", marginRight: "5px" }}
                  ></CalendarMonthIcon>
                  {moment(detail.releaseDate).format("DD/MM/yyyy")}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              className="movie-detail_category"
              direction="row"
              sx={{ marginTop: "25px" }}
            >
              {detail?.categories?.map((cate) => {
                return <CategoryTag cate={cate} key={cate.id} />;
              })}
            </Stack>

            <Stack
              className="movie-detail_action"
              direction="row"
              spacing={2}
              sx={{ marginTop: "25px" }}
            >
              <Button
                variant="contained"
                sx={{ fontSize: "20px" }}
                startIcon={<SlideshowIcon />}
                onClick={modalHandler}
              >
                Watch trailer
              </Button>

              {detail.isAvailable ? (
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "20px",
                    backgroundColor: "error.main",
                    "&:hover": { backgroundColor: "error.dark" },
                  }}
                  startIcon={<DeleteIcon />}
                  onClick={handleConfirmDeleteOpen}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "20px",
                    backgroundColor: "success.main",
                    "&:hover": { backgroundColor: "success.dark" },
                  }}
                  startIcon={<RestoreFromTrashIcon />}
                  onClick={handleConfirmRestoreOpen}
                >
                  Restore
                </Button>
              )}
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
              {detail.director}
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
              {/* {detail.actors?.join(", ")} */}
              {/* {JSON.parse(detail?.actors)} */}
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
              {parse(`${detail?.description}`) ||
                "This movie does not have description"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Confirm Delete Dialog */}
      <CustomDialog
        open={isConfirmDeleteOpen}
        onClose={handleConfirmDeleteOpen}
        title="Delete Movie Confirmation"
        children={deleteConfirmContent()}
        sx={{ "& .MuiDialog-paper": { width: "500px", height: "300px" } }}
      />

      {/* Confirm Restore Dialog */}
      <CustomDialog
        open={isConfirmRestoreOpen}
        onClose={handleConfirmRestoreOpen}
        title="Delete Movie Confirmation"
        children={restoreConfirmContent()}
        sx={{ "& .MuiDialog-paper": { width: "500px", height: "300px" } }}
      />

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
            {detail.title}
          </Typography>
          <Box sx={{ width: "100%", height: "80vh", marginTop: "10px" }}>
            <embed
              style={{ height: "100%", width: "100%" }}
              src={convertToEmbedUrl(detail?.trailerUrl)}
            ></embed>
          </Box>
        </Box>
      </Modal>

      {/* Alert message */}
      {alert?.status && (
        <CustomSnackBar
          message={alert.message}
          status={alert.status}
          type={alert.type}
        />
      )}
    </>
  );
};

export default MovieDetails;
