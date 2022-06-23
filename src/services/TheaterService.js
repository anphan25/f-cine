import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/theaters";

export const getCompanyList = async (params) => {
  return await axiosPrivate.get(
    `${apiPath}?CompanyId=${params.CompanyId}&PageSize=${
      params.PageSize
    }&Page=${params.Page}&SearchKey=${params.SearchKey ? params.SearchKey : ""}`
  );
};

export const createTheater = async (params) => {
  console.log(params);
  return await axiosPrivate.post(apiPath, params);
};
