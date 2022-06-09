import { axiosPrivate } from "utils/axiosConfig";

export const getDataGrid = async (apiPath, page, limit) => {
  return await axiosPrivate.get(`${apiPath}?page=${page}&limit=${limit}`);
};
