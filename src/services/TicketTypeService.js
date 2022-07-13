import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/ticket-types";

export const getTicketTypeList = async () => {
  return await axiosPrivate.get(`${apiPath}`);
};

export const postTicketType = async (params) => {
  return await axiosPrivate.post(`${apiPath}`, params);
};
