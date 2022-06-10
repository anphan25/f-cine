import { InputAdornment, Input } from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = (props) => {
  return (
    <Input
      //disableUnderline
      startAdornment={
        <InputAdornment position="start">
          <FiSearch
            style={{
              fontSize: 24,
            }}
          />
        </InputAdornment>
      }
      placeholder={`Enter ${props.target}...`}
      sx={{
        height: 48,
        width: 360,
        backgroundColor: "neutral.0",
        border: "1px solid #E4E4E4",
      }}
    />
  );
};
