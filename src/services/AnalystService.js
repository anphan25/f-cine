import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/analyst";

export const getDataChart = async (params) => {
  return await axiosPrivate.get(`${apiPath}/yearly-income?year=${params.year}`);
};

export const getDataDashboard = async (params) => {
  return await axiosPrivate.get(`${apiPath}/dashboard`);
};
