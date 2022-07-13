import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Button,
  FormLabel,
  DialogActions,
  DialogContent,
  Input,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DataTable, CustomSnackBar } from "components";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getRoomsList, deleteRoom } from "../../services/RoomService";
import { CustomDialog } from "../../components";
import { addRoom } from "../../services/RoomService";
import DeleteIcon from "@mui/icons-material/Delete";

const TheaterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [addRoomParam, setAddRoomParam] = useState({ theaterId: id });
  const [isDeleteRoomDialogOpen, setIsDeleteRoomDialogOpen] = useState(false);
  const [removedRoomNamed, setRemovedRoomNamed] = useState("");
  const [removedRoomId, setRemovedRoomId] = useState();
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
        width: 100,
      },
      {
        headerName: "Room No",
        field: "roomNo",
        type: "number",
        width: 330,
      },
      {
        headerName: "Total Seat",
        field: "totalSeat",
        type: "number",
        width: 330,
      },
      // {
      //   headerName: "Status",
      //   field: "isActive",
      //   type: "boolean",
      //   width: 300,
      // },

      {
        field: "actions",
        type: "actions",
        width: 330,
        sortable: false,
        filterable: false,
        align: "right",
        getActions: (params) => [
          //Room Detail
          <GridActionsCellItem
            icon={<RemoveRedEyeIcon sx={{ color: "#623CE7" }} />}
            onClick={() => {
              navigate(`room/${params.row.id}`);
            }}
          />,

          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: "#FF4842" }} />}
            onClick={() => {
              setRemovedRoomNamed(params.row.roomNo);
              setRemovedRoomId(params.row.id);
              handleDeleteRoomDialog();
            }}
          />,
        ],
      },
    ],
    pageState: pageState,
  };

  const deleteRoomConfirmContent = () => {
    return (
      <Stack flex={1}>
        <DialogContent>
          Are you sure to delete room no:{" "}
          <span style={{ fontWeight: "600" }}>{removedRoomNamed}</span> ?
        </DialogContent>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={handleDeleteRoomDialog}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "error.main",
              "&:hover": { backgroundColor: "error.dark" },
            }}
            type="submit"
            variant="contained"
            autoFocus
            onClick={handleDeleteRoom}
          >
            Delete
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  const pageChangeHandler = (newPage) => {
    setPageState((old) => ({ ...old, page: newPage + 1 }));
  };

  const pageSizeChangeHandler = (newPageSize) => {
    setPageState((old) => ({ ...old, pageSize: newPageSize }));
  };

  const handleAddRoomDialog = () => {
    isAddRoomOpen ? setIsAddRoomOpen(false) : setIsAddRoomOpen(true);
  };

  const handleAddRoom = async () => {
    try {
      setAlert({});
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
    } catch (err) {
      if (err.response.status === 400) {
        handleAddRoomDialog();
        setAlert({
          message: "This theater's Room No is existed",
          status: true,
          type: "error",
        });
      }
    }
  };

  const handleDeleteRoom = async () => {
    setAlert({});
    const res = await deleteRoom(removedRoomId);
    if (res.message === "Success") {
      setAlert({
        message: "Delete room successfully !!!",
        status: true,
        type: "success",
      });

      handleDeleteRoomDialog();

      await fetchData();
    }
  };

  const handleDeleteRoomDialog = () => {
    isDeleteRoomDialogOpen
      ? setIsDeleteRoomDialogOpen(false)
      : setIsDeleteRoomDialogOpen(true);
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
                htmlFor="numberRow"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Number Row
              </FormLabel>
              <Input
                id="numberRow"
                placeholder="Number Row"
                onChange={(e) => {
                  setAddRoomParam({
                    ...addRoomParam,
                    numberOfRow: e.target.value,
                  });
                }}
                sx={{ width: "100%" }}
              />
            </Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="numberColumn"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Number Column
              </FormLabel>
              <Input
                id="numberColumn"
                placeholder="Number Column"
                onChange={(e) => {
                  setAddRoomParam({
                    ...addRoomParam,
                    numberOfColumn: e.target.value,
                  });
                }}
                sx={{ width: "100%" }}
              />
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

  const fetchData = useCallback(async () => {
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
  }, [id, pageState.page, pageState.pageSize, pageState.search]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageState.page, pageState.pageSize, pageState.search]);
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
      ></DataTable>

      {/* Add Room Dialog */}
      <CustomDialog
        open={isAddRoomOpen}
        onClose={handleAddRoomDialog}
        title="Add New Room"
        children={AddRoomDialogContent()}
        sx={{ "& .MuiDialog-paper": { width: "400px", height: "470px" } }}
      />

      {/* Delete Room Dialog */}
      <CustomDialog
        open={isDeleteRoomDialogOpen}
        onClose={handleDeleteRoomDialog}
        title="Delete Room Confirmation"
        children={deleteRoomConfirmContent()}
        sx={{ "& .MuiDialog-paper": { width: "500px", height: "250px" } }}
      ></CustomDialog>

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
