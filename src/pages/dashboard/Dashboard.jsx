import { AdminDashboard, ManagerDashboard } from "components";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userInfo = useSelector((state) => state.auth.auth.user);

  return (
    <>
      {userInfo?.Role === "Manager" && <ManagerDashboard />}
      {userInfo?.Role === "Admin" && <AdminDashboard />}
    </>
  );
};

export default Dashboard;
