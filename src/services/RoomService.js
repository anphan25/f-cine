import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/rooms";

export const getRoomsByTheaterId = async (roomId) => {
  return await axiosPrivate.get(apiPath + `/lossless/${roomId}`);
};
