import { axiosPublic } from 'utils/axiosConfig';

const apiPath = '/auth';

export const postIdToken = async (idToken) => {
  return await axiosPublic.post(apiPath + '/google-sign-in', {
    idToken: idToken,
  });
};

export const getNewAccessToken = async (refreshToken) => {
  return await axiosPublic.post(apiPath + '/token', {
    refreshToken: refreshToken,
  });
};
