import {
  Button,
  Stack,
  Autocomplete,
  FormLabel,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Divider,
} from "@mui/material";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import React, { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CustomDatePicker, DataTable } from "../components/index";
import { postShowTime } from "../services/ShowTimeService";
import { getMovieTitle } from "../services/MovieService";
import { getTheatersByCompanyId } from "../services/TheaterService";
import { getRoomsByTheaterId } from "../services/RoomService";

const ShowTimeList = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const companyInfo = useSelector((state) => state.company.company);
  const theatersInfo = useSelector((state) => state.company.company?.theaters);
  const [data, setData] = useState({
    movieId: null,
    roomId: null,
    theaterId: null,
    startTime: null,
  });
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

  const gridOptions = {
    columns: [
      {
        headerName: "ID",
        field: "id",
        width: 80,
      },
      {
        headerName: "Movie",
        field: "title",
        width: 300,
      },
      {
        headerName: "Date",
        field: "date",
        width: 200,
      },
      {
        headerName: "Start Time",
        field: "startTime",
        width: 150,
      },
      {
        headerName: "Theater",
        field: "theater",
        width: 250,
      },
      {
        headerName: "Room",
        field: "room",
        width: 100,
      },
    ],
    pageState: pageState,
  };

  const handleDialog = () => {
    isDialogOpen ? setIsDialogOpen(false) : setIsDialogOpen(true);
  };

  const submitShowTime = () => {
    console.log(data);
    postShowTime(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      // setPageState((old) => ({ ...old, isLoading: true }));

      // const res = await getDataGrid();

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: [],
        total: 1,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieTitleRes = await getMovieTitle();

      movieTitleRes.movieTitles?.splice(10);
      setMovies(movieTitleRes?.movieTitles);
    };

    const fetchTheaterData = async () => {
      // const theaterRes = await getTheatersByCompanyId({
      //   CompanyId: companyInfo?.id,
      // });

      setTheaters(theatersInfo);
    };
    fetchMovieData();
    fetchTheaterData();
  }, [companyInfo]);

  useEffect(() => {
    const fetchRoomData = async () => {
      const roomRes = await getRoomsByTheaterId(data.theaterId);

      console.log(roomRes.roomNumbers);
      setRooms(roomRes.roomNumbers);
    };

    fetchRoomData();
  }, [data.theaterId]);

  return (
    <>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <HeaderBreadcrumbs
          heading="Show Time List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Show Time List" }]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          sx={{ width: "200px", height: "40px" }}
          onClick={handleDialog}
        >
          New Show Time
        </Button>
      </Stack>

      <DataTable
        gridOptions={gridOptions}
        // onPageChange={pageChangeHandler}
        // onPageSizeChange={pageSizeChangeHandler}
      ></DataTable>

      {/* Add ShowTime Dialog */}
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "700px" } }}
        open={isDialogOpen}
        onClose={handleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Show Time</DialogTitle>
        <Divider sx={{ mt: "20px" }} />
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
                Movie
              </FormLabel>
              <Autocomplete
                freeSolo
                name="movieId"
                id="movieId"
                options={movies || []}
                value={data?.movieId || null}
                getOptionLabel={(option) => option.title || ""}
                onChange={(e, value) => {
                  setData((pre) => ({ ...pre, movieId: value?.movieId }));
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Movie" />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="theaterId"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Theater
              </FormLabel>
              <Autocomplete
                freeSolo
                name="theaterId"
                id="theaterId"
                options={theaters || []}
                value={data?.theaterId || null}
                getOptionLabel={(option) => option.name || ""}
                onChange={(e, value) => {
                  console.log("value" + value);
                  setData((pre) => ({ ...pre, theaterId: value?.id }));
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Theater" />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="roomId"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Room
              </FormLabel>
              <Autocomplete
                disabled={data.theaterId ? false : true}
                freeSolo
                name="roomId"
                id="roomId"
                options={rooms || []}
                value={data?.roomId || null}
                getOptionLabel={(option) => option.roomNumber?.toString() || ""}
                onChange={(e, value) => {
                  console.log("room value: " + value.roomID);
                  setData((pre) => ({ ...pre, roomId: value?.roomID }));
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Room" />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="startTime"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Start Time
              </FormLabel>
              <CustomDatePicker
                // disabled={data.roomId ? false : true}
                id="startTime"
                onDateChange={(value) => {
                  console.log("startTime value:" + value);
                  setData((pre) => ({
                    ...pre,
                    startTime: value,
                  }));
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button onClick={submitShowTime} variant="contained" autoFocus>
            Add Show Time
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShowTimeList;
