import { Button, Stack } from "@mui/material";
import { DataTable, HeaderBreadcrumbs } from "components";
import { SearchBar } from "components/header/SearchBar";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

const OrderList = () => {
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
        width: 100,
      },
      {
        headerName: "Status",
        field: "status",
        type: "boolean",
        width: 100,
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
            status: true,
            totalEarning: 1000,
          },
          {
            id: 2,
            title: "End game",
            date: "6/8/2022",
            showtime: "18:00",
            theater: "CGV LVV",
            totalTicket: 12,
            status: false,
            totalEarning: 1000,
          },
        ],
        total: 6,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  function searchHandler() {}

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="Order List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Order List" }]}
        />
        <SearchBar placeholder="Enter movie..." onSubmit={searchHandler} />
      </Stack>

      <DataTable
        className="dataGrid-transaction"
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      ></DataTable>
    </>
  );
};

export default OrderList;
