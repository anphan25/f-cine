import React, { useState, useEffect, useCallback } from "react";
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
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import { DataTable } from "../components/index";

const TheaterList = () => {
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
        headerName: "Company",
        field: "company",
        width: 180,
      },
      {
        headerName: "Address",
        field: "address",
        width: 150,
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

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="Theater List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Theater List" }]}
        />
        <SearchBar
          placeholder="Enter theater's name..."
          onSubmit={searchHandler}
        />
      </Stack>

      <DataTable
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
        // initialState={spin}
      ></DataTable>
    </>
  );
};

export default TheaterList;
