import { Button } from "@mui/material";
import HeaderBreadcrumbs from "components/header/HeaderBreadcrumbs";
import React from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const ShowTimeList = () => {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Show Time List"
        links={[{ name: "Dashboard", to: "/" }, { name: "Show Time List" }]}
        action={
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            component={Link}
            to="add"
          >
            New Show Time
          </Button>
        }
      />
    </>
  );
};

export default ShowTimeList;
