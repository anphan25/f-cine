import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/tickets";

export const postTickets = async (params) => {
  return await axiosPrivate.post(apiPath, { tickets: params });
};

export const getTickets = async (params) => {
  return await axiosPrivate.get(apiPath, params);
};
