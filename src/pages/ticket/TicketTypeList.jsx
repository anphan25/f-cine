import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormLabel,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { CustomDialog, CustomSnackBar, HeaderBreadcrumbs } from "components";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import { getTicketTypeList, postTicketType } from "services/TicketTypeService";

const TicketTypeList = () => {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    status: false,
    type: "success",
  });
  const [ticketTypes, setTicketTypes] = useState([]);

  const fetchTicketType = () => {
    setLoading(true);
    getTicketTypeList()
      .then((res) => {
        console.log(res);
        setTicketTypes(res.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSubmit = () => {
    postTicketType({ name })
      .then((res) => {
        handleDialog();
        setAlert({
          message: "Add new ticket type successfully",
          status: true,
          type: "success",
        });
        fetchTicketType();
      })
      .catch((err) => {
        console.log(err.respone);
        if (err?.response?.status === 400) {
          setAlert({
            message: err.response?.data?.message,
            status: true,
            type: "error",
          });
        }
      });
  };

  useEffect(() => {
    fetchTicketType();
  }, []);

  return (
    <>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <HeaderBreadcrumbs
          heading="Ticket Type List"
          links={[{ name: "Dashboard", to: "/" }, { name: "Ticket Type List" }]}
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={handleDialog}
        >
          Add Ticket Type
        </Button>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {ticketTypes?.map((type) => (
          <List
            sx={{
              width: "100%",
              maxWidth: 370,
              bgcolor: "neutral.0",
              borderRadius: "8px",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: "primary.light",
                    color: "primary.main",
                  }}
                >
                  <HiOutlineTicket />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name" secondary={type?.name} />
            </ListItem>
          </List>
        ))}
      </Box>

      {/* Add Tickets Dialog */}
      <CustomDialog
        open={isDialogOpen}
        onClose={handleDialog}
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
        title="Add Ticket Type"
      >
        <DialogContent>
          <Stack>
            <Stack direction="column" spacing={1} mb={3}>
              <FormLabel
                htmlFor="name"
                sx={{
                  fontWeight: "600",
                  color: "neutral.800",
                }}
              >
                Name
              </FormLabel>
              <Input
                id="name"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
            variant="contained"
            autoFocus
          >
            Add
          </Button>
        </DialogActions>
      </CustomDialog>

      {/* Alert message */}
      {alert?.status && (
        <CustomSnackBar
          message={alert.message}
          status={alert.status}
          type={alert.type}
        />
      )}
    </>
  );
};

export default TicketTypeList;
