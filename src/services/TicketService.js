import { axiosPrivate } from "utils/axiosConfig";
import queryString from 'query-string'

const apiPath = "/tickets";

export const postTickets = async (params) => {
  return await axiosPrivate.post(apiPath, { tickets: params });
};

export const getTickets = async (params) => {
  return await axiosPrivate.get(`${apiPath}?${queryString.stringify(params)}`);
};
