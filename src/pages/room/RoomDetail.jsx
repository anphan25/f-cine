import {
  Button,
  DialogActions,
  DialogContent,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { CustomDialog, HeaderBreadcrumbs } from "components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import SeatList from "components/seat/SeatList";

const RoomDetail = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [seatType, setSeatType] = useState([]);

  const handleAddSeatDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
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
                // value={data.showtime?.ticketTypeId}
                // onChange={(e) => {
                //   console.log(e.target.value);
                //   setShowtimeTicketTypeId(e.target.value);
                // }}
                // renderValue={
                //   seatType !== []
                //     ? undefined
                //     : () => (
                //         <Typography sx={{ color: "neutral.700" }}>
                //           Seat Type
                //         </Typography>
                //       )
                // }
              >
                {seatType.map((item) => (
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
                // numberOfRow={data.showtime?.room?.numberOfRow}
                // numberOfColumn={data.showtime?.room?.numberOfColumn}
                // seatList={data.showtime?.room?.seatDtos}
                // selectedSeats={selectedSeats}
                // disabledSeats={disabledSeats}
                // soldSeats={soldSeats}
                // onSelectedSeatsChange={(selectedSeats) =>
                //   setSelectedSeats(selectedSeats)
                // }
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* <Button disabled={loading} onClick={handleDialogTicket}>
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
          </Button> */}
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default RoomDetail;
