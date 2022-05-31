import { UpcomingCard } from "../index";
import { Stack } from "@mui/material";

const UpcomingCardList = () => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ marginBottom: "50px" }}
      >
        <UpcomingCard></UpcomingCard>
        <UpcomingCard></UpcomingCard>
        <UpcomingCard></UpcomingCard>
      </Stack>
    </>
  );
};

export default UpcomingCardList;
