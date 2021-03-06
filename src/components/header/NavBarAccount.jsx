import React, { useCallback, useEffect } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiChevronDown, BiChevronUp, BiUser } from "react-icons/bi";
import {
  Avatar,
  Divider,
  ListItemIcon,
  MenuItem,
  Popover,
  Stack,
  styled,
  Typography,
  Box,
} from "@mui/material";
import { useClick } from "hooks/useClick";
import { useDispatch, useSelector } from "react-redux";
import { defaultAvatar } from "assets/images";
import { Link, useNavigate } from "react-router-dom";
import { logoutSuccess } from "redux/auth/AuthSlice";
import { removeCompany } from "redux/company/CompanySlice";
import {
  companyError,
  companyPending,
  setCompany,
} from "redux/company/CompanySlice";
import { getCompanyDetail } from "services/CompanyService";

const MenuItemContainer = styled(MenuItem)(({ theme }) => ({
  padding: "12px",
  borderRadius: "1rem",
  color: theme.palette.neutral[700],
  ":hover": {
    color: theme.palette.neutral[800],
  },
  width: 280,
}));

export const NavBarAccount = () => {
  const { open, handleClick, handleClose, anchorEl } = useClick();
  const userInfo = useSelector((state) => state.auth.auth?.user);
  const companyInfo = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logoutSuccess());
    dispatch(removeCompany());
    navigate("/login");
  };

  const links = [
    {
      label: "Profile",
      linkTo: `profile/${userInfo?.uid}`,
      icon: <BiUser fontSize="24px" />,
    },
  ];

  const handleGetCompany = useCallback(() => {
    dispatch(companyPending());
    getCompanyDetail()
      .then((response) => {
        console.log(response);
        dispatch(setCompany(response.company));
      })
      .catch((err) => {
        console.log(err);
        dispatch(companyError());
      });
  }, [dispatch]);

  useEffect(() => {
    if (userInfo?.Role === "Manager") {
      handleGetCompany();
    }
  }, [handleGetCompany, userInfo]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          borderRadius: "10px",
          padding: "10px",
          border: "1.5px solid #EEF1F3",
        }}
      >
        {companyInfo ? (
          <Box sx={{ height: "40px", width: "40px" }}>
            <img src={companyInfo?.logoUrl} alt="" />
          </Box>
        ) : (
          ""
        )}

        <Avatar
          alt={userInfo?.Name}
          src={userInfo?.Picture ? userInfo.Picture : defaultAvatar}
        />
        <Stack direction="row" alignItems="center">
          <Typography variant="button2">{userInfo?.Name}</Typography>
          {!open ? (
            <BiChevronDown fontSize="24px" />
          ) : (
            <BiChevronUp fontSize="24px" />
          )}
        </Stack>
      </Stack>

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          top: "7% !important",
        }}
      >
        <Stack
          direction="column"
          sx={{ padding: "12px", width: 280 }}
          spacing="4px"
        >
          <Typography
            whiteSpace="normal"
            color="neutral.900"
            fontWeight="700"
            fontSize={18}
          >
            {userInfo?.Name}
          </Typography>
          <Typography
            whiteSpace="normal"
            color="neutral.800"
            fontWeight="500"
            fontSize={14}
          >
            {userInfo?.Email}
          </Typography>
        </Stack>
        <Divider
          sx={{
            borderColor: "border.0",
            mb: "8px",
          }}
        />
        {links.map((link) => (
          <MenuItemContainer key={link.label} to={link.linkTo} component={Link}>
            <ListItemIcon sx={{ color: "inherit" }}>{link.icon}</ListItemIcon>
            <Typography variant="subtitle1SemiBold">{link.label}</Typography>
          </MenuItemContainer>
        ))}
        <Divider
          sx={{
            borderColor: "border.0",
          }}
        />
        <MenuItemContainer onClick={logout}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <RiLogoutCircleLine fontSize="24px" />
          </ListItemIcon>
          <Typography variant="subtitle1SemiBold">Log out</Typography>
        </MenuItemContainer>
      </Popover>
    </>
  );
};
