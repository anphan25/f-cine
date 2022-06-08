import { axiosPublic } from 'utils/axiosConfig';

const apiPath = '/movies';

export const getMovieList = async (params) => {
  return await axiosPublic.get(apiPath, {
    params,
  });
};

export const postMovieList = async (params) => {
  return await axiosPublic.post(apiPath, {
    params,
  });
};

// export const getMoviesForHomePage = async () => {
//   return await axiosPublic.get(`${apiPath}?Action=latest`);
// };

// export const getIncomingMovie = async () => {
//   return await axiosPublic.get(`${apiPath}?Action=incoming`);
// };
