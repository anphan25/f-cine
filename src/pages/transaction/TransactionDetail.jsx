import { Button, Stack, Box, Typography, Paper } from "@mui/material";
import { DataTable, HeaderBreadcrumbs } from "components";
import React, { useEffect, useState } from "react";
import { getTransactionDetail } from "../../services/TransactionService";
import { useParams } from "react-router-dom";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

const TransactionDetail = () => {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState({});
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
        width: 100,
      },
      {
        headerName: "Seat Code",
        field: "seatCode",
        width: 250,
      },
      {
        headerName: "Seat Type",
        field: "seatType",
        width: 250,
      },
      {
        headerName: "Ticket Type",
        field: "ticketType",
        width: 250,
      },
      {
        headerName: "Price",
        field: "price",
        width: 250,
        type: "number",
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
      setPageState((old) => ({ ...old, isLoading: true, data: [] }));

      const res = await getTransactionDetail(id);

      setDetailInfo({
        movieTitle: res.result.showtime.movieTitle,
        customerName: res.result.customer.fullName,
        theater: res.result.theaterName,
        showtime: moment(res.result.showtime.startTime).format(
          "DD/MM/yyyy HH:mm"
        ),
        total: res.result.total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      });

      const dataRow = res.result.tickets.map((data) => ({
        id: data.id,
        seatCode: data.seat.name,
        seatType: data.seat.seatType.name,
        ticketType: data.ticketType.name,
        price: data.sellingPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      }));

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: dataRow,
        // total: res.result.total,
      }));
    };
    fetchData();
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="Transaction Detail"
          links={[
            { name: "Dashboard", to: "/" },
            { name: "Transaction", to: "/transactions" },
            { name: "Transaction Detail" },
          ]}
        />
      </Stack>
      <Paper
        elevation={1}
        sx={{ padding: "20px", borderRadius: "10px", marginBottom: "15px" }}
      >
        {Object.keys(detailInfo).length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "216px",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={3}>
            <Typography>
              <span style={{ fontWeight: "600" }}>Customer:</span>{" "}
              {detailInfo.customerName}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "600" }}>Theater:</span>{" "}
              {detailInfo.theater}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "600" }}>Movie:</span>{" "}
              {detailInfo.movieTitle}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "600" }}>Showtime:</span>{" "}
              {detailInfo.showtime}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "600" }}>Total:</span>{" "}
              {detailInfo.total}
            </Typography>
          </Stack>
        )}
      </Paper>

      <DataTable
        className="dataGrid-transaction"
        gridOptions={gridOptions}
        // isPaging={true}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      ></DataTable>
    </>
  );
};

export default TransactionDetail;
