import { axiosPublic } from 'utils/axiosConfig';

const apiPath = '/movie';

export const getMoviesForHomePage = async () => {
  return await axiosPublic.get(apiPath + '/get-movies-for-homepage');
};
