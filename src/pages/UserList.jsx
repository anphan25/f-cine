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
  IconButton,
} from "@mui/material";
import { SearchBar } from "../components/header/SearchBar";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DataTable } from "../components/index";
import { getUserList } from "../services/UserService";
import { getCompanyListWithoutManger } from "../services/CompanyService";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BlockIcon from "@mui/icons-material/Block";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CheckIcon from "@mui/icons-material/Check";

const AvtStyle = {
  width: 45,
  height: 45,
  objectFit: "cover",
  borderRadius: "50%",
  border: "1.5px solid #E4E4E4",
};

const statusStyle = (status) => {
  switch (status) {
    case "Active": {
      return "#229A16";
    }
    case "Block": {
      return "#B72136";
    }
  }
};

const roleStyle = (role) => {
  switch (role) {
    case "Manager": {
      return "#0068FF";
    }
    case "Customer": {
      return "#FFC107";
    }
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [role, setRole] = useState("");
  const [companies, setCompanies] = useState([]);
  const [companyValue, setCompanyValue] = useState(null);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    search: "",
    page: 1,
    pageSize: 10,
  });
  const [editParam, setEditParam] = useState({});
  // const [searchKey, setSearchKey] = useState("");

  const gridOptions = {
    columns: [
      {
        headerName: "ID",
        field: "id",
        width: 30,
      },
      {
        headerName: "Avatar",
        field: "avatar",
        width: 70,
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
                  // border: "1.5px solid #E4E4E4",
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
        renderCell: (nameValue) => {
          return (
            <div
              style={{
                fontWeight: "500",
              }}
            >
              {nameValue.value}
            </div>
          );
        },
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
        headerName: "Status",
        field: "status",
        type: "string",
        width: 120,
        renderCell: (status) => {
          return (
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                padding: "3px 8px",
                color: statusStyle(status.value),
                borderRadius: "50px",
                border: ` 1px solid ${statusStyle(status.value)}`,
              }}
            >
              {status === "Active" ? <CheckIcon /> : ""}
              <CheckIcon />
              <Typography>{status.value}</Typography>
            </Stack>
          );
        },
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
            icon={
              <ModeEditIcon
                sx={{ color: "#623CE7" }}
                //onClick={openConfirmBlockDialog}
              />
            }
            onClick={() => {
              console.log(params.row.role);
              openConfirmBlockDialog(params.row.role);
            }}
            label="Edit"
          />,

          // {params.row.role === "Manager"}
          <GridActionsCellItem
            icon={
              <BlockIcon
                sx={{ color: "#FF4842" }}
                onClick={openConfirmBlockDialog}
              />
            }
            label="Ban"
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
    setPageState((old) => ({
      ...old,
      search: searchValue.searchTerm,
      page: 1,
    }));
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleCloseConfirmDialog = () => {
    setIsConfirmOpen(false);
  };

  const openEditDialog = (id) => {
    isDialogOpen ? setIsDialogOpen(false) : setIsDialogOpen(true);
  };

  const openConfirmBlockDialog = (value) => {
    console.log(value);
    isConfirmOpen ? setIsConfirmOpen(false) : setIsConfirmOpen(true);
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
        Email: pageState.search,
      });

      const dataRow = res.users.results.map((data) => ({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        avatar: data.pictureUrl,
        company: data.company?.name,
        role: data.role.name,
        status: data.statusName,
      }));

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: dataRow,
        total: res.users.total,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize, pageState.search]);

  useEffect(() => {
    const fetchCompaniesData = async () => {
      const res = await getCompanyListWithoutManger();

      setCompanies(res.result);
    };
    fetchCompaniesData();
  }, []);

  const spin = {
    left: ["id", "avatar"],
  };
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
        // initialState={spin}
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
        <DialogTitle>Edit User</DialogTitle>
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
                getOptionLabel={(company) => company.name || ""}
                value={editParam?.companyId}
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

      {/* Block Dialog */}
      <Dialog
        open={isConfirmOpen}
        TransitionComponent={Transition}
        keepMounted
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
        onClose={handleCloseConfirmDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Block User</DialogTitle>
        <DialogContent sx={{ marginTop: "20px" }}>
          <DialogContentText>
            Are you sure you want to block this manager's account ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: "#FF4842",
              "&:hover": { backgroundColor: "#B72136" },
            }}
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserList;
