import { UpcomingCard } from "../index";
import { Stack } from "@mui/material";

const UpcomingCardList = (props) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ marginBottom: "50px" }}
    >
      {props.incomingMovies.map((movie, index) => {
        return <UpcomingCard movie={movie} key={index}></UpcomingCard>;
      })}
    </Stack>
  );
};

export default UpcomingCardList;
