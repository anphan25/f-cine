import { AdminDashboard, ManagerDashboard } from "components";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  companyError,
  companyPending,
  setCompany,
} from "redux/company/CompanySlice";
import { getCompanyDetail } from "services/CompanyService";

const Dashboard = () => {
  const userInfo = useSelector((state) => state.auth.auth.user);
  const dispatch = useDispatch();

  const handleGetCompany = useCallback(() => {
    dispatch(companyPending());
    getCompanyDetail()
      .then((response) => {
        console.log(response);
        dispatch(setCompany(response.company));
      })
      .catch((err) => {
        console.log(err);
        dispatch(companyError());
      });
  }, [dispatch]);

  useEffect(() => {
    if (userInfo?.Role === "Manager") {
      handleGetCompany();
    }
  }, [handleGetCompany, userInfo]);
  return (
    <>
      {userInfo?.Role === "Manager" && <ManagerDashboard />}
      {userInfo?.Role === "Admin" && <AdminDashboard />}
    </>
  );
};

export default Dashboard;
