import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { updateRole } from "../services/RoleService";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import { blockManager } from "../services/CompanyService";

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

const roleBackGroundStyle = (role) => {
  switch (role) {
    case "Manager": {
      return "#74CAFF";
    }
    case "Customer": {
      return "#FFE16A";
    }
  }
};

const roleTextStyle = (role) => {
  switch (role) {
    case "Manager": {
      return "#04297A";
    }
    case "Customer": {
      return "#7A4F01";
    }
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [blockedAcc, setBlockedAcc] = useState("");
  const [blockAccParam, setBlockAccParam] = useState({});
  const [companies, setCompanies] = useState([]);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    search: "",
    page: 1,
    pageSize: 10,
  });
  const [editParam, setEditParam] = useState({});

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
            <div>
              <img
                className="avatar-cell"
                src={cellValue.value}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
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
            <Box
              sx={{
                color: `${statusStyle(status.value)}`,
              }}
            >
              {status.value === "Active" ? (
                <CheckCircleOutlineIcon />
              ) : (
                <BlockIcon />
              )}
            </Box>
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
                padding: "4px 8px",
                fontSize: "12px",
                fontWeight: "600",
                color: roleTextStyle(roleValue.value),
                borderRadius: "10px",
                backgroundColor: roleBackGroundStyle(roleValue.value),
              }}
            >
              {roleValue.value}
            </div>
          );
        },
      },

      {
        field: "actions",
        type: "actions",
        width: 80,
        sortable: false,
        filterable: false,
        getActions: (params) => [
          <GridActionsCellItem
            disabled={params.row.role === "Customer" ? false : true}
            icon={<ModeEditIcon sx={{ color: "#623CE7" }} />}
            onClick={() => {
              openEditDialog(params.row);
            }}
            label="Set to Manager"
            showInMenu
          />,

          <GridActionsCellItem
            disabled={params.row.role === "Manager" ? false : true}
            icon={
              params.row.status === "Active" ? (
                <GroupRemoveIcon sx={{ color: "#FF4842" }} />
              ) : (
                <GroupAddIcon sx={{ color: "#54D62C" }} />
              )
            }
            label="Block account"
            onClick={() => {
              openConfirmBlockDialog(params.row);
            }}
            showInMenu
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

  const openEditDialog = (value) => {
    setEditParam({ ...editParam, userId: value.id });
    isDialogOpen ? setIsDialogOpen(false) : setIsDialogOpen(true);
  };

  const openConfirmBlockDialog = (value) => {
    if (value.status) {
      //call api for unban
      return;
    }

    console.log(value);
    setBlockedAcc(value.fullName);
    setBlockAccParam({
      ...blockAccParam,
      id: value.companyId,
      isActive: false,
    });
    isConfirmOpen ? setIsConfirmOpen(false) : setIsConfirmOpen(true);
  };

  const handleUpdate = async () => {
    await updateRole(editParam);

    setIsDialogOpen(false);
    // setPageState((old) => ({ ...old, data: [] }));
  };

  const handleBanAndUnBan = async () => {
    console.log("acc", blockAccParam);
    // await blockManager(blockAccParam);

    setIsDialogOpen(false);
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
        companyId: data.companyId,
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="User List"
          links={[{ name: "Dashboard", to: "/" }, { name: "User List" }]}
        />
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
        <DialogTitle>Set User to Manager</DialogTitle>
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
              <InputLabel id="demo-simple-select-label">Company</InputLabel>
              <Autocomplete
                freeSolo
                options={companies}
                getOptionLabel={(company) => company.name || ""}
                value={editParam?.companyId}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Company" />
                )}
                onChange={(e, newValue) => {
                  console.log(newValue);
                  setEditParam({ ...editParam, companyId: newValue.id });
                }}
              />
            </FormControl>
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
            Are you sure you want to block {blockedAcc}'s account ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button
            onClick={handleBanAndUnBan}
            variant="contained"
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
