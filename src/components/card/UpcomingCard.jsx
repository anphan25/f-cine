import { Card, CardMedia } from "@mui/material";

const UpcomingCard = (props) => {
  return (
    <Card
      movie-id={props.movieId}
      sx={{
        maxWidth: 345,
        borderRadius: "10px",
        border: "1px solid #e3e3e3",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        height="500px"
        image={props.movie.posterImgURL}
        alt="green iguana"
      />
    </Card>
  );
};

export default UpcomingCard;
