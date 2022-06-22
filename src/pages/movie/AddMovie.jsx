import { Stack } from "@mui/material";
import { HeaderBreadcrumbs } from "components";
import React from "react";

const AddMovie = () => {
  return (
    <>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <HeaderBreadcrumbs
          heading="Movie List"
          links={[
            { name: "Dashboard", to: "/" },
            { name: "Movie List", to: "/movies" },
            { name: "Add Movie" },
          ]}
        />
      </Stack>
    </>
  );
};

export default AddMovie;
