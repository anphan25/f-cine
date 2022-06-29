import { Box, Stack, styled, Typography } from "@mui/material";
import React from "react";
import { seatImg, seatSelected, seatVip } from "assets/images";

const SeatStyle = styled("img")(() => ({
  height: 28,
  width: 28,
  margin: "12px auto",
}));

const Showcase = () => {
  return (
    <Stack direction="row" gap="24px">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="36px"
      >
        <Box>
          <SeatStyle src={seatImg} alt="" />
          <Typography textAlign="center" fontWeight="600" color="neutral.700">
            N/A
          </Typography>
        </Box>
        <Box>
          <SeatStyle src={seatSelected} alt="" />
          <Typography textAlign="center" fontWeight="600" color="neutral.700">
            Selected
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="36px"
      >
        <Box>
          <SeatStyle src={seatImg} alt="" />
          <Typography textAlign="center" fontWeight="600" color="neutral.700">
            Regular
          </Typography>
        </Box>
        <Box>
          <SeatStyle src={seatVip} alt="" />
          <Typography textAlign="center" fontWeight="600" color="neutral.700">
            Vip
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Showcase;
