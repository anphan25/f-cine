import React, { useState } from "react";
import { FormControl, Chip, Input } from "@mui/material";

const useStyles = {
  formControlRoot: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    border: "2px solid lightgray",
    padding: 4,
    borderRadius: "4px",
    "&> div.container": {
      gap: "6px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: "10px",
    },
    "& > div.container > span": {
      padding: "1px 3px",
      borderRadius: "4px",
    },
  },

  ".MuiChip-sizeSmall": {
    backgroundColor: "primary.main",
    color: "neutral.0",
  },

  width: "100%",

  ".MuiChip-deleteIcon": { color: "neutral.0" },
  ".MuiChip-deleteIcon:hover": {
    color: "neutral.400",
    transition: "all 0.5s ease-out",
  },

  ".container": {
    marginBottom: "8px",
  },
};

const CustomMultipleInput = ({ handleGetMultipleValues, placeholder }) => {
  const [values, setValues] = useState([]);
  const [currValue, setCurrValue] = useState("");

  const handleKeyUp = (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
      handleGetMultipleValues(values);
    }
  };

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    setValues(arr);
  };

  return (
    <div className="App">
      <FormControl sx={useStyles}>
        <div className={"container"}>
          {values.map((item, index) => (
            <Chip
              key={index}
              sx={{ marginRight: "5px" }}
              size="small"
              onDelete={() => handleDelete(item, index)}
              label={item}
            />
          ))}
        </div>
        <Input
          value={currValue}
          variant="standard"
          onChange={handleChange}
          onKeyDown={handleKeyUp}
          placeholder={placeholder}
        />
      </FormControl>
    </div>
  );
};

export default CustomMultipleInput;
