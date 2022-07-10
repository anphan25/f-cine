import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/transactions";

export const getTransaction = async (params) => {
  return await axiosPrivate.get(
    `${apiPath}?PageSize=${params.PageSize}&Page=${params.Page}`
  );
};
