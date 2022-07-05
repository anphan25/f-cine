import React from "react";
import { Box, Stack, styled, SvgIcon } from "@mui/material";

const SvgStyle = styled(SvgIcon, {
  shouldForwardProp: (prop) =>
    prop !== "isSelected" && prop !== "isDisabled" && prop !== "isSold",
})(({ theme, isSelected, isDisabled, isSold }) => ({
  fontSize: "32px",
  fill: theme.palette.neutral[0],
  stroke: theme.palette.neutral[500],
  ...(isSelected && {
    fill: theme.palette.primary.light,
    stroke: theme.palette.primary.main,
  }),
  ...(isDisabled && {
    fill: theme.palette.info.light,
    stroke: theme.palette.info.main,
  }),
  ...(isSold && {
    fill: theme.palette.error.light,
  }),
}));

const SeatList = ({
  seatList,
  selectedSeats,
  disabledSeats,
  soldSeats,
  onSelectedSeatsChange,
  isView,
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
    <Box sx={{ perspective: "300px" }}>
      <Box
        sx={{
          margin: "30px auto",
          height: "80px",
          backgroundColor: "neutral.400",
          width: "100%",
          transform: "rotateX(-30deg) scale(1.1)",
          boxShadow: "0 3px 10px 2px #e7e7e8",
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap="12px"
      >
        <Stack
          direction="column"
          sx={{ marginTop: "40px" }}
          justifyContent="space-between"
        >
          {[...Array(props.numberOfRow)].map((x, i) => (
            <Box
              key={i}
              sx={{
                height: "32px",
                width: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
                fontSize: "18px",
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
            gridTemplateColumns: `repeat(${props.numberOfColumn}, min-content)`,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[...Array(props.numberOfColumn)].map((x, i) => (
            <Box
              key={i}
              sx={{
                height: "32px",
                width: "32px",
                textAlign: "center",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              {++i}
            </Box>
          ))}
          {seatList?.map((seat, index) => (
            <SvgStyle
              key={index}
              onClick={() => {
                if (!disabledSeats?.includes(seat) && !isView) {
                  handleSelectedState(seat);
                }
              }}
              sx={{
                cursor:
                  !isView && !disabledSeats?.includes(seat)
                    ? "pointer"
                    : "default",
              }}
              isSelected={selectedSeats?.includes(seat)}
              isDisabled={disabledSeats?.includes(seat)}
              isSold={soldSeats?.includes(seat)}
            >
              {seat.seatType?.name === "Vip" && (
                <g clipPath="url(#clip0_0_2810)">
                  <rect
                    x="2.71133"
                    y="0.797205"
                    width="15.4994"
                    height="19.4054"
                    rx="1.4"
                    fill="inherit"
                    stroke="inherit"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M14.755 8.79307L12.0276 8.39668L10.8083 5.9249C10.775 5.85723 10.7202 5.80244 10.6526 5.76914C10.4828 5.68535 10.2766 5.75518 10.1917 5.9249L8.97247 8.39668L6.24503 8.79307C6.16984 8.80381 6.10109 8.83926 6.04845 8.89297C5.98482 8.95838 5.94975 9.04637 5.95096 9.13761C5.95217 9.22886 5.98955 9.31589 6.0549 9.37959L8.02823 11.3035L7.56202 14.0202C7.55109 14.0834 7.55808 14.1484 7.58221 14.2078C7.60634 14.2673 7.64663 14.3187 7.69852 14.3564C7.75042 14.3941 7.81183 14.4165 7.8758 14.4211C7.93978 14.4256 8.00375 14.4122 8.06046 14.3822L10.5 13.0996L12.9396 14.3822C13.0062 14.4177 13.0835 14.4295 13.1576 14.4166C13.3445 14.3844 13.4702 14.2071 13.438 14.0202L12.9718 11.3035L14.9451 9.37959C14.9988 9.32695 15.0343 9.2582 15.045 9.18301C15.074 8.99502 14.943 8.821 14.755 8.79307V8.79307Z"
                    fill="inherit"
                  />
                  <rect
                    x="16.515"
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
                  <path
                    d="M3 20.3604C3 19.6091 3.60909 19 4.36043 19H16.3577C17.1091 19 17.7182 19.6091 17.7182 20.3604C17.7182 21.1118 17.1091 21.7209 16.3577 21.7209H4.36044C3.60909 21.7209 3 21.1118 3 20.3604Z"
                    fill="inherit"
                    stroke="inherit"
                    strokeWidth="1.2"
                  />
                </g>
              )}
              {seat.seatType?.name === "Normal" && (
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
              )}
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
          {seatList?.length === 0 &&
            [...Array(props.numberOfColumn * props.numberOfRow)].map((x) => (
              <Box
                sx={{
                  height: 32,
                  width: 32,
                  backgroundColor: "neutral.500",
                  borderRadius: "2px",
                }}
              ></Box>
            ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default SeatList;
