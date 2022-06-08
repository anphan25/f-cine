import { AdminDashboard, ManagerDashboard } from 'components';
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { Role } = useSelector((state) => state.auth.auth.user);
  return (
    <>
      {Role === 'Manager' && <ManagerDashboard />}
      {Role === 'Admin' && <AdminDashboard />}
    </>
  );
};

export default Dashboard;
