import { Button, Stack, Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DataTable, HeaderBreadcrumbs } from "components";
import { SearchBar } from "components/header/SearchBar";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import InfoIcon from "@mui/icons-material/Info";
import { getTransaction } from "../../services/TransactionService";
import moment from "moment";

const statusStyle = (status) => {
  switch (status) {
    case "Successful": {
      return "#229A16";
    }
    case "Pending": {
      return "#FFC107";
    }

    case "Failed": {
      return "#B72136";
    }

    case "Cancelled": {
      return "#9A9FA5";
    }
  }
};

const TransactionList = () => {
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
        hide: true,
        width: 80,
      },
      {
        headerName: "Customer",
        field: "customer",
        width: 250,
      },
      {
        headerName: "Movie",
        field: "title",
        width: 270,
      },
      {
        headerName: "Purchased Date",
        field: "purchasedDate",
        width: 150,
      },
      {
        headerName: "Theater",
        field: "theater",
        width: 200,
      },
      {
        headerName: "Status",
        field: "status",
        type: "string",
        width: 100,
        renderCell: (status) => {
          return (
            <div
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#FFFFFF",
                borderRadius: "10px",
                backgroundColor: statusStyle(status.value),
              }}
            >
              {status.value}
            </div>
          );
        },
      },
      {
        headerName: "Earning",
        field: "totalEarning",
        width: 90,
      },
      {
        field: "actions",
        type: "actions",
        width: 50,
        sortable: false,
        filterable: false,
        getActions: (params) => [
          <GridActionsCellItem
            sx={{ fontSize: "60px" }}
            icon={<InfoIcon sx={{ color: "#623CE7" }} />}
            onClick={() => {}}
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

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true, data: [] }));

      const res = await getTransaction({
        PageSize: pageState.pageSize,
        Page: pageState.page,
      });

      const dataRow = res.result.results.map((data) => ({
        id: data.id,
        customer: data.customer.fullName,
        title: data.showtime.movieTitle,
        purchasedDate: moment(data.purchasedDate).format("DD/MM/yyyy HH:mm"),
        theater: data.theaterName,
        status: data.statusName,
        totalEarning: data.total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      }));

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: dataRow,
        total: res.result.total,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  function searchHandler() {}

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadcrumbs
          heading="Transaction"
          links={[{ name: "Dashboard", to: "/" }, { name: "Transaction" }]}
        />
        <SearchBar placeholder="Enter movie..." onSubmit={searchHandler} />
      </Stack>

      <DataTable
        initialState={{ pinnedColumns: { left: ["id"] } }}
        className="dataGrid-transaction"
        gridOptions={gridOptions}
        onPageChange={pageChangeHandler}
        onPageSizeChange={pageSizeChangeHandler}
      ></DataTable>
    </>
  );
};

export default TransactionList;
