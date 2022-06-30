import React, { useState, useEffect } from "react";
import { Typography, Box, Paper, Stack } from "@mui/material";
import { imgTab1, imgTab2, imgTab3 } from "../../assets/images";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { analysisCompany } from "services/CompanyService";
import { useSelector } from "react-redux";

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

const ManagerDashboard = () => {
  const companyInfo = useSelector((state) => state.company.company);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    console.log("yoo");
    if (companyInfo?.id) {
      const fetchData = () => {
        analysisCompany(companyInfo?.id).then((res) => {
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
    }
  }, [companyInfo]);

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
                  {dashboardData?.percentShowtimeChange}%
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
                  {dashboardData?.percentTicketSoldChange}%
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
                {dashboardData?.totalIncome}
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
                  {dashboardData?.percentIncomeChange}%
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
    </>
  );
};

export default ManagerDashboard;
