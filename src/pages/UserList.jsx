import React, { useState, useEffect } from "react";
import { Typography, styled, Box, Paper, Stack } from "@mui/material";
import { SearchBar } from "../components/header/SearchBar";
import { DataTable } from "../components/index";
import {
  getDataGrid,
  getDataGridWithSearch,
} from "../services/DataGridService";

const pageStyle = {
  width: "100%",
  padding: "20px",
  borderRadius: "10px",
};
const AvtStyle = {
  width: 45,
  height: 45,

  "& .img": {
    width: "100%",
    height: "100%",
    borderRadius: "50px",
    border: "1.5px solid #E4E4E4",
  },
};

const UserList = () => {
  const [isSearch, setIsSearch] = useState(false);
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
        renderCell: (cellValue) => {
          return (
            <div style={AvtStyle}>
              <img
                src={cellValue.value}
                style={{ width: "100%", height: "100%" }}
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
      },

      {
        headerName: "Role",
        field: "role",
        width: 80,
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
    </>
  );
};

export default UserList;
