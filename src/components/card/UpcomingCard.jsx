import {
  CardContent,
  CardActions,
  Card,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const UpcomingCard = () => {
  return (
    <>
      <Card
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
          image="https://i.rada.vn/data/image/2022/05/05/doctor-strange-2-poster.jpg"
          alt="green iguana"
        />
      </Card>
    </>
  );
};

export default UpcomingCard;
