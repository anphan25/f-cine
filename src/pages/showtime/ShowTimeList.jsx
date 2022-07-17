import {
  Button,
  Stack,
  Autocomplete,
  FormLabel,
  TextField,
  DialogActions,
  DialogContent,
  Box,
} from "@mui/material";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import React, { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  CustomDatePicker,
  DataTable,
  CustomSnackBar,
  CustomDialog,
  TicketTypeForm,
  UploadFile,
} from "components";
import { getShowTimeList, postShowTime } from "services/ShowTimeService";
import { getMovieTitle } from "services/MovieService";
import { getRoomsByTheaterId } from "services/RoomService";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BiCheckDouble } from "react-icons/bi";
import { HiEye } from "react-icons/hi";
import { GridActionsCellItem } from "@mui/x-data-grid";

const ShowTimeList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [showtimeTicketTypes, setShowtimeTicketTypes] = useState([
    {
      ticketTypeId: 0,
      receivePrice: "",
    },
  ]);
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
    isNotShowedYet: true,
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
        width: 150,
      },
      {
        headerName: "Start Time",
        field: "startTime",
        type: "datetime",
        width: 100,
      },
      {
        headerName: "Theater",
        field: "theater",
        width: 200,
      },
      {
        headerName: "Room No",
        field: "room",
        width: 100,
        align: "center",
      },
      {
        headerName: "Showed",
        field: "showed",
        width: 100,
        align: "left",
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        sortable: false,
        filterable: false,
        align: "left",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<HiEye />}
            label="View detail"
            onClick={() => {
              navigate(`${params.row.id}`);
            }}
            sx={{
              height: "36px",
              width: "36px",
              padding: "10px",
              borderRadius: "6px",
              color: "primary.main",
            }}
          />,
        ],
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
    postShowTime({ ...data, showtimeTicketTypes })
      .then((res) => {
        setLoading(false);
        if (res.message === "Success") {
          setAlert({
            message: "Add showtime successfully",
            status: true,
            type: "success",
          });
          handleDialog();
          fetchData();
          setData({});
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          setAlert({
            message:
              err.response.data.errors?.StartTime[0] ||
              err.response.data.message,
            status: true,
            type: "error",
          });
        } else {
          setAlert({
            message: "Something went wrong!",
            status: true,
            type: "error",
          });
        }
      });
  };

  const fetchData = async () => {
    setPageState((old) => ({ ...old, isLoading: true }));

    const res = await getShowTimeList({
      PageSize: pageState.pageSize,
      Page: pageState.page,
      isNotShowedYet: pageState.isNotShowedYet,
    });

    const dataRow = res.showtimes.results.map((row) => ({
      id: row.id,
      title: row.movie.title,
      date: moment.utc(row.startTime).local().format("DD/MM/yyyy"),
      startTime: moment.utc(row.startTime).local().format("HH:mm"),
      theater: row.theaterName,
      room: row.room.no,
    }));

    setPageState({
      ...pageState,
      isLoading: false,
      data: dataRow,
      total: res.showtimes.total,
    });
  };

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieTitleRes = await getMovieTitle();
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
          heading="Showtime List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Showtime List" }]}
        />

        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={() => {
            handleDialog();
          }}
        >
          Add Showtime
        </Button>
      </Stack>
      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      ></DataTable>

      {/* Add ShowTime Dialog */}
      <CustomDialog
        open={isDialogOpen}
        onClose={handleDialog}
        sx={{ "& .MuiDialog-paper": { width: "600px" } }}
        title="Add Showtime"
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
                Movie
              </FormLabel>
              <Autocomplete
                freeSolo
                name="movieId"
                id="movieId"
                options={movies}
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
                options={companyInfo?.theaters || []}
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
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="end"
              mb={3}
            >
              <Stack direction="column" spacing={1} sx={{ width: "50%" }}>
                <FormLabel
                  htmlFor="roomId"
                  sx={{
                    fontWeight: "600",
                    color: "neutral.800",
                  }}
                >
                  Room No
                </FormLabel>
                <Autocomplete
                  disabled={data.theaterId && rooms?.length > 0 ? false : true}
                  freeSolo
                  name="roomId"
                  id="roomId"
                  options={rooms || []}
                  value={data?.roomId}
                  getOptionLabel={(option) =>
                    option.roomNumber?.toString() || ""
                  }
                  onChange={(e, value) => {
                    setData({ ...data, roomId: value?.roomID });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Room" />
                  )}
                />
              </Stack>
              <Stack direction="column" spacing={1} sx={{ width: "50%" }}>
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
                  id="startTime"
                  onDateChange={(value) => {
                    setData({
                      ...data,
                      startTime: value.toISOString(),
                    });
                  }}
                />
              </Stack>
            </Stack>
            <TicketTypeForm
              showtimeTicketTypes={showtimeTicketTypes}
              setShowtimeTicketTypes={setShowtimeTicketTypes}
            />
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

export default ShowTimeList;
