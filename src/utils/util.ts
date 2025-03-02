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
    // console.log(data);
} catch (error) {
    console.log(error);
}
};

// f89319a4-d730-40a0-8b85-10871693c9c7
export const getCity = async (setter: React.Dispatch<React.SetStateAction<never[]>>, id: string) => {
  try {
    const { data } = await customAxiosInstance.get(`/Customer/GetCitiyList/${id}`);
    const mappedCityList = data.map((city: any) => ({
      value: city.id,
      label: city.text,
    }));

    setter(mappedCityList);

    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
