import React from 'react';
import { Outlet } from 'react-router-dom';

export const MessageLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
