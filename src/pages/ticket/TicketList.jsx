import { Button, Stack } from "@mui/material";
import { HeaderBreadcrumbs } from "components";
import React from "react";
import { MdAdd } from "react-icons/md";

const TicketList = () => {
  return (
    <>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <HeaderBreadcrumbs
          heading="Ticket List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Ticket List" }]}
        />
        <Button variant="contained" startIcon={<MdAdd />} onClick={() => {}}>
          Add Tickets
        </Button>
      </Stack>
    </>
  );
};

export default TicketList;
