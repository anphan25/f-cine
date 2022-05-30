import React from "react";
import { styled } from "@mui/material";
import { amico, gg } from "assets/images";
import { Logo } from "../components/index";
import { auth } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const RightDiv = styled("div")(({ theme }) => ({
  width: "50%",
  height: "100%",
  backgroundColor: theme.palette.neutral[0],
  borderRadius: "30px 0 0 30px",
  color: "#414141",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& .content": {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  "& .content .gmail": {
    backgroundColor: theme.palette.neutral[900],
    color: theme.palette.neutral[0],
    fontWeight: "500",
    padding: "8px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: "5px",
  },

  "& .content .gmail:hover": {
    backgroundColor: theme.palette.neutral[800],
    transition: "0.2s linear",
  },

  "& .content .gmail img": {
    height: "40px",
    width: "auto",
  },
  "& .content h1": {
    color: "#414141",
    textAlign: "center",
    verticalAlign: "middle",
  },

  "& .loginText": {
    marginTop: "8px",
    marginLeft: "5px",
  },
  "& .content .f-cine-logo": {
    paddingLeft: "50px",
    marginBottom: "10px",
  },
}));
const LeftDiv = styled("div")(({ theme }) => ({
  height: "100%",
  position: "relative",
  width: "50%",
  "& img": {
    height: "585px",
    width: "auto",
    position: "absolute",
    right: "-15%",
    top: "10%",
  },
}));
const MainDiv = styled("div")(({ theme }) => ({
  height: "100vh",
  display: "flex",
  backgroundColor: theme.palette.info["lighter"],
  alignItems: "center",
}));

const Login = () => {
  const loginGoogleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      let user = res.user;

      await axios.post("https://fcinema.tk/api/auth/google-sign-in", {
        idToken: res._tokenResponse.idToken,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MainDiv>
        <LeftDiv>
          <img src={amico}></img>
        </LeftDiv>
        <RightDiv>
          <div className="content">
            <div className="f-cine-logo">
              <Logo></Logo>
            </div>
            <h1>Welcome Back!</h1>
            <div className="gmail" onClick={loginGoogleHandler}>
              <div>
                <img src={gg}></img>
              </div>
              <div className="loginText">Sign in with Google</div>
            </div>
          </div>
        </RightDiv>
      </MainDiv>
    </>
  );
};

export default Login;
