import { axiosPrivate, axiosPublic } from "utils/axiosConfig";

const apiPath = "/movies";

export const getMovieNowShowingList = async (params) => {
  return await axiosPublic.get(
    `${apiPath}?Action=page&IsAvailableOnly=true&PageSize=${
      params.PageSize
    }&PageIndex=${params.PageIndex}&SearchKey=${
      params.SearchKey ? params.SearchKey : ""
    }`
  );
};

export const getMovieStopShowingList = async (params) => {
  return await axiosPublic.get(
    `${apiPath}?Action=page&IsDisabledOnly=true&PageSize=${
      params.PageSize
    }&PageIndex=${params.PageIndex}&SearchKey=${
      params.SearchKey ? params.SearchKey : ""
    }`
  );
};

export const getAllMovies = async (params) => {
  return await axiosPublic.get(
    `${apiPath}?Action=page&PageSize=${params.PageSize}&PageIndex=${
      params.PageIndex
    }&SearchKey=${params.SearchKey ? params.SearchKey : ""}`
  );
};

export const getMovieDetail = async (id) => {
  return await axiosPublic.get(`${apiPath}?Action=detail&MovieId=${id}`);
};

export const getMovieTitle = async () => {
  return await axiosPublic.get(`${apiPath}?Action=titles`);
};

export const createMovie = async (params) => {
  return await axiosPrivate.post(apiPath, [params]);
};

export const deleteMovie = async (movieId) => {
  return await axiosPrivate.delete(`${apiPath}?movieId=${movieId}`);
};

export const restoreMovie = async (movieId) => {
  return await axiosPrivate.put(`${apiPath}?movieid=${movieId}`);
};
