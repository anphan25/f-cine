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
import { useSelector } from "react-redux";
import { getShowTimeList } from "services/ShowTimeService";

const TicketList = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [showtime, setShowtime] = useState();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSubmit = () => {};

  const fetchShowtimeList = () => {
    getShowTimeList()
      .then((res) => {
        console.log(res);
        setShowtimes(res.showtimes.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const fetchShowtimeList = () => {
  //   getShowTimeList()
  //     .then((res) => {
  //       console.log(res);
  //       setShowtimes(res.showtimes.results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
        sx={{ "& .MuiDialog-paper": { width: "600px" } }}
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
                    moment.utc(option.startTime).local().format("HH:mm") || ""
                }
                onChange={(e, value) => {
                  setShowtime(value);
                  console.log(value);
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
                    onChange={(e) => {}}
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
                  <Showcase />
                  <SeatList
                    numberOfRow={showtime.room?.numberOfRow}
                    numberOfColumn={showtime.room?.numberOfColumn}
                    seatList={showtime.room?.seatDtos}
                    selectedSeats={selectedSeats}
                    onSelectedSeatsChange={(selectedSeats) =>
                      setSelectedSeats(selectedSeats)
                    }
                  />
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
