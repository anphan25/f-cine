import { axiosPublic } from "utils/axiosConfig";

const apiPath = "/movies";

export const getMoviesForHomePage = async () => {
  return await axiosPublic.get(`${apiPath}?Action=latest`);
};

export const getIncomingMovie = async () => {
  return await axiosPublic.get(`${apiPath}?Action=incoming`);
};
