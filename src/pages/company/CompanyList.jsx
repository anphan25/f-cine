import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  FormControl,
  FormLabel,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Autocomplete,
  TextField,
} from "@mui/material";
import { SearchBar } from "components/header/SearchBar";
import {
  DataTable,
  CustomSnackBar,
  CustomDialog,
  HeaderBreadcrumbs,
} from "components";
import {
  getCompanyList,
  createCompany,
  blockManager,
} from "services/CompanyService";
import { getCustomers } from "services/UserService";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { GridActionsCellItem } from "@mui/x-data-grid";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { updateRole } from "../../services/RoleService";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const logoUploadStyle = {
  backgroundColor: "#D6D6D6",
  width: "200px",
  height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  ".cover-upload-icon": {
    display: "block",
    color: "primary.main",
    cursor: "pointer",
  },

  ".cover-upload-icon:hover": {
    color: "primary.dark",
  },

  ".label-upload-cover": { display: "none" },

  img: { display: "none", width: "100%", height: "100%", borderRadius: "5px" },
};

const CompanyList = () => {
  const [progress, setProgress] = useState(0);
  const [isAddCompanyDialogOpen, setIsAddCompanyDialogOpen] = useState(false);
  const [isRemoveCompanyDialogOpen, setIsRemoveCompanyDialogOpen] =
    useState(false);
  const [isUnblockCompanyDialogOpen, setIsUnBlockCompanyDialogOpen] =
    useState(false);
  const [isSetManagerDialog, setIsSetManagerDialog] = useState(false);
  const [companyParam, setCompanyParam] = useState({});
  const [removedManagerId, setRemovedManagerId] = useState();
  const [blockCompanyParam, setBlockCompanyParam] = useState({});
  const [mangerParam, setMangerParam] = useState({});
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });

  let filesList = [];
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    search: "",
    page: 1,
    pageSize: 10,
  });

  const gridOptions = {
    columns: [
      {
        headerName: "ID",
        field: "id",
        width: 40,
      },
      {
        headerName: "Logo",
        field: "logo",
        width: 100,
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
                  // border: "1.5px solid #E4E4E4",
                }}
              ></img>
            </div>
          );
        },
      },
      {
        headerName: "Company Name",
        field: "name",
        width: 250,
      },
      {
        headerName: "Manager's Name",
        field: "managerName",
        width: 200,
        valueGetter: ({ value }) => value || "-",
      },
      {
        headerName: "Manager's Email",
        field: "managerEmail",
        width: 350,
        valueGetter: ({ value }) => value || "-",
      },
      {
        headerName: "is Active",
        field: "isActive",
        type: "boolean",
        width: 100,
        // valueGetter: ({ value }) => value || "-",
      },
      {
        hide: true,
        field: "managerId",
        type: "number",
      },
      {
        field: "actions",
        type: "actions",
        width: 70,
        sortable: false,
        filterable: false,

        getActions: (params) => [
          <GridActionsCellItem
            disabled={params.row.managerId ? false : true}
            onClick={() => {
              params.row.isActive
                ? openRemoveCompanyDialog(params.row)
                : openUnblockCompanyDialog(params.row);
            }}
            icon={
              params.row.isActive ? (
                <RemoveCircleIcon sx={{ color: "#FF4842" }} />
              ) : (
                <AddCircleIcon sx={{ color: "#54D62C" }} />
              )
            }
            label={params.row.isActive ? "Block Company" : "Unblock Company"}
            showInMenu
          />,
          <GridActionsCellItem
            onClick={() => {
              openSetManagerDialog(params.row.id);
            }}
            disabled={params.row.managerId ? true : false}
            icon={<PersonAddAlt1Icon sx={{ color: "#6346FA" }} />}
            label="Set Manager"
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

  const openRemoveCompanyDialog = (row) => {
    setRemovedManagerId(row.managerId);

    setBlockCompanyParam((old) => ({ ...old, id: row.id, isActive: false }));

    handleRemoveCompanyDialog();
  };

  const openUnblockCompanyDialog = (row) => {
    setRemovedManagerId(row.managerId);

    setBlockCompanyParam((old) => ({ ...old, id: row.id, isActive: true }));

    handleUnblockCompanyDialog();
  };

  const openSetManagerDialog = async (companyId) => {
    setMangerParam((old) => ({ ...old, companyId }));
    handleSetManagerDialog();
  };

  const handleAddCompanyDialog = () => {
    isAddCompanyDialogOpen
      ? setIsAddCompanyDialogOpen(false)
      : setIsAddCompanyDialogOpen(true);
  };

  const handleRemoveCompanyDialog = () => {
    isRemoveCompanyDialogOpen
      ? setIsRemoveCompanyDialogOpen(false)
      : setIsRemoveCompanyDialogOpen(true);
  };

  const handleUnblockCompanyDialog = () => {
    isUnblockCompanyDialogOpen
      ? setIsUnBlockCompanyDialogOpen(false)
      : setIsUnBlockCompanyDialogOpen(true);
  };

  const handleSetManagerDialog = () => {
    isSetManagerDialog
      ? setIsSetManagerDialog(false)
      : setIsSetManagerDialog(true);
  };

  const uploadImage = (inputFileElement, type) => {
    const filePath = `company-logo/`;

    const file = inputFileElement.files[0];
    const name = file.name;
    const storageRef = ref(storage, `${filePath}/${name}-${uuidv4()}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCompanyParam((pre) => ({ ...pre, logoUrl: downloadURL }));
        });
      }
    );
  };

  const imagePreviewHandler = (files, elementId) => {
    filesList = files;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      const imgCover = document.querySelector(`#${elementId}`);
      imgCover.style.display = "block";
      imgCover.src = reader.result;
    });
    reader.readAsDataURL(filesList[0]);
  };

  const addCompanyContent = () => {
    return (
      <Stack flex={1}>
        <DialogContent>
          <Stack direction="row" spacing={3}>
            <Box sx={logoUploadStyle}>
              <AddPhotoAlternateIcon
                onClick={() => {
                  document.querySelector("#upload-cover-input").click();
                }}
                className="cover-upload-icon"
                sx={{
                  width: "70px",
                  height: "70px",
                  opacity: "70%",
                  display: "none",
                  position: "absolute",
                  zIndex: "100",
                }}
              ></AddPhotoAlternateIcon>
              <img id="img-cover" src="" alt="movie cover" />

              <Input
                id="upload-cover-input"
                type="file"
                sx={{ display: "none" }}
                onChange={(e) => {
                  imagePreviewHandler(e.target.files, "img-cover");
                  uploadImage(
                    document.querySelector("#upload-cover-input"),
                    "cover"
                  );
                }}
              />
            </Box>
            <Stack direction="column" sx={{ width: "300px" }}>
              <Stack direction="column" spacing={1} mb={3}>
                <FormLabel
                  htmlFor="companyName"
                  sx={{
                    fontWeight: "600",
                    color: "neutral.800",
                  }}
                >
                  Company Name
                </FormLabel>
                <Input
                  id="companyName "
                  placeholder="Company Name"
                  onChange={(e) => {
                    setCompanyParam((old) => ({
                      ...old,
                      name: e.target.value,
                    }));
                  }}
                  sx={{ width: "100%" }}
                />
              </Stack>

              {/* <Stack direction="column" spacing={1} mb={3}>
                <FormLabel
                  htmlFor="managerId"
                  sx={{
                    fontWeight: "600",
                    color: "neutral.800",
                  }}
                >
                  User
                </FormLabel>
                <Autocomplete
                  name="managerId"
                  id="managerId"
                  options={users}
                  value={companyParam?.managerId}
                  getOptionLabel={(option) => option.email || ""}
                  onChange={(e, value) => {
                    setMangerParam((old) => ({
                      ...old,
                      userId: value?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="User" />
                  )}
                />
              </Stack> */}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={handleAddCompanyDialog}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            autoFocus
            onClick={addCompany}
          >
            Add
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  const removeCompanyContent = () => {
    return (
      <Stack flex={1}>
        <DialogContent>Are you sure to block this company ?</DialogContent>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={handleRemoveCompanyDialog}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "error.main",
              "&:hover": { backgroundColor: "error.dark" },
            }}
            type="submit"
            variant="contained"
            autoFocus
            onClick={removeCompany}
          >
            Block
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  const unblockCompanyContent = () => {
    return (
      <Stack flex={1}>
        <DialogContent>Are you sure to unblock this company ?</DialogContent>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={handleUnblockCompanyDialog}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "success.main",
              "&:hover": { backgroundColor: "success.dark" },
            }}
            type="submit"
            variant="contained"
            autoFocus
            onClick={unBlockCompanyHandler}
          >
            Unblock
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  const setManagerContent = () => {
    return (
      <Stack flex={1}>
        <DialogContent>
          <FormControl
            fullWidth
            sx={{ marginBottom: "15px", marginTop: "20px" }}
          >
            <FormLabel
              htmlFor="manager"
              sx={{
                fontWeight: "600",
                color: "neutral.800",
                marginBottom: "5px",
              }}
            >
              Select a user to set manager for this company:
            </FormLabel>
            <Autocomplete
              freeSolo
              name="manager"
              id="manager"
              options={users}
              getOptionLabel={(user) => user.email || ""}
              value={mangerParam?.id}
              renderInput={(params) => (
                <TextField {...params} placeholder="User" />
              )}
              onChange={(e, newValue) => {
                setMangerParam((old) => ({ ...old, userId: newValue.id }));
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ marginTop: "auto" }}>
          <Button onClick={handleSetManagerDialog}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            autoFocus
            onClick={setManagerToCompany}
          >
            Apply
          </Button>
        </DialogActions>
      </Stack>
    );
  };

  const addCompany = async () => {
    const res = await createCompany(companyParam);

    if (res.message === "Success") {
      setAlert({
        message: "Add company successfully !!!",
        status: true,
        type: "success",
      });

      handleAddCompanyDialog();
      fetchData();
    }
  };

  const removeCompany = async () => {
    const res = await blockManager(blockCompanyParam);

    if (res.message === "Success") {
      setAlert({
        message: "Block company successfully !!!",
        status: true,
        type: "success",
      });

      handleRemoveCompanyDialog();
      fetchData();
    }
  };

  const unBlockCompanyHandler = async () => {
    const res = await blockManager(blockCompanyParam);

    if (res.message === "Success") {
      setAlert({
        message: "Unblock company successfully !!!",
        status: true,
        type: "success",
      });

      handleUnblockCompanyDialog();
      fetchData();
    }
  };

  const setManagerToCompany = async () => {
    const res = await updateRole(mangerParam);

    if (res.message === "Success") {
      setAlert({
        message: "Set manager successfully !!!",
        status: true,
        type: "success",
      });

      handleSetManagerDialog();
      fetchData();
    }
  };

  const fetchData = async () => {
    setPageState((old) => ({ ...old, isLoading: true, data: [] }));

    const res = await getCompanyList({
      PageSize: pageState.pageSize,
      Page: pageState.page,
      SearchKey: pageState.search,
    });

    const dataRow = res.companies.results.map((data) => ({
      id: data.id,
      logo: data.logoUrl,
      name: data.name,
      managerName: data.managerName,
      managerEmail: data.managerEmail,
      isActive: data.isActive,
      managerId: data.managerId,
    }));

    setPageState((old) => ({
      ...old,
      isLoading: false,
      data: dataRow,
      total: res.companies.total,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.pageSize, pageState.search]);

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await getCustomers();

      setUsers(res.users.results);
    };

    fetchCustomer();
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="Company List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Company List" }]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={handleAddCompanyDialog}
        >
          Add Company
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
          placeholder="Enter company's name..."
          onSubmit={searchHandler}
        />
      </Box>

      {/* Add company dialog */}
      <CustomDialog
        open={isAddCompanyDialogOpen}
        onClose={handleAddCompanyDialog}
        title="Add New Company"
        children={addCompanyContent()}
        sx={{ "& .MuiDialog-paper": { width: "600px", height: "440px" } }}
      ></CustomDialog>

      {/* Remove company dialog */}
      <CustomDialog
        open={isRemoveCompanyDialogOpen}
        onClose={handleRemoveCompanyDialog}
        title="Block Company Confirmation"
        children={removeCompanyContent()}
        sx={{ "& .MuiDialog-paper": { width: "450px", height: "240px" } }}
      ></CustomDialog>

      {/* Unlock company dialog */}
      <CustomDialog
        open={isUnblockCompanyDialogOpen}
        onClose={handleUnblockCompanyDialog}
        title="Unblock Company Confirmation"
        children={unblockCompanyContent()}
        sx={{ "& .MuiDialog-paper": { width: "450px", height: "240px" } }}
      ></CustomDialog>

      {/* set manager dialog */}
      <CustomDialog
        open={isSetManagerDialog}
        onClose={handleSetManagerDialog}
        title="Set Manager to Company"
        children={setManagerContent()}
        sx={{ "& .MuiDialog-paper": { width: "450px", height: "350px" } }}
      ></CustomDialog>

      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      ></DataTable>
    </>
  );
};

export default CompanyList;
