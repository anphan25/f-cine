import { axiosPublic } from 'utils/axiosConfig';

const apiPath = '/categories';

export const getCategoryList = async () => {
  return await axiosPublic.get(apiPath);
};
