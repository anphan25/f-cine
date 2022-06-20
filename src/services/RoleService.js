import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/roles";

export const updateRole = async (params) => {
  return await axiosPrivate.put(apiPath, params);
};
