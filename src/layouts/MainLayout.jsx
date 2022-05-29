import { NavBar } from "components";
import Footer from "../components/footer/Footer";
import React from "react";
import { Outlet } from "react-router-dom";
import { styled, Container } from "@mui/material";
import { Background } from "../components/index";

const ContentStyle = styled("div")(({ theme }) => ({
  borderRadius: "8px",
  margin: "100px 0 30px",
  width: "100%",
}));

export const MainLayout = () => {
  return (
    <>
      <Background>
        <NavBar />
        <Container
          className="container"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "calc(100% - 120px)",
          }}
        >
          <ContentStyle className="content">
            <Outlet />
          </ContentStyle>
        </Container>
        <Footer />
      </Background>
    </>
  );
};
