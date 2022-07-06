import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/seats";

export const postSeats = async (params) => {
  return await axiosPrivate.post(apiPath, params);
};
