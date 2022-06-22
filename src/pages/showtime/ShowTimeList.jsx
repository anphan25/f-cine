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
import { CustomDatePicker, DataTable, CustomSnackBar } from "components";
import { getShowTimeList, postShowTime } from "services/ShowTimeService";
import { getMovieTitle } from "services/MovieService";
import { getRoomsByTheaterId } from "services/RoomService";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ShowTimeList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const companyInfo = useSelector((state) => state.company.company);
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });
  const [data, setData] = useState({
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
        width: 350,
      },
      {
        headerName: "Date",
        field: "date",
        width: 200,
      },
      {
        headerName: "Start Time",
        field: "startTime",
        type: "datetime",
        width: 150,
      },
      {
        headerName: "Theater",
        field: "theater",
        width: 250,
      },
      {
        headerName: "Room No",
        field: "room",
        width: 100,
        align: "right",
      },
    ],
    pageState: pageState,
  };

  const handleDialog = () => {
    isDialogOpen ? setIsDialogOpen(false) : setIsDialogOpen(true);
  };

  const pageChangeHandler = (newPage) => {
    setPageState((old) => ({ ...old, page: newPage + 1 }));
  };

  const pageSizeChangeHandler = (newPageSize) => {
    setPageState((old) => ({ ...old, pageSize: newPageSize }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setAlert({});
    postShowTime(data)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status === 400) {
          setAlert({
            message: res.data.errors?.StartTime[0],
            status: true,
            type: "error",
          });
          console.log(res.data.errors?.StartTime[0]);
        }
        if (res.status === 200) {
          setAlert({
            message: "Add showtime successfully",
            status: true,
            type: "success",
          });
          navigate(`${res.createdShowtimeId}/tickets`);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlert({
          message: err.response.data?.errors?.StartTime[0],
          status: true,
          type: "error",
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true, data: [] }));

      const res = await getShowTimeList({
        PageSize: pageState.pageSize,
        Page: pageState.page,
      });

      const dataRow = res.showtimes.results.map((row) => ({
        id: row.id,
        title: row.movie.title,
        date: moment(row.startTime).format("DD/MM/yyyy"),
        startTime: moment(row.startTime).format("HH:mm"),
        theater: row.theaterName,
        room: row.room.no,
      }));

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: dataRow,
        total: res.showtimes.total,
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
    fetchMovieData();
  }, [companyInfo]);

  const fetchRoomData = (id) => {
    setAlert({});
    getRoomsByTheaterId(id)
      .then((res) => {
        if (!res.roomNumbers) {
          setAlert({ message: res.message, status: true, type: "error" });
        }
        setRooms(res?.roomNumbers);
      })
      .catch((err) => {
        setAlert({
          message: "Can't get rooms of this theater!",
          status: true,
          type: "error",
        });
      });
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
          onClick={handleDialog}
        >
          Add Show Time
        </Button>
      </Stack>
      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
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
                disabled={data.theaterId && rooms?.length > 0 ? false : true}
                freeSolo
                name="roomId"
                id="roomId"
                options={rooms}
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

export default ShowTimeList;
