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
import {
  getDataGrid,
  getDataGridWithSearch,
} from "../services/DataGridService";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserList = () => {
  const [isSearch, setIsSearch] = useState(false);
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
        headerName: "Name",
        field: "name",
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
        width: 80,
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

  const searchHandler = (e) => {
    //Gọi api here
    getDataGridWithSearch();
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
      // setPageState((old) => ({ ...old, isLoading: true }));

      // const res = await getDataGrid();

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: [
          {
            id: 1,
            avatar:
              "https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg",
            name: "Naruto",
            email: "naruto@gmail.com",
            company: null,
            role: "Hokage",
          },
          {
            id: 2,
            avatar:
              "https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg",
            name: "Naruto",
            email: "naruto@gmail.com",
            company: "Lang La",
            role: "Hokage",
          },
          {
            id: 3,
            avatar:
              "https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg",
            name: "Naruto",
            email: "naruto@gmail.com",
            company: "Lang La",
            role: "Hokage",
          },
        ],
        total: 1,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  useEffect(() => {
    if (isSearch) {
      getDataGridWithSearch("api/v2/users", 1, "searchValue");
    }
  }, [isSearch]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          User Management
        </Typography>
        <SearchBar target="Email" />
      </Stack>
      <Paper elevation={2} sx={pageStyle}>
        <DataTable
          gridOptions={gridOptions}
          onPageChange={pageChangeHandler}
          onPageSizeChange={pageSizeChangeHandler}
        ></DataTable>
      </Paper>

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
                  <TextField {...params} placeholder="Theater" />
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
