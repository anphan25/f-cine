import { alpha, Button } from "@mui/material";
import React from "react";

export const CategoryTag = ({ cate }) => {
  return (
    <Button
      size="small"
      variant="outlined"
      sx={{
        margin: "5px 5px 0px 0px",
        border: "none",
        fontSize: "12px",
        color: `${cate.color}`,
        fontWeight: 600,
        backgroundColor: alpha(cate.color, 0.2),
        padding: "2px 8px",
        ":hover": {
          border: "none",
          backgroundColor: alpha(cate.color, 0.2),
        },
      }}
      key={cate.id}
    >
      {cate.name}
    </Button>
  );
};
