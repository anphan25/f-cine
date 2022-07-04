import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/showtime-ticket-types";

export const getShowtimeTicketTypeList = async (id) => {
  return await axiosPrivate.get(`${apiPath}?showtimeId=${id}`);
};

export const postShowtimeTicketType = async (params) => {
  return await axiosPrivate.post(apiPath, params);
};
