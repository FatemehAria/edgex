import type { Dispatch, SetStateAction } from 'react';

import { customAxiosInstance } from '@/utils/axios-config';

export const getExistanceList = async (setter: Dispatch<SetStateAction<never[]>>) => {
  try {
    const { data } = await customAxiosInstance.get('/ExistenceCategory');

    setter(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
