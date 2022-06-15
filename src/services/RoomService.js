import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/rooms";

export const getRoomsByTheaterId = async (theaterId) => {
  return await axiosPrivate.get(apiPath + `/lossless/${theaterId}`);
};
