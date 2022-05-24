import React from 'react';

export const useAuth = () => {
  const user = {
    role: 'admin',
  };
  return {
    isAuthenticated: true,
    role: user.role,
  };
};
