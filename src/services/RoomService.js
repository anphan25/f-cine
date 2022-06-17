import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/rooms";

export const getRoomsByTheaterId = async (theaterId) => {
  return await axiosPrivate.get(apiPath + `/lossless/${theaterId}`);
};

export const getRoomsById = async (roomId) => {
  return await axiosPrivate.get(apiPath + `/${roomId}`);
};
