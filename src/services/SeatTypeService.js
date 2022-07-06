import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/seat-types";

export const getSeatTypeList = async () => {
  return await axiosPrivate.get(apiPath);
};
