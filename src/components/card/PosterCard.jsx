import {
  CardContent,
  Card,
  Typography,
  CardMedia,
  styled,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { CategoryTag } from "components/tag/CategoryTag";

const ImgStyle = styled("div")(({ theme }) => ({
  padding: "15px 15px 0",
}));

const RestrictLabel = styled("div")(({ theme }) => ({
  height: "25px",
  width: "50px",
  textAlign: "center",
  paddingTop: "3.2px",
  borderRadius: "5px",
  verticalAlign: "middle",
  fontWeight: "600",
  color: theme.palette.error.main,
}));

const restrictedStyle = {
  backgroundColor: "#FFBC99",
  color: "#FFFFFF",
};

const noRestrictStyle = {
  backgroundColor: "#AAF27F",
  color: "#FFFFFF",
};

const CardActions = styled("div")(({ theme }) => ({
  padding: "0",
  marginBottom: "5px",
  // marginTop: "auto",
  flexWrap: "wrap",
  // "& Button": { marginLeft: "0px" },
}));

const RatingDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignContent: "center",
}));

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

const PosterCard = (props) => {
  const [movie, setMovie] = useState(props.movie);

  return (
    <Card
      key={movie.id}
      sx={{
        maxWidth: 345,
        borderRadius: "10px",
        border: "1px solid #e3e3e3",
        width: "24%",
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
      }}
    >
      <ImgStyle>
        <Link to={`/movies/${movie.id}`}>
          <CardMedia
            component="img"
            height="180"
            image={
              movie.posterImageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBCGH3ttKv97u7GnSxpSM4_ijDWF7yPb7GKmva3LU4_ZDJ-X2Jnfw2DVcwgsqmdome8Uo&usqp=CAU"
            }
            alt="No image found"
            sx={{ cursor: "pointer", borderRadius: "10px" }}
          />
        </Link>
      </ImgStyle>
      <CardContent
        sx={{
          padding: "15px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          className="card-top"
          sx={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <Link to={`/movies/${movie.id}`}>
            <Typography
              gutterBottom
              component="div"
              variant="h6"
              sx={{
                fontWeight: "600",
                color: "neutral.800",
                cursor: "pointer",
                margin: "0px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {movie.title}
            </Typography>
          </Link>

          <CardActions>
            {movie.categories?.slice(0, 3).map((cate) => {
              return <CategoryTag cate={cate} />;
            })}
          </CardActions>
        </Box>

        <Box className="card-bottom" sx={{ marginTop: "auto", flexShrink: 0 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
              marginTop: "10px",
            }}
          >
            <RestrictLabel
              sx={movie.restrictedAge === 0 ? noRestrictStyle : restrictedStyle}
            >
              {renderAgeRestricted(movie.restrictedAge)}
            </RestrictLabel>
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <AccessTimeIcon
              sx={{ color: "neutral.600", marginRight: "6px" }}
            ></AccessTimeIcon>
            Running times: {movie.duration} min
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CalendarMonthIcon
              sx={{ color: "neutral.600", marginRight: "5px" }}
            ></CalendarMonthIcon>
            Release Date: {moment(movie.releaseDate).format("DD/MM/yyyy")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PosterCard;
