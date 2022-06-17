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
import { useSelector } from "react-redux";
import { CustomDatePicker, DataTable } from "../components/index";
import { getShowTimeList, postShowTime } from "../services/ShowTimeService";
import { getMovieTitle } from "../services/MovieService";
import { getRoomsByTheaterId } from "../services/RoomService";
import { useNavigate } from "react-router-dom";

const ShowTimeList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const companyInfo = useSelector((state) => state.company.company);
  const [data, setData] = useState({
    // movieId: null,
    // roomId: null,
    // theaterId: null,
    startTime: new Date().toISOString(),
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

  const handleSubmit = async () => {
    setLoading(true);
    console.log(data);
    postShowTime(data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate(`${res.createdShowtimeId}/tickets`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    //toast.error("Create failed");
  };

  useEffect(() => {
    const fetchData = () => {
      getShowTimeList()
        .then((res) => {
          console.log(res);
          setPageState((old) => ({
            ...old,
            isLoading: false,
            data: res,
            total: 1,
          }));
        })
        .catch((err) => {});
      // setPageState((old) => ({ ...old, isLoading: true }));
    };
    // console.log(pageState);
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieTitleRes = await getMovieTitle();

      movieTitleRes.movieTitles?.splice(10);
      setMovies(movieTitleRes?.movieTitles);
    };
    fetchMovieData();
  }, [companyInfo]);

  const fetchRoomData = (id) => {
    getRoomsByTheaterId(id)
      .then((res) => {
        console.log(res);
        setRooms(res.roomNumbers);
      })
      .catch((err) => console.log(err));
  };

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
        data={pageState.data}
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
                options={movies}
                value={data?.movieId}
                getOptionLabel={(option) => option.title || ""}
                onChange={(e, value) => {
                  setData({ ...data, movieId: value?.movieId });
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
                options={companyInfo?.theaters}
                value={data?.theaterId}
                getOptionLabel={(option) => option.name || ""}
                onChange={(e, value) => {
                  setData({ ...data, theaterId: value?.id });
                  console.log(value);
                  fetchRoomData(value?.id);
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
                options={rooms || ["There is no room of this theater"]}
                value={data?.roomId}
                getOptionLabel={(option) => option.roomNumber?.toString() || ""}
                onChange={(e, value) => {
                  setData({ ...data, roomId: value?.roomID });
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
                  console.log(value);
                  setData({
                    ...data,
                    startTime: value,
                  });
                }}
              />
            </Stack>
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
            Add Show Time
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShowTimeList;
