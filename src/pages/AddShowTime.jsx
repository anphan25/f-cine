import { HeaderBreadcrumbs } from "components";
import React from "react";

const AddShowTime = () => {
  return (
    <>
      <HeaderBreadcrumbs
        heading="New Show Time"
        links={[
          { name: "Dashboard", to: "/" },
          { name: "Show Time List", to: "/show-time" },
          { name: "New Show Time" },
        ]}
      />
    </>
  );
};

export default AddShowTime;
