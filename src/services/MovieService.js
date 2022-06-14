import { axiosPublic } from "utils/axiosConfig";

const apiPath = "/movies";

export const getMovieList = async (params) => {
  return await axiosPublic.get(
    `${apiPath}?Action=page&PageSize=${params.pageSize}&PageIndex=${params.currentPage}`
  );
};

export const getMovieDetail = async (id) => {
  return await axiosPublic.get(`${apiPath}?Action=detail&MovieId=${id}`);
};

export const getMovieTitle = async () => {
  return await axiosPublic.get(`${apiPath}?Action=titles`);
};

export const postMovieList = async (params) => {
  return await axiosPublic.post(apiPath, {
    params,
  });
};
