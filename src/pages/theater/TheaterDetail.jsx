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
} from "@mui/material";
import { useParams } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DataTable, CustomSnackBar } from "components";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getRoomsList } from "../../services/RoomService";
import { CustomDialog } from "../../components";

const TheaterDetail = () => {
  const { id } = useParams();
  const [isRoomDetailOpen, setIsRoomDetailOpen] = useState(false);
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
        width: 200,
      },
      {
        headerName: "Total Seat",
        field: "totalSeat",
        type: "number",
        width: 200,
      },
      {
        headerName: "is Active",
        field: "isActive",
        type: "boolean",
        width: 200,
      },

      {
        field: "actions",
        type: "actions",
        width: 200,
        sortable: false,
        filterable: false,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<RemoveRedEyeIcon sx={{ color: "#623CE7" }} />}
            onClick={() => {
              handleRoomDetail();
            }}
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
          // onClick={handleAddDialog}
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

      <CustomDialog
        open={isRoomDetailOpen}
        onClose={handleRoomDetail}
        title="Room Detail"
        sx={{ "& .MuiDialog-paper": { width: "900px", height: "90vh" } }}
      ></CustomDialog>
    </>
  );
};

export default TheaterDetail;
