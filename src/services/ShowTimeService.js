import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/showtimes";

export const getShowTimeList = async (params) => {
  return await axiosPrivate.get(apiPath, {
    params,
  });
};

export const postShowTime = async (params) => {
  return await axiosPrivate.post(apiPath, {
    movieId: params.movieId,
    roomId: params.roomId,
    theaterId: params.theaterId,
    startTime: params.startTime,
  });
};

export const getShowTimeById = async (id) => {
  return await axiosPrivate.patch(`${apiPath}/${id}`);
};
