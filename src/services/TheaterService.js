import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/theaters";

export const getTheatersByCompanyId = async (params) => {
  return await axiosPrivate.get(apiPath, {
    CompanyId: params,
  });
};
