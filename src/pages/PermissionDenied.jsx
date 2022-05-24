import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

const PermissionDenied = () => {
  return (
    <Alert severity="error">
      <AlertTitle>Permission Denied</AlertTitle>
      You do not have permission to access this page
    </Alert>
  );
};

export default PermissionDenied;
