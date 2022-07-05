import {
  Button,
  Card,
  DialogActions,
  DialogContent,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  CustomDialog,
  CustomSnackBar,
  HeaderBreadcrumbs,
  Showcase,
} from "components";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import SeatList from "components/seat/SeatList";
import { getRoomById } from "services/RoomService";
import { getSeatTypeList } from "services/SeatTypeService";
import { postSeats } from "services/SeatService";

const RoomDetail = () => {
  const { roomId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [seatTypes, setSeatTypes] = useState([]);
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [disabledSeats, setDisabledSeats] = useState([]);
  const [soldSeats, setSoldSeats] = useState([]);
  const [seatTypeId, setSeatTypeId] = useState(0);
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });

  const handleAddSeatDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSubmitSeat = () => {
    setLoading(true);
    setAlert({});
    let seats = [];
    selectedSeats.forEach((s) => {
      seats.push({
        ...s,
        roomId: room.id,
        seatTypeId,
      });
    });
    console.log(seats);
    postSeats(seats)
      .then((res) => {
        setLoading(false);
        console.log(res);
        handleAddSeatDialog();
        setAlert({
          message: "Add seats successfully",
          status: true,
          type: "success",
        });
        fetchData();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setAlert({
          message: "Add seats failed",
          status: true,
          type: "error",
        });
      });
  };

  const fetchData = useCallback(() => {
    getRoomById(roomId)
      .then((res) => {
        setRoom(res.room);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roomId]);

  useEffect(() => {
    getSeatTypeList()
      .then((res) => {
        setSeatTypes(res?.seatTypes);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchData();
  }, [fetchData]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="Room Detail"
          links={[
            { name: "Dashboard", to: "/" },
            { name: "Theater List", to: "/theaters" },
            { name: "Room List", to: -1 },
            { name: "Room Detail" },
          ]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={handleAddSeatDialog}
        >
          Add Seat
        </Button>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack direction="column" alignItems="center">
              <SeatList
                isView={true}
                numberOfRow={room?.numberOfRow}
                numberOfColumn={room?.numberOfColumn}
                seatList={room?.seatDtos}
                selectedSeats={selectedSeats}
                disabledSeats={disabledSeats}
                soldSeats={soldSeats}
                onSelectedSeatsChange={(selectedSeats) =>
                  setSelectedSeats(selectedSeats)
                }
              />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack direction="column" alignItems="center">
                <Showcase />
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <CustomDialog
        open={isDialogOpen}
        onClose={handleAddSeatDialog}
        title="Add Seat"
        sx={{ "& .MuiDialog-paper": { width: "1600px", height: "90vh" } }}
      >
        <DialogContent>
          <Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="seatTypeId"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Seat Type
              </FormLabel>
              <Select
                id="seatTypeId"
                value={seatTypeId}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSeatTypeId(e.target.value);
                }}
                renderValue={
                  seatTypeId !== 0
                    ? undefined
                    : () => (
                        <Typography sx={{ color: "neutral.700" }}>
                          Seat Type
                        </Typography>
                      )
                }
              >
                {seatTypes.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack
              direction="column"
              alignItems="center"
              sx={{
                borderRadius: "12px",
              }}
            >
              <SeatList
                isView={false}
                numberOfRow={room?.numberOfRow}
                numberOfColumn={room?.numberOfColumn}
                seatList={room?.seatDtos}
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
          <Button disabled={loading} onClick={handleAddSeatDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitSeat}
            disabled={loading}
            type="submit"
            variant="contained"
            autoFocus
          >
            Add Seats
          </Button>
        </DialogActions>
      </CustomDialog>
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

export default RoomDetail;
