import { HeaderBreadcrumbs } from "components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowTimeById } from "services/ShowTimeService";
import SeatList from "components/seat/SeatList";
import {
  Box,
  FormLabel,
  Input,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { seatImg, seatSelected, seatVip } from "assets/images";

const SeatStyle = styled("img")(() => ({
  height: 40,
  width: 40,
  margin: "12px auto",
}));

const AddTicket = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});

  useEffect(() => {
    const fetchShowTime = () => {
      getShowTimeById(id)
        .then((res) => {
          console.log(res);
          setRoom(res?.showtime?.room);
        })
        .catch((err) => console.log(err));
    };

    fetchShowTime();
  }, [id]);

  const seats = Array.from(
    { length: room.numberOfRow * room.numberOfColumn },
    (_, i) => i
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <>
      <HeaderBreadcrumbs
        heading="Add Ticket To Show Time"
        links={[
          { name: "Dashboard", to: "/" },
          { name: "Show Time List", to: "/showtimes" },
          { name: "Add Show Time" },
        ]}
      />
      <Stack
        direction="row"
        justifyContent="space-evenly"
        bgcolor="neutral.0"
        p={2}
        sx={{
          borderRadius: "12px",
        }}
      >
        <Stack direction="column" gap="12px">
          <FormLabel
            htmlFor="movieId"
            sx={{
              fontWeight: "600",
              color: "neutral.800",
            }}
          >
            Price
          </FormLabel>
          <Input name="price" id="price" placeholder="Enter price" />
        </Stack>
        <ShowCase />
        <SeatList
          numberOfRow={room.numberOfRow}
          numberOfColumn={room.numberOfColumn}
          seatList={seats}
          selectedSeats={selectedSeats}
          onSelectedSeatsChange={(selectedSeats) =>
            setSelectedSeats(selectedSeats)
          }
        />
      </Stack>
    </>
  );
};

function ShowCase() {
  return (
    <Stack direction="row" gap="30px">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="40px"
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
        gap="40px"
      >
        <Box>
          <SeatStyle src={seatImg} alt="" />
          <Typography textAlign="center" fontWeight="600" color="neutral.700">
            Normal Seat
          </Typography>
        </Box>
        <Box>
          <SeatStyle src={seatVip} alt="" />
          <Typography textAlign="center" fontWeight="600" color="neutral.700">
            Vip Seat
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default AddTicket;
