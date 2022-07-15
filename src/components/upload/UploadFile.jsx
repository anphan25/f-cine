import { IconButton } from "@mui/material";
import { CustomDialog } from "components";
import React from "react";
import { MdUploadFile } from "react-icons/md";

const UploadFile = ({ type, handleUpload, ...props }) => {
  return (
    <>
      <IconButton
        sx={{ marginRight: "12px", p: 2 }}
        color="primary"
        aria-label="upload file"
        component="label"
      >
        <input hidden accept={type} type="file" onChange={handleUpload} />
        <MdUploadFile />
      </IconButton>

      {/* <CustomDialog
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
                mode="addSeat"
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
      </CustomDialog> */}
    </>
  );
};

export default UploadFile;
