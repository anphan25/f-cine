import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/showtimes";

export const getShowTimeList = async (params) => {
  const res = params
    ? await axiosPrivate.get(
        `${apiPath}?PageSize=${params.PageSize}&Page=${params.Page}&IsNotShowedYet=${params.isNotShowedYet}`
      )
    : await axiosPrivate.get(apiPath);
  return res;
};

export const postShowTime = async (params) => {
  return await axiosPrivate.post(apiPath, params);
};

export const getShowTimeById = async (id) => {
  return await axiosPrivate.get(`${apiPath}/${id}`);
};
