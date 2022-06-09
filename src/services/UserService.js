import { axiosPublic } from "utils/axiosConfig";

const apiPath = "/user";

export const getUserList = async (page, limit) => {
  return await axiosPublic.get(`${apiPath}?page=${page}&limit=${limit}`);
};

export const searchUser = async (page, limit, searchValue) => {
  return await axiosPublic.get(
    `${apiPath}?page=${page}&limit=${limit}&searchValue=${searchValue}`
  );
};
