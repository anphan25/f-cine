import React from "react";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const transactionStyle = {
  width: "100%",
  height: "650px",
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
  const columns = [
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
      field: "total",
      width: 140,
    },
  ];

  const rows = [];

  return (
    <>
      <Paper
        elevation={1}
        className="transaction-section"
        sx={transactionStyle}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Transactions
        </Typography>
        <DataGrid
          className="dataGrid-transaction"
          columns={columns}
          rows={rows}
          pagination
          page={1}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
        ></DataGrid>
      </Paper>
    </>
  );
};

export default ManagerDashboard;
