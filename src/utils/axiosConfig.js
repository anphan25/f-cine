import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshFail, setToken, setUserInfo } from "redux/auth/AuthSlice";
import { getNewAccessToken } from "services/AuthService";
import { store } from "store/store";

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json; charset=utf-8",
  },
});

axiosPublic.interceptors.response.use((response) => response.data);

axiosPrivate.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] = `Bearer ${
      store.getState().auth.auth?.accessToken
    }`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const prevRequest = error?.config;
    // if (error?.response?.status === 401 && prevRequest?.sent) {
    //   store.dispatch(refreshFail("Something went wrong!"));
    // }
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      await getNewAccessToken(store.getState().auth.auth?.refreshToken)
        .then((res) => {
          prevRequest.headers["Authorization"] = `Bearer ${res?.accessToken}`;
          store.dispatch(setToken(res?.accessToken));
          store.dispatch(setUserInfo(jwtDecode(res?.accessToken)));
          return axiosPrivate(prevRequest);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);
