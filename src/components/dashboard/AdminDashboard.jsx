import React, { useState, useEffect } from "react";
import { Typography, Box, Paper, Stack, Select, MenuItem } from "@mui/material";
import { imgTab1, imgTab2, imgTab3 } from "../../assets/images";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { getDataChart, getDataDashboard } from "services/AnalystService";
import Chart from "react-apexcharts";

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

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [year, setYear] = useState(2022);
  const [incomes, setIncomes] = useState([]);
  const [months, setMonths] = useState([]);

  const options = {
    chart: { height: 350, type: "line" },
    colors: ["#6346FA"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      type: "string",
      categories: months,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        },
      },
    },
  };

  const convertMonth = (month) => {
    switch (month) {
      case 1: {
        return "Jan";
      }
      case 2: {
        return "Feb";
      }
      case 3: {
        return "Mar";
      }
      case 4: {
        return "Apr";
      }
      case 5: {
        return "May";
      }
      case 6: {
        return "Jun";
      }
      case 7: {
        return "Jul";
      }
      case 8: {
        return "Aug";
      }
      case 9: {
        return "Sep";
      }
      case 10: {
        return "Oct";
      }
      case 11: {
        return "Nov";
      }
      case 12: {
        return "Dec";
      }
    }
  };

  const series = [{ name: "Total Incomes", data: incomes }];

  const handelChooseYear = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    const fetchData = () => {
      getDataDashboard().then((res) => {
        setDashboardData((dashboardData) => ({
          ...dashboardData,
          totalShowtimeQuantity: res.showtimeDashboard.totalShowtimeQuantity,
          percentShowtimeChange: res.showtimeDashboard.percentShowtimeChange,
          isShowtimeUpOrDown: res.showtimeDashboard.isShowtimeUpOrDown,
          totalTicketSoldQuantity:
            res.ticketSoldDashboard.totalTicketSoldQuantity,
          percentTicketSoldChange:
            res.ticketSoldDashboard.percentTicketSoldChange,
          isTicketSoldUpOrDown: res.ticketSoldDashboard.isTicketSoldUpOrDown,
          totalIncome: res.incomeDashboard.totalIncome,
          percentIncomeChange: res.incomeDashboard.percentIncomeChange,
          isIncomeUpOrDown: res.incomeDashboard.isIncomeUpOrDown,
        }));
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataChart = async () => {
      const res = await getDataChart({
        year: year,
      });

      setMonths(res.result.map((e) => convertMonth(e.month)));
      setIncomes(res.result.map((e) => e.income));
    };

    fetchDataChart();
  }, [year]);

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
                {dashboardData?.totalShowtimeQuantity}
              </Typography>
              <Typography className="info-tab_desc">
                Weekly show time
              </Typography>
              <Box className="info-tab_percentage">
                <Box
                  className={`info-tab_percentage_number ${
                    dashboardData?.isShowtimeUpOrDown
                      ? "up-style"
                      : "down-style"
                  }`}
                >
                  {dashboardData?.isShowtimeUpOrDown ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}{" "}
                  {dashboardData?.percentShowtimeChange?.toFixed(2)}%
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
                {dashboardData?.totalTicketSoldQuantity}
              </Typography>
              <Typography className="info-tab_desc">
                Weekly tickets sold
              </Typography>
              <Box className="info-tab_percentage">
                <Box
                  className={`info-tab_percentage_number ${
                    dashboardData?.isTicketSoldUpOrDown
                      ? "up-style"
                      : "down-style"
                  }`}
                >
                  {dashboardData?.isTicketSoldUpOrDown ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}{" "}
                  {dashboardData?.percentTicketSoldChange?.toFixed(2)}%
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
                {dashboardData?.totalIncome?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
              <Typography className="info-tab_desc">Weekly income</Typography>
              <Box className="info-tab_percentage">
                <Box
                  className={`info-tab_percentage_number ${
                    dashboardData?.isIncomeUpOrDown ? "up-style" : "down-style"
                  }`}
                >
                  {dashboardData?.isIncomeUpOrDown ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}{" "}
                  {dashboardData?.percentIncomeChange?.toFixed(2)}%
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

      <Paper elevation={2} sx={{ marginTop: "20px", padding: "20px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ marginBottom: "20px" }}
        >
          <Typography variant="h4">Total Earning</Typography>
          <Select
            value={year}
            label="Year"
            onChange={handelChooseYear}
            defaultValue={year}
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
          </Select>
        </Stack>
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height={500}
        />
      </Paper>
    </>
  );
};

export default AdminDashboard;
