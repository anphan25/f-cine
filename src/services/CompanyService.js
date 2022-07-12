import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/companies";

export const getCompanyList = async (params) => {
  return await axiosPrivate.get(
    `${apiPath}/?TheaterIncluded=false&PageSize=${params.PageSize}&Page=${
      params.Page
    }&SearchKey=${params.SearchKey ? params.SearchKey : ""}`
  );
};

export const getCompanyDetail = async (params) => {
  return await axiosPrivate.get(apiPath + "/detail", params);
};

export const getCompanyListWithoutManger = async (params) => {
  return await axiosPrivate.get(`${apiPath}?WithNoManager=true`);
};

export const blockManager = async (params) => {
  return await axiosPrivate.patch(apiPath, params);
};

export const createCompany = async (params) => {
  return await axiosPrivate.post(apiPath, params);
};
