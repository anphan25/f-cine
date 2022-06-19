import { axiosPrivate } from "utils/axiosConfig";

const apiPath = "/users";

export const getUserList = async (params) => {
  return await axiosPrivate.get(
    `${apiPath}?PageSize=${params.PageSize}&Page=${params.Page}&Email=${
      params.Email ? params.Email : ""
    }`
  );
};

// export const getUserList = async (params) => {
//   return await axiosPrivate.get(apiPath, params);
// };

// export const searchUser = async (page, limit, searchValue) => {
//   return await axiosPublic.get(
//     `${apiPath}?page=${page}&limit=${limit}&searchValue=${searchValue}`
//   );
// };
