import { axiosPublic } from "utils/axiosConfig";

const apiPath = "/movies";

export const getMoviesForHomePage = async () => {
  return await axiosPublic.get(`${apiPath}/latest`);
};

export const getIncomingMovie = async () => {
  return await axiosPublic.get(`${apiPath}/incoming`);
};
