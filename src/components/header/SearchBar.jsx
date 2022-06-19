import { InputAdornment, Input, FormControl } from "@mui/material";
import React, { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = (props) => {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSearchForm = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 300);
  };
  return (
    <FormControl>
      <Input
        //disableUnderline
        onChange={handleSearchForm}
        value={searchTerm}
        startAdornment={
          <InputAdornment position="start">
            <FiSearch
              style={{
                fontSize: 24,
              }}
            />
          </InputAdornment>
        }
        placeholder={props.placeholder}
        sx={{
          height: 48,
          width: 360,
          backgroundColor: "neutral.0",
          border: "1px solid #E4E4E4",
        }}
      />
    </FormControl>
  );
};
