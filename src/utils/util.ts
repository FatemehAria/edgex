import { useContext } from 'react';

import { ProvinceContext } from '@/context/ProvinceContext';

import { customAxiosInstance } from './axios-config';

export const getProvince = async () => {
  const { setProvinceList } = useContext(ProvinceContext);

  try {
    const { data } = await customAxiosInstance.get('/Customer/GetProvinceList');

    setProvinceList(data);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
