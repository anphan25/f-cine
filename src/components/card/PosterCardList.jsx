import { PosterCard } from "../index";
import { styled, Stack } from "@mui/material";

const PosterList = styled("div")(({ theme }) => ({
  display: "flex",
}));

const PosterCardList = () => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <PosterCard></PosterCard>
        <PosterCard></PosterCard>
        <PosterCard></PosterCard>
        <PosterCard></PosterCard>
      </Stack>
    </>
  );
};

export default PosterCardList;
