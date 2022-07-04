import {
  Button,
  Card,
  DialogActions,
  DialogContent,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  CustomDialog,
  CustomSnackBar,
  HeaderBreadcrumbs,
  Image,
  Showcase,
  TicketTypeForm,
} from "components";
import SeatList from "components/seat/SeatList";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getShowTimeById } from "services/ShowTimeService";
import { getTickets, postTickets } from "services/TicketService";
import { getMovieDetail } from "services/MovieService";
import { useCallback } from "react";
import moment from "moment";
import { postShowtimeTicketType } from "services/ShowtimeTicketTypesService";

const ShowTimeDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    showtime: null,
    movie: null,
    tickets: null,
  });
  const [loading, setLoading] = useState(false);
  const [isDialogTicketOpen, setIsDialogTicketOpen] = useState(false);
  const [isDialogTypeOpen, setIsDialogTypeOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [disabledSeats, setDisabledSeats] = useState([]);
  const [soldSeats, setSoldSeats] = useState([]);
  const [showtimeTicketTypeId, setShowtimeTicketTypeId] = useState();
  const [showtimeTicketType, setShowtimeTicketType] = useState({
    ticketTypeId: 0,
    receivePrice: "",
  });

  const handleDialogTicket = () => {
    setIsDialogTicketOpen(!isDialogTicketOpen);
  };

  const handleDialogType = () => {
    setIsDialogTypeOpen(!isDialogTypeOpen);
  };

  const handleSubmitTicket = () => {
    setAlert({});
    setLoading(true);
    let params = [];
    selectedSeats.forEach((seat) => {
      params.push({
        seatId: seat.id,
        showtimeTicketTypeId,
      });
    });
    postTickets(params)
      .then((res) => {
        setLoading(false);
        console.log(res);
        setAlert({
          message: "Add tickets successfully",
          status: true,
          type: "success",
        });
        handleDialogTicket();
        fetchShowtimeById();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setAlert({
          message: "Add tickets failed",
          status: true,
          type: "error",
        });
      });
  };

  const handleSubmitType = () => {
    setAlert({});
    setLoading(true);
    postShowtimeTicketType({
      showtimeId: id,
      ...showtimeTicketType,
    })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setAlert({
          message: "Add ticket type successfully",
          status: true,
          type: "success",
        });
        handleDialogType();
        fetchShowtimeById();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setAlert({
          message: err.response.data.message || "Add ticket type failed",
          status: true,
          type: "error",
        });
      });
  };

  const fetchShowtimeById = useCallback(() => {
    setLoading(true);
    getShowTimeById(id)
      .then((res) => {
        setData((d) => ({
          ...d,
          showtime: res.showtime,
        }));
        if (res.showtime) {
          Promise.all([
            getTickets({
              ShowtimeId: id,
              PageSize:
                res.showtime.room.numberOfColumn *
                res.showtime.room.numberOfRow,
            })
              .then((response) => {
                let tickets = response.result.results;
                setData((d) => ({
                  ...d,
                  tickets,
                }));
                let disabled = [];
                let sold = [];
                res.showtime.room.seatDtos.forEach((seat) => {
                  tickets.forEach((ticket) => {
                    ticket.seatId === seat.id &&
                      ticket.statusName === "Available" &&
                      disabled.push(seat);
                    ticket.seatId === seat.id &&
                      ticket.statusName === "UnAvailable" &&
                      sold.push(seat);
                  });
                });
                setDisabledSeats(disabled);
                setSoldSeats(sold);
              }, [])
              .catch((err) => {
                console.log(err);
              }),
            getMovieDetail(res.showtime.movieId)
              .then((res) => {
                console.log(res);
                setData((d) => ({
                  ...d,
                  movie: res.result,
                }));
              })
              .catch((err) => {
                console.log(err);
              }),
          ]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchShowtimeById();
  }, [fetchShowtimeById]);

  return (
    <>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <HeaderBreadcrumbs
          heading="Showtime Detail"
          links={[
            { name: "Dashboard", to: "/" },
            { name: "Showtime List", to: "/showtimes" },
            { name: "Showtime Detail" },
          ]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={handleDialogTicket}
        >
          Add Tickets
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack direction="column" alignItems="center">
              <SeatList
                isView={true}
                numberOfRow={data.showtime?.room?.numberOfRow}
                numberOfColumn={data.showtime?.room?.numberOfColumn}
                seatList={data.showtime?.room?.seatDtos}
                selectedSeats={selectedSeats}
                disabledSeats={disabledSeats}
                soldSeats={soldSeats}
                onSelectedSeatsChange={(selectedSeats) =>
                  setSelectedSeats(selectedSeats)
                }
              />
              <Showcase />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Typography
                variant="overline"
                sx={{
                  mb: 1,
                  display: "block",
                  color:
                    data.showtime?.startTime > new Date().toISOString()
                      ? "info.main"
                      : "error.main",
                  fontWeight: 700,
                }}
              >
                {data.showtime?.startTime > new Date().toISOString()
                  ? "not showed"
                  : "showed"}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Image
                  disabledEffect
                  alt="movie image"
                  src={data.movie?.coverImageUrl}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 1.5,
                  }}
                />
                <Typography variant="h5" paragraph sx={{ flex: 1 }}>
                  {data.movie?.title}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 3, mt: 2 }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                  Date
                </Typography>

                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {moment(data.showtime?.startTime).format("DD/MM/yyyy")}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                  Time
                </Typography>

                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {moment
                    .utc(data.showtime?.startTime)
                    .local()
                    .format("HH:mm") +
                    " - " +
                    moment.utc(data.showtime?.endTime).local().format("HH:mm")}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                  Theater
                </Typography>

                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {data.showtime?.theaterName}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                  Room No
                </Typography>

                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {data.showtime?.room?.no}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                  Total tickets
                </Typography>

                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  0
                </Typography>
              </Stack>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  ticket type
                </Typography>
                <IconButton color="primary" onClick={handleDialogType}>
                  <MdAdd />
                </IconButton>
              </Stack>
              {data.showtime?.showtimeTicketTypes?.length > 0 ? (
                data.showtime.showtimeTicketTypes.map((type) => (
                  <Stack
                    key={type.id}
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 3, mt: 1 }}
                  >
                    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                      {type?.ticketType?.name}
                    </Typography>

                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      {type?.receivePrice}
                    </Typography>
                  </Stack>
                ))
              ) : (
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                  There is no ticket type
                </Typography>
              )}
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Add Tickets Dialog */}
      <CustomDialog
        open={isDialogTicketOpen}
        onClose={handleDialogTicket}
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
                Ticket Type
              </FormLabel>
              <Select
                id="ticketTypeId"
                value={data.showtime?.ticketTypeId}
                onChange={(e) => {
                  console.log(e.target.value);
                  setShowtimeTicketTypeId(e.target.value);
                }}
                renderValue={
                  data.showtime !== null
                    ? undefined
                    : () => (
                        <Typography sx={{ color: "neutral.700" }}>
                          Ticket Type
                        </Typography>
                      )
                }
              >
                {data.showtime?.showtimeTicketTypes?.map((item) => (
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
                isView={false}
                numberOfRow={data.showtime?.room?.numberOfRow}
                numberOfColumn={data.showtime?.room?.numberOfColumn}
                seatList={data.showtime?.room?.seatDtos}
                selectedSeats={selectedSeats}
                disabledSeats={disabledSeats}
                soldSeats={soldSeats}
                onSelectedSeatsChange={(selectedSeats) =>
                  setSelectedSeats(selectedSeats)
                }
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleDialogTicket}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitTicket}
            disabled={loading}
            type="submit"
            variant="contained"
            autoFocus
          >
            Add Tickets
          </Button>
        </DialogActions>
      </CustomDialog>

      {/* Add Ticket Types Dialog */}
      <CustomDialog
        open={isDialogTypeOpen}
        onClose={handleDialogType}
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
        title="Add Ticket Types"
      >
        <DialogContent>
          <TicketTypeForm
            showtimeTicketTypes={showtimeTicketType}
            setShowtimeTicketTypes={setShowtimeTicketType}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleDialogType}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitType}
            disabled={loading}
            type="submit"
            variant="contained"
            autoFocus
          >
            Add Ticket Types
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

export default ShowTimeDetail;
