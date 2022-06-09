import { InputAdornment, Input } from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = () => {
  return (
    <Input
      disableUnderline
      startAdornment={
        <InputAdornment position="start">
          <FiSearch
            style={{
              fontSize: 24,
            }}
          />
        </InputAdornment>
      }
      placeholder="Search..."
      sx={{
        height: 48,
        width: 360,
      }}
    />
  );
};
