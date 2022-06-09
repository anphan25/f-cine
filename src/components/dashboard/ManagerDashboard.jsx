import React, { useState, useEffect } from "react";
import { Typography, styled, Box, Paper, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { imgTab1, imgTab2, imgTab3 } from "../../assets/images";
import { DataTable } from "components";
import { getDataGrid } from "../../services/DataGridService";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const tabStyle = {
  padding: "20px",
  width: "32%",
  borderRadius: "10px",

  "& .info-tab_left": {
    marginRight: "40px",
  },
  "& .info-tab_number": { marginBottom: "10px", marginTop: "10px" },
  "& .info-tab_percentage": {
    display: "flex",
    alignItems: "center",
  },

  "& .info-tab_percentage_number": {
    display: "flex",
    alignItems: "center",

    marginRight: "5px",
  },

  "& .info-tab_right img": {
    width: "130px",
  },
  "& .info-tab_desc": { color: "neutral.700", marginBottom: "5px" },

  "& .up-style": { color: "success.main" },
  "& .down-style": { color: "error.main" },
};

const transactionStyle = {
  width: "100%",
  marginTop: "30px",
  padding: "20px",
  borderRadius: "10px",

  "& .dataGrid-transaction": {
    height: "550px",
  },

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#F4F6F8",
    color: "#6A7079",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
};

const ManagerDashboard = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [
      {
        id: 1,
        title: "End game",
        date: "6/8/2022",
        showtime: "18:00",
        theater: "CGV LVV",
        totalTicket: 12,
        totalEarning: 1000,
      },
    ],
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
        headerName: "Movie",
        field: "title",
        width: 270,
      },
      {
        headerName: "Date",
        field: "date",
        width: 140,
      },
      {
        headerName: "Showtime",
        field: "showtime",
        width: 140,
      },
      {
        headerName: "Theater",
        field: "theater",
        width: 200,
      },
      {
        headerName: "Total Ticket",
        field: "totalTicket",
        width: 140,
      },
      {
        headerName: "Earning",
        field: "totalEarning",
        width: 140,
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
            title: "End game",
            date: "6/8/2022",
            showtime: "18:00",
            theater: "CGV LVV",
            totalTicket: 12,
            totalEarning: 1000,
          },
          {
            id: 2,
            title: "End game",
            date: "6/8/2022",
            showtime: "18:00",
            theater: "CGV LVV",
            totalTicket: 12,
            totalEarning: 1000,
          },
          {
            id: 3,
            title: "End game",
            date: "6/8/2022",
            showtime: "18:00",
            theater: "CGV LVV",
            totalTicket: 12,
            totalEarning: 1000,
          },
          {
            id: 4,
            title: "Start game",
            date: "6/8/2022",
            showtime: "18:00",
            theater: "CGV LVV",
            totalTicket: 12,
            totalEarning: 1000,
          },
          {
            id: 5,
            title: "Start game",
            date: "6/8/2022",
            showtime: "18:00",
            theater: "CGV LVV",
            totalTicket: 12,
            totalEarning: 1000,
          },
          {
            id: 6,
            title: "Start game",
            date: "6/8/2022",
            showtime: "18:00",
            theater: "CGV LVV",
            totalTicket: 12,
            totalEarning: 1000,
          },
        ],
        total: 6,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Dashboard
      </Typography>
      <Stack
        className="statistical-section"
        direction="row"
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        <Paper elevation={2} sx={tabStyle}>
          <Stack direction="row" justifyContent="space-evenly">
            <Box className="info-tab_left">
              <Typography variant="h3" className="info-tab_number">
                714K
              </Typography>
              <Typography className="info-tab_desc">
                Weekly show time
              </Typography>
              <Box className="info-tab_percentage">
                <Box className="info-tab_percentage_number up-style">
                  <ArrowUpwardIcon /> 31%
                </Box>
                <Typography fontWeight="600" sx={{ color: "neutral.700" }}>
                  this week
                </Typography>
              </Box>
            </Box>
            <Box className="info-tab_right">
              <img src={imgTab1} alt="img-tab-1"></img>
            </Box>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={tabStyle}>
          <Stack direction="row" justifyContent="space-evenly">
            <Box className="info-tab_left">
              <Typography variant="h3" className="info-tab_number">
                714K
              </Typography>
              <Typography className="info-tab_desc">
                Weekly tickets sold
              </Typography>
              <Box className="info-tab_percentage">
                <Box className="info-tab_percentage_number up-style">
                  <ArrowUpwardIcon /> 31%
                </Box>
                <Typography fontWeight="600" sx={{ color: "neutral.700" }}>
                  this week
                </Typography>
              </Box>
            </Box>
            <Box className="info-tab_right">
              <img src={imgTab2} alt="img-tab-1"></img>
            </Box>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={tabStyle}>
          <Stack direction="row" justifyContent="space-evenly">
            <Box className="info-tab_left">
              <Typography variant="h3" className="info-tab_number">
                714K
              </Typography>
              <Typography className="info-tab_desc">Weekly income</Typography>
              <Box className="info-tab_percentage">
                <Box className="info-tab_percentage_number down-style">
                  <ArrowDownwardIcon /> 50%
                </Box>
                <Typography fontWeight="600" sx={{ color: "neutral.700" }}>
                  this week
                </Typography>
              </Box>
            </Box>
            <Box className="info-tab_right">
              <img src={imgTab3} alt="img-tab-1"></img>
            </Box>
          </Stack>
        </Paper>
      </Stack>
      <Paper
        elevation={1}
        className="transaction-section"
        sx={transactionStyle}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Transactions
        </Typography>
        <DataTable
          className="dataGrid-transaction"
          gridOptions={gridOptions}
          onPageChange={pageChangeHandler}
          onPageSizeChange={pageSizeChangeHandler}
        ></DataTable>
      </Paper>
    </>
  );
};

export default ManagerDashboard;
