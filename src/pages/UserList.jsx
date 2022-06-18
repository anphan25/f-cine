import React, { useState, useEffect } from "react";
import {
  Typography,
  styled,
  Box,
  Paper,
  Stack,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";
import { SearchBar } from "../components/header/SearchBar";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DataTable } from "../components/index";
import { getUserList } from "../services/UserService";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const pageStyle = {
  width: "100%",
  padding: "20px",
  borderRadius: "10px",
};
const AvtStyle = {
  width: 45,
  height: 45,
};

const roleStyle = (role) => {
  switch (role) {
    case "Admin": {
      return "#0068FF";
    }
    case "Manager": {
      return "#FFC107";
    }
    case "Customer": {
      return "#54D62C";
    }
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [role, setRole] = useState("");
  const [companies, setCompanies] = useState([
    { companyId: 1, companyName: "CGV" },
    { companyId: 2, companyName: "Galaxy" },
    { companyId: 3, companyName: "HBO" },
    { companyId: 4, companyName: "Starlight" },
  ]);
  const [companyValue, setCompanyValue] = useState(null);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [searchKey, setSearchKey] = useState("");

  const gridOptions = {
    columns: [
      {
        headerName: "ID",
        field: "id",
        width: 80,
      },
      {
        headerName: "Avatar",
        field: "avatar",
        width: 100,
        sortable: false,
        filterable: false,
        renderCell: (cellValue) => {
          return (
            <div style={AvtStyle}>
              <img
                className="avatar-cell"
                src={cellValue.value}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50px",
                  border: "1.5px solid #E4E4E4",
                }}
              ></img>
            </div>
          );
        },
      },
      {
        headerName: "Full Name",
        field: "fullName",
        width: 280,
      },
      {
        headerName: "Email",
        field: "email",
        width: 250,
      },
      {
        headerName: "Company",
        field: "company",
        width: 150,
        valueGetter: ({ value }) => value || "-",
      },

      {
        headerName: "Role",
        field: "role",
        type: "string",
        width: 120,
        renderCell: (roleValue) => {
          return (
            <div
              style={{
                padding: "5px 10px",
                color: "#FFFF",
                borderRadius: "50px",
                backgroundColor: roleStyle(roleValue.value),
              }}
            >
              {roleValue.value}
            </div>
          );
        },
      },
      {
        headerName: "Actions",
        field: "actions",
        type: "actions",
        width: 80,
        sortable: false,
        filterable: false,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<ModeEditIcon onClick={openEditDialog} />}
            label="Delete"
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

  const searchHandler = (searchValue) => {
    setPageState({ ...pageState, search: searchValue.searchTerm, page: 1 });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const openEditDialog = (id) => {
    isDialogOpen ? setIsDialogOpen(false) : setIsDialogOpen(true);
  };

  const handleUpdate = () => {};

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true, data: [] }));

      const res = await getUserList({
        PageSize: pageState.pageSize,
        Page: pageState.page,
      });

      const dataRow = res.users.results.map((data) => ({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        avatar: data.pictureUrl,
        company: data.company?.name,
        role: data.role.name,
      }));

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: dataRow,
        total: res.users.total,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true, data: [] }));

      const res = await getUserList({
        PageSize: pageState.pageSize,
        Page: pageState.page,
        SearchKey: pageState.search,
      });

      const dataRow = res.users.results.map((data) => ({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        avatar: data.pictureUrl,
        company: data.company?.name,
        role: data.role.name,
      }));

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: dataRow,
        total: res.users.total,
      }));
    };

    fetchData();
  }, [pageState.search]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          User Management
        </Typography>
        <SearchBar placeholder="Enter email..." onSubmit={searchHandler} />
      </Stack>

      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      ></DataTable>

      {/* Edit Dialog */}
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              minWidth: 120,
              "& .demo-simple-select-label": { marginBottom: "50px" },
            }}
          >
            <FormControl
              fullWidth
              sx={{ marginBottom: "15px", marginTop: "20px" }}
            >
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                placeholder="Role"
                onChange={handleChangeRole}
              >
                <MenuItem value={2}>Manager</MenuItem>
                <MenuItem value={3}>Users</MenuItem>
              </Select>
            </FormControl>
            {role === 2 && (
              <Autocomplete
                freeSolo
                options={companies}
                getOptionLabel={(company) => company.companyName}
                value={companyValue}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Company" />
                )}
                onChange={(e, newValue) => {
                  setCompanyValue(newValue);
                }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserList;
