import { axiosPrivate } from 'utils/axiosConfig';

const apiPath = '/room';

export const getRoomById = async (roomId) => {
  return await axiosPrivate.get(apiPath + `/get-room/${roomId}`);
};
