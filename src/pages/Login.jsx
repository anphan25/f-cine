import React from 'react';
import { styled } from '@mui/material';
import { amico, gg } from 'assets/images';
import { Logo } from 'components';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'config/firebase';
import { postIdToken } from 'services/AuthService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'redux/auth/AuthSlice';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const RightDiv = styled('div')(({ theme }) => ({
  width: '40%',
  height: '100%',
  backgroundColor: theme.palette.neutral[0],
  borderRadius: '30px 0 0 30px',
  color: '#414141',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  '& .content': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  '& .content .gmail': {
    backgroundColor: theme.palette.neutral[900],
    color: theme.palette.neutral[0],
    fontWeight: 500,
    padding: '8px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: '5px',
  },

  '& .content .gmail:hover': {
    backgroundColor: theme.palette.neutral[800],
    transition: '0.2s linear',
  },

  '& .content .gmail img': {
    height: '40px',
    width: 'auto',
  },
  '& .content h1': {
    color: '#414141',
    textAlign: 'center',
    verticalAlign: 'middle',
  },

  '& .loginText': {
    marginTop: '8px',
    marginLeft: '5px',
  },
  '& .content .f-cine-logo': {
    paddingLeft: '50px',
    marginBottom: '10px',
  },
}));
const LeftDiv = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'relative',
  width: '60%',
  '& img': {
    height: '80%',
    width: '100%',
    position: 'absolute',
    right: '-15%',
    top: '10%',
  },
}));
const MainDiv = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  backgroundColor: theme.palette.info['lighter'],
  alignItems: 'center',
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginGoogle = async () => {
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
            'authTokens',
            JSON.stringify({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            })
          );
          navigate('/');
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <MainDiv>
      <LeftDiv>
        <img src={amico} alt=""></img>
      </LeftDiv>
      <RightDiv>
        <div className="content">
          <div className="f-cine-logo">
            <Logo></Logo>
          </div>
          <h1>Welcome Back!</h1>
          <div className="gmail" onClick={loginGoogle}>
            <div>
              <img src={gg} alt=""></img>
            </div>
            <div className="loginText">Sign in with Google</div>
          </div>
        </div>
      </RightDiv>
    </MainDiv>
  );
};

export default Login;
