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
import { SearchBar } from "components/header/SearchBar";
import { MdAdd } from "react-icons/md";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import { DataTable, CustomSnackBar, CustomDialog } from "components";
import { useSelector } from "react-redux";
import {
  getTheaterListForManager,
  getTheaterListForAdmin,
  createTheater,
  deleteTheater,
} from "../../services/TheaterService";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const TheaterList = () => {
  const [isAddTheaterDialogOpen, setIsAddTheaterDialogOpen] = useState(false);
  const [isDeleteTheaterDialogOpen, setIsDeleteTheaterDialogOpen] =
    useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [addressParam, setAddressParam] = useState({});
  const companyInfo = useSelector((state) => state.company?.company);
  const userInfo = useSelector((state) => state.auth.auth?.user);
  const navigate = useNavigate();
  const [removedTheaterNamed, setRemovedTheaterNamed] = useState("");
  const [removedTheaterId, setRemovedTheaterId] = useState();
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
        width: 10,
      },
      {
        headerName: "Theater Name",
        field: "name",
        width: 230,
      },
      {
        headerName: "Address",
        field: "address",
        width: 650,
      },
      {
        headerName: "Total Rooms",
        field: "totalRooms",
        type: "number",
        width: 100,
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        sortable: false,
        filterable: false,
        getActions: (params) => [
          <GridActionsCellItem
            sx={{ fontSize: "60px" }}
            icon={<ListAltIcon sx={{ color: "#623CE7" }} />}
            onClick={() => {
              navigate(`${params.row.id}`);
            }}
          />,

          <GridActionsCellItem
            sx={{ fontSize: "60px" }}
            icon={<DeleteIcon sx={{ color: "#FF4842" }} />}
            onClick={() => {
              setRemovedTheaterNamed(params.row.name);
              setRemovedTheaterId(params.row.id);
              handleDeleteTheaterDialog();
            }}
          />,
        ],
      },
    ],
    pageState: pageState,
  };

  const deleteTheaterConfirmContent = () => {
    return (
      <Stack flex={1}>
        <DialogContent>
          Are you sure to delete{" "}
          <span style={{ fontWeight: "600" }}>{removedTheaterNamed}</span> ?
        </DialogContent>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={handleDeleteTheaterDialog}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "error.main",
              "&:hover": { backgroundColor: "error.dark" },
            }}
            type="submit"
            variant="contained"
            autoFocus
            onClick={handleDeleteTheater}
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

  const searchHandler = (searchValue) => {
    setPageState((old) => ({
      ...old,
      search: searchValue.searchTerm,
      page: 1,
    }));
  };

  const handleDeleteTheater = async () => {
    setAlert({});
    const res = await deleteTheater(removedTheaterId);
    if (res.message === "Success") {
      setAlert({
        message: "Delete theater successfully !!!",
        status: true,
        type: "success",
      });

      handleDeleteTheaterDialog();

      await fetchData();
    }
  };

  const handleDeleteTheaterDialog = () => {
    isDeleteTheaterDialogOpen
      ? setIsDeleteTheaterDialogOpen(false)
      : setIsDeleteTheaterDialogOpen(true);
  };

  const handleAddDialog = () => {
    isAddTheaterDialogOpen
      ? setIsAddTheaterDialogOpen(false)
      : setIsAddTheaterDialogOpen(true);
  };

  const fetchData = async () => {
    setPageState((old) => ({ ...old, isLoading: true, data: [] }));

    let res;

    if (userInfo?.Role === "Manager") {
      res = await getTheaterListForManager({
        CompanyId: companyInfo?.id,
        PageSize: pageState.pageSize,
        Page: pageState.page,
        SearchKey: pageState.search,
      });
    }

    if (userInfo?.Role === "Admin") {
      res = await getTheaterListForAdmin({
        PageSize: pageState.pageSize,
        Page: pageState.page,
        SearchKey: pageState.search,
      });
    }

    const dataRow = res.theaters.results.map((data) => ({
      id: data.id,
      name: data.name,
      address: data.address,
      totalRooms: data.totalRoom,
    }));

    setPageState((old) => ({
      ...old,
      isLoading: false,
      data: dataRow,
      total: res.theaters.total,
    }));
  };

  const fetchDistrictData = async (provinceId) => {
    const res = await axios.get(
      `https://provinces.open-api.vn/api/p/${provinceId}?depth=2`
    );
    setDistricts(res.data.districts);
  };

  const fetchWardData = async (districtId) => {
    const res = await axios.get(
      `https://provinces.open-api.vn/api/d/${districtId}?depth=2`
    );
    setWards(res.data.wards);
  };

  const handleAddTheater = async () => {
    setAlert({});
    let address = `${addressParam.theaterAddress}, ${addressParam.wardName}, ${addressParam.districtName}, ${addressParam.provinceName}`;

    const res = await createTheater({
      name: addressParam.theaterName,
      address: address,
    });

    if (res.message === "Success") {
      setAlert({
        message: "Add theater successfully !!!",
        status: true,
        type: "success",
      });

      handleAddDialog();
      await fetchData();
    }
  };

  useEffect(() => {
    const getProvinces = async () => {
      const res = await axios.get("https://provinces.open-api.vn/api/p");
      // setAddressItemList({ provinces: res.data });
      setProvinces(res.data);
    };
    getProvinces();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.pageSize, pageState.search]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="Theater List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Theater List" }]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={handleAddDialog}
        >
          Add Theater
        </Button>
      </Stack>

      <Box
        sx={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SearchBar
          placeholder="Enter theater's name..."
          onSubmit={searchHandler}
        />
      </Box>

      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
        // initialState={spin}
      ></DataTable>

      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
        open={isAddTheaterDialogOpen}
        onClose={handleAddDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Theater</DialogTitle>
        <Divider sx={{ mt: "20px" }} />
        <DialogContent>
          <Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="theaterName"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Theater Name
              </FormLabel>
              <Input
                id="theaterName "
                placeholder="Theater Name"
                onChange={(e) => {
                  setAddressParam({
                    ...addressParam,
                    theaterName: e.target.value,
                  });
                }}
                sx={{ width: "100%" }}
              />
            </Stack>

            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="theaterAddress"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Theater Address
              </FormLabel>
              <Input
                id="theaterAddress"
                placeholder="Theater Address"
                onChange={(e) => {
                  setAddressParam({
                    ...addressParam,
                    theaterAddress: e.target.value,
                  });
                }}
              />
            </Stack>

            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="provinceId"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Province
              </FormLabel>
              <Autocomplete
                freeSolo
                name="provinceId"
                id="provinceId"
                options={provinces}
                value={addressParam?.provinceName}
                getOptionLabel={(option) => option.name || ""}
                onChange={(e, value) => {
                  setAddressParam({
                    ...addressParam,
                    provinceName: value?.name,
                  });
                  fetchDistrictData(value?.code);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Province" />
                )}
              />
            </Stack>

            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="districtId"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                District
              </FormLabel>
              <Autocomplete
                disabled={addressParam?.provinceName ? false : true}
                freeSolo
                name="districtId"
                id="districtId"
                options={districts}
                value={addressParam?.districtName}
                getOptionLabel={(option) => option.name || ""}
                onChange={(e, value) => {
                  setAddressParam({
                    ...addressParam,
                    districtName: value?.name,
                  });
                  fetchWardData(value?.code);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="District" />
                )}
              />
            </Stack>

            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="wardId"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Ward
              </FormLabel>
              <Autocomplete
                freeSolo
                name="wardId"
                id="wardId"
                disabled={
                  addressParam?.districtName && addressParam?.provinceName
                    ? false
                    : true
                }
                options={wards}
                value={addressParam?.wardName}
                getOptionLabel={(option) => option.name || ""}
                onChange={(e, value) => {
                  setAddressParam({
                    ...addressParam,
                    wardName: value?.name,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Ward" />
                )}
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddDialog}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            autoFocus
            onClick={handleAddTheater}
          >
            Add Show Time
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Theater Dialog */}
      <CustomDialog
        open={isDeleteTheaterDialogOpen}
        onClose={handleDeleteTheaterDialog}
        title="Delete Theater Confirmation"
        children={deleteTheaterConfirmContent()}
        sx={{ "& .MuiDialog-paper": { width: "500px", height: "300px" } }}
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

export default TheaterList;
