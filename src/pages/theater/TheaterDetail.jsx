import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Button,
  FormControl,
  FormLabel,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Input,
  Autocomplete,
  TextField,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DataTable, CustomSnackBar } from "components";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getRoomsList } from "../../services/RoomService";
import { CustomDialog } from "../../components";
import ChairIcon from "@mui/icons-material/Chair";
import { addRoom } from "../../services/RoomService";

const TheaterDetail = () => {
  const { id } = useParams();
  const [isRoomDetailOpen, setIsRoomDetailOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [addRoomParam, setAddRoomParam] = useState({ theaterId: id });
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    search: "",
    page: 1,
    pageSize: 10,
  });
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });

  const gridOptions = {
    columns: [
      {
        headerName: "ID",
        field: "id",
        width: 30,
      },
      {
        headerName: "Room No",
        field: "roomNo",
        type: "number",
        width: 300,
      },
      {
        headerName: "Total Seat",
        field: "totalSeat",
        type: "number",
        width: 300,
      },
      {
        headerName: "is Active",
        field: "isActive",
        type: "boolean",
        width: 300,
      },

      {
        field: "actions",
        type: "actions",
        width: 190,
        sortable: false,
        filterable: false,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<RemoveRedEyeIcon sx={{ color: "#623CE7" }} />}
            onClick={() => {
              handleRoomDetail();
            }}
          />,
          <GridActionsCellItem
            icon={<ChairIcon sx={{ color: "#623CE7" }} />}
            // onClick={() => {
            //   handleRoomDetail();
            // }}
          />,
        ],
      },
    ],
    pageState: pageState,
  };

  const pageChangeHandler = (newPage) => {
    setPageState((old) => ({ ...old, page: newPage + 1 }));
  };

  const pageSizeChangeHandler = (newPageSize) => {
    setPageState((old) => ({ ...old, pageSize: newPageSize }));
  };

  const handleRoomDetail = () => {
    isRoomDetailOpen ? setIsRoomDetailOpen(false) : setIsRoomDetailOpen(true);
  };

  const handleAddRoomDialog = () => {
    isAddRoomOpen ? setIsAddRoomOpen(false) : setIsAddRoomOpen(true);
  };

  const handleAddRoom = async () => {
    const res = await addRoom(addRoomParam);
    if (res.message === "Success") {
      handleAddRoomDialog();
      setAlert({
        message: "Add new room successfully",
        status: true,
        type: "success",
      });
      await fetchData();
    }
  };

  const AddRoomDialogContent = () => {
    return (
      <Box>
        <DialogContent>
          <Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="roomNo"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Room No
              </FormLabel>
              <Input
                id="roomNo"
                placeholder="Room No"
                onChange={(e) => {
                  console.log("nooo:", e.target.value);
                  setAddRoomParam({
                    ...addRoomParam,
                    no: e.target.value,
                  });
                }}
                sx={{ width: "100%" }}
              />
            </Stack>

            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Room Type
              </FormLabel>

              <Select
                sx={{ border: "2px solid #E4E4E4" }}
                value={addRoomParam?.roomType}
                onChange={(e, value) => {
                  if (value === 1) {
                    setAddRoomParam({
                      ...addRoomParam,
                      numberOfRow: 8,
                      numberOfColumn: 8,
                    });
                  } else {
                    setAddRoomParam({
                      ...addRoomParam,
                      numberOfRow: 10,
                      numberOfColumn: 10,
                    });
                  }
                }}
                label="Room Type"
                placeholder="Room Type"
              >
                <MenuItem value={1}>8x8</MenuItem>
                <MenuItem value={2}>10x10</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddRoomDialog}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            autoFocus
            onClick={handleAddRoom}
          >
            Add Room
          </Button>
        </DialogActions>
      </Box>
    );
  };

  const fetchData = async () => {
    setPageState((old) => ({ ...old, isLoading: true, data: [] }));

    const res = await getRoomsList({
      TheaterId: id,
      PageSize: pageState.pageSize,
      Page: pageState.page,
      SearchKey: pageState.search,
    });

    const dataRow = res.result.results.map((data) => ({
      id: data.id,
      roomNo: data.no,
      totalSeat: data.numberOfRow * data.numberOfColumn,
      isActive: data.status,
    }));

    setPageState((old) => ({
      ...old,
      isLoading: false,
      data: dataRow,
      total: res.result.total,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.pageSize, pageState.search]);
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="Room List"
          links={[
            { name: "Dashboard", to: "/" },
            { name: "Theater List", to: "/theaters" },
            { name: "Room List" },
          ]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={handleAddRoomDialog}
        >
          Add Room
        </Button>
      </Stack>

      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
        // initialState={spin}
      ></DataTable>

      {/* Room Detail Dialog */}
      <CustomDialog
        open={isRoomDetailOpen}
        onClose={handleRoomDetail}
        title="Room Detail"
        sx={{ "& .MuiDialog-paper": { width: "900px", height: "90vh" } }}
      />

      {/* Add Room Dialog */}
      <CustomDialog
        open={isAddRoomOpen}
        onClose={handleAddRoomDialog}
        title="Add New Room"
        children={AddRoomDialogContent()}
        sx={{ "& .MuiDialog-paper": { width: "900px", height: "470px" } }}
      />

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

export default TheaterDetail;
