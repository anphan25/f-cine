import {
  CardContent,
  CardActions,
  Card,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

import GradeIcon from "@mui/icons-material/Grade";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const PosterCard = () => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: "10px",
          border: "1px solid #e3e3e3",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image="https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg"
          alt="green iguana"
          sx={{ cursor: "pointer" }}
        />
        <CardContent sx={{ padding: "18px" }}>
          <Typography
            gutterBottom
            component="div"
            variant="h6"
            sx={{
              lineHeight: "33px",
              fontWeight: "600",
              color: "#3B3E44",
              cursor: "pointer",
            }}
          >
            Avengers: End game
          </Typography>

          <CardActions
            sx={{ padding: "0", marginBottom: "5px", marginTop: "10px" }}
          >
            <Button size="small" variant="contained">
              Sci-fi
            </Button>
            <Button size="small" variant="contained">
              Action
            </Button>
          </CardActions>

          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              marginTop: "10px",
            }}
          >
            <GradeIcon
              sx={{ color: "#FFD166", marginBottom: "3px", marginRight: "5px" }}
            ></GradeIcon>
            4.9 (129)
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
          >
            <AccessTimeIcon
              sx={{ color: "#84878B", marginRight: "5px" }}
            ></AccessTimeIcon>
            Running times: 120 minutes
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CalendarMonthIcon
              sx={{ color: "#84878B", marginRight: "5px" }}
            ></CalendarMonthIcon>
            Release Date: May 04, 2022
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PosterCard;
