import React from "react";
import { Box, Stack, styled, SvgIcon } from "@mui/material";

const SvgStyle = styled(SvgIcon, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})(({ isSelected, theme }) => ({
  cursor: "pointer",
  fontSize: "40px",
  fill: isSelected ? theme.palette.primary.light : theme.palette.neutral[0],
  stroke: isSelected ? theme.palette.primary.main : theme.palette.neutral[600],
}));

const SeatList = ({
  seatList,
  selectedSeats,
  onSelectedSeatsChange,
  ...props
}) => {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap="20px"
    >
      <Stack
        direction="column"
        sx={{ marginTop: "40px" }}
        justifyContent="space-between"
      >
        {[...Array(props.numberOfColumn)].map((x, i) => (
          <Box
            key={i}
            sx={{
              height: "40px",
              width: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "500",
              fontSize: "20px",
              marginBottom: "6px",
            }}
          >
            {String.fromCharCode(i + 65)}
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridGap: "6px",
          gridTemplateColumns: `repeat(${props.numberOfRow}, min-content)`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {[...Array(props.numberOfRow)].map((x, i) => (
          <Box
            key={i}
            sx={{
              height: "32px",
              width: "32px",
              textAlign: "center",
              fontWeight: "500",
              fontSize: "20px",
            }}
          >
            {++i}
          </Box>
        ))}
        {seatList.map((seat, index) => (
          <SvgStyle
            key={index}
            onClick={() => handleSelectedState(seat)}
            isSelected={selectedSeats.includes(seat)}
          >
            <g clipPath="url(#clip0_0_2810)">
              <rect
                x="2.71133"
                y="0.797205"
                width="14.4994"
                height="19.4054"
                rx="1.4"
                fill="inherit"
                stroke="inherit"
                strokeWidth="1.2"
              />
              <rect
                x="16.415"
                y="9.02809"
                width="2.72087"
                height="10.7933"
                rx="1.36043"
                fill="inherit"
                stroke="inherit"
                strokeWidth="1.2"
              />
              <rect
                x="0.71582"
                y="9.02809"
                width="2.72087"
                height="10.7933"
                rx="1.36043"
                fill="inherit"
                stroke="inherit"
                strokeWidth="1.2"
              />
              <path
                d="M2.60205 20.3119C2.60205 19.5606 3.21114 18.9515 3.96248 18.9515H15.9598C16.7111 18.9515 17.3202 19.5606 17.3202 20.3119V20.3119C17.3202 21.0633 16.7111 21.6724 15.9598 21.6724H3.96249C3.21114 21.6724 2.60205 21.0633 2.60205 20.3119V20.3119Z"
                fill="inherit"
                stroke="inherit"
                strokeWidth="1.2"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_2810">
                <rect
                  width="18.4202"
                  height="21.4752"
                  fill="white"
                  transform="translate(0.71582 0.197205)"
                />
              </clipPath>
            </defs>
          </SvgStyle>
        ))}
      </Box>
    </Stack>
  );
};

export default SeatList;
