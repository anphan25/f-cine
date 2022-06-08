import React from "react";
import { Alert, Button, Stack, styled, Typography } from "@mui/material";
import { amico, gg } from "assets/images";
import { Logo } from "components";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "config/firebase";
import { postIdToken } from "services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { authPending, loginFail, loginSuccess } from "redux/auth/AuthSlice";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const RightDiv = styled("div")(({ theme }) => ({
  width: "40%",
  height: "100%",
  backgroundColor: theme.palette.neutral[0],
  color: "#414141",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  padding: "16px 28px",
  width: "303px",
  borderRadius: 12,
  border: `2px solid ${theme.palette.neutral[300]}`,
  fontSize: 20,
  fontWeight: 600,
  backgroundColor: theme.palette.neutral[200],
  color: theme.palette.neutral[900],
  "& img": {
    height: "30px",
    width: "30px",
  },
  ":hover": {
    borderWidth: "2px",
  },
}));

const LeftDiv = styled("div")(({ theme }) => ({
  height: "100%",
  position: "relative",
  width: "60%",
  padding: "24px",
  "& .illustration": {
    position: "absolute",
    transform: "scale(0.75)",
    right: "64px",
    top: "-20px",
  },
}));
const MainDiv = styled("div")(({ theme }) => ({
  height: "100vh",
  display: "flex",
  backgroundColor: theme.palette.info["lighter"],
  alignItems: "center",
  overflow: "hidden",
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.auth);

  const loginGoogle = async () => {
    dispatch(authPending());
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        postIdToken(result._tokenResponse.idToken).then((res) => {
          console.log(res);
          dispatch(
            loginSuccess({
              accessToken: res.accessToken,
              refreshToken: res.requestToken,
              user: jwtDecode(res.accessToken),
            })
          );
          localStorage.setItem(
            "authTokens",
            JSON.stringify({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            })
          );
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFail(error.message));
      });
  };

  return (
    <MainDiv>
      <LeftDiv>
        <Logo />
        <img src={amico} alt="" className="illustration"></img>
      </LeftDiv>
      <RightDiv>
        <Stack
          alignItems="center"
          spacing="24px"
          sx={{ width: "570px", textAlign: "center" }}
        >
          <Typography variant="h2">Welcome Back!</Typography>
          <ButtonStyle
            variant="outlined"
            startIcon={<img src={gg} alt="" />}
            onClick={loginGoogle}
            disabled={isLoading}
          >
            Sign in with Google
          </ButtonStyle>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </RightDiv>
    </MainDiv>
  );
};

export default Login;
