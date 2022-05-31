import {
  CardContent,
  CardActions,
  Card,
  Typography,
  Button,
  CardMedia,
  styled,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const ImgStyle = styled("div")(({ theme }) => ({
  padding: "18px 18px 0",
}));

const RestrictLabel = styled("div")(({ theme }) => ({
  height: "25px",
  width: "50px",
  textAlign: "center",
  paddingTop: "3.2px",
  borderRadius: "5px",
  verticalAlign: "middle",
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
}));

const RatingDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignContent: "center",
}));

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
        <ImgStyle>
          <CardMedia
            component="img"
            height="180"
            image="https://nocodebuilding.com/wp-content/uploads/2021/07/avengers-endgame.jpg"
            alt="green iguana"
            sx={{ cursor: "pointer", borderRadius: "10px" }}
          />
        </ImgStyle>
        <CardContent sx={{ padding: "18px" }}>
          <Typography
            gutterBottom
            component="div"
            variant="h6"
            sx={{
              lineHeight: "33px",
              fontWeight: "600",
              color: "neutral.800",
              cursor: "pointer",
            }}
          >
            Avengers: End game
          </Typography>

          <CardActions
            sx={{ padding: "0", marginBottom: "5px", marginTop: "10px" }}
          >
            <Button
              size="small"
              variant="outlined"
              sx={{ border: "1px solid" }}
            >
              Sci-fi
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ border: "1px solid" }}
            >
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
              justifyContent: "space-between",
              marginBottom: "8px",
              marginTop: "10px",
            }}
          >
            {/* <RatingDiv>
              <GradeIcon
                sx={{
                  color: 'warning.light',
                  marginBottom: '3px',
                  marginRight: '5px',
                }}
              ></GradeIcon>
              <Typography
                sx={{ fontSize: '12px', paddingTop: '5px', fontWeight: '500' }}
              >
                4.9{' '}
                <Typography
                  sx={{
                    color: 'neutral.600',
                    display: 'inline',
                    fontSize: '12px',
                  }}
                >
                  (129)
                </Typography>
              </Typography>
            </RatingDiv> */}
            <RestrictLabel>C18</RestrictLabel>
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", marginBottom: "6px" }}
          >
            <AccessTimeIcon
              sx={{ color: "neutral.600", marginRight: "6px" }}
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
              sx={{ color: "neutral.600", marginRight: "5px" }}
            ></CalendarMonthIcon>
            Release Date: May 04, 2022
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PosterCard;
