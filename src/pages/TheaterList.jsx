import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  styled,
  Box,
  Divider,
  Stack,
  Button,
  Select,
  FormControl,
  FormLabel,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Input,
} from "@mui/material";
import { SearchBar } from "../components/header/SearchBar";
import { MdAdd } from "react-icons/md";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import { DataTable } from "../components/index";

const TheaterList = () => {
  const [isAddTheaterDialogOpen, setIsAddTheaterDialogOpen] = useState(false);
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
        width: 30,
      },
      {
        headerName: "Theater Name",
        field: "name",
        width: 250,
      },
      {
        headerName: "Address",
        field: "address",
        width: 450,
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

  const handleAddDialog = () => {
    isAddTheaterDialogOpen
      ? setIsAddTheaterDialogOpen(false)
      : setIsAddTheaterDialogOpen(true);
  };

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
          sx={{ width: "200px", height: "40px" }}
          onClick={handleAddDialog}
        >
          New Theater
        </Button>
      </Stack>

      <Box sx={{ marginBottom: "10px" }}>
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
        <DialogTitle id="alert-dialog-title">Add Show Time</DialogTitle>
        <Divider sx={{ mt: "20px" }} />
        <DialogContent>
          <FormControl>
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
              <Input id="theaterAddress" placeholder="Theater Address" />
            </Stack>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddDialog}>Cancel</Button>
          <Button type="submit" variant="contained" autoFocus>
            Add Show Time
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TheaterList;
