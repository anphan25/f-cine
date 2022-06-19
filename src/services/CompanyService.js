import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/companies";

export const getCompanyList = async (params) => {
  return await axiosPrivate.get(apiPath, params);
};

export const getCompanyDetail = async (params) => {
  return await axiosPrivate.get(apiPath + "/detail", params);
};

export const getCompanyListWithoutManger = async (params) => {
  return await axiosPrivate.get(`${apiPath}?WithNoManager=true`);
};
