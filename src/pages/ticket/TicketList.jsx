import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  CustomDialog,
  CustomSnackBar,
  HeaderBreadcrumbs,
  Showcase,
} from "components";
import SeatList from "components/seat/SeatList";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { getRoomById } from "services/RoomService";
import { getShowTimeList } from "services/ShowTimeService";
import { postTickets } from "services/TicketService";

const TicketList = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [showtime, setShowtime] = useState();
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtimeTicketTypeId, setShowtimeTicketTypeId] = useState();
  const tickets = [];

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSubmit = () => {
    // selectedSeats.reduce((prev, cur) => {
    //   if (prev.seatId !== cur.id || prev === null) {
    //     prev.push({
    //       seatId: cur.id,
    //       showtimeTicketTypeId,
    //     });
    //     console.log("prev:", prev);
    //   }

    //   return prev;
    // }, []);
    selectedSeats.forEach((seat) => {
      tickets.push({
        seatId: seat.id,
        showtimeTicketTypeId,
      });
    });
    console.log("tickets", tickets);
    setLoading(true);
    postTickets(tickets)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const fetchShowtimeList = () => {
    setLoading(true);
    getShowTimeList()
      .then((res) => {
        setShowtimes(res.showtimes.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchRoom = (roomId) => {
    getRoomById(roomId)
      .then((res) => {
        //console.log(res);
        setRoom(res.room);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchShowtimeList();
  }, []);

  return (
    <>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <HeaderBreadcrumbs
          heading="Ticket List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Ticket List" }]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={handleDialog}
        >
          Add Tickets
        </Button>
      </Stack>

      {/* Add Tickets Dialog */}
      <CustomDialog
        open={isDialogOpen}
        onClose={handleDialog}
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
        title="Add Tickets"
      >
        <DialogContent>
          <Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="movieId"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Showtime
              </FormLabel>
              <Autocomplete
                freeSolo
                name="showtimeId"
                id="showtimeId"
                options={showtimes}
                getOptionLabel={(option) =>
                  option.movie.title +
                    " - " +
                    moment.utc(option.startTime).local().format("HH:mm") +
                    " - " +
                    option.theaterName +
                    "/room " +
                    option.room.no || ""
                }
                onChange={(e, value) => {
                  setShowtime(value);
                  if (value?.roomId) {
                    fetchRoom(value.roomId);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Showtime" />
                )}
              />
            </Stack>
            {showtime && (
              <>
                <Stack direction="column" spacing={1} mb={3}>
                  <FormLabel
                    htmlFor="movieId"
                    sx={{
                      fontWeight: "600",
                      color: "neutral.800",
                    }}
                  >
                    Ticket Type
                  </FormLabel>
                  <Select
                    id="ticketTypeId"
                    value={showtime.ticketTypeId}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setShowtimeTicketTypeId(e.target.value);
                    }}
                    renderValue={
                      showtime !== {}
                        ? undefined
                        : () => (
                            <Typography sx={{ color: "neutral.700" }}>
                              Ticket Type
                            </Typography>
                          )
                    }
                  >
                    {showtime?.showtimeTicketTypes?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.ticketType.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Stack
                  direction="column"
                  alignItems="center"
                  p={3}
                  sx={{
                    borderRadius: "12px",
                  }}
                >
                  <SeatList
                    numberOfRow={room?.numberOfRow}
                    numberOfColumn={room?.numberOfColumn}
                    seatList={room?.seatDtos}
                    selectedSeats={selectedSeats}
                    onSelectedSeatsChange={(selectedSeats) =>
                      setSelectedSeats(selectedSeats)
                    }
                  />
                  <Showcase />
                </Stack>
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
            variant="contained"
            autoFocus
          >
            Add Tickets
          </Button>
        </DialogActions>
      </CustomDialog>

      {/* Alert message */}
      {alert?.status && (
        <CustomSnackBar
          message={alert.message}
          status={alert.status}
          type={alert.type}
        />
      )}
    </>
  );
};

export default TicketList;
