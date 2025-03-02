import type { Dispatch, SetStateAction } from 'react';

import { customAxiosInstance } from './axios-config';

export const getProvince = async (setter: Dispatch<SetStateAction<never[]>>) => {
  try {
    const { data } = await customAxiosInstance.get('/Customer/GetProvinceList');
    const mappedProvinceList = data.map((province: any) => ({
      value: province.id,
      label: province.text,
    }));

    setter(mappedProvinceList);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
