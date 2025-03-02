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

export const createCategory = async (values: any) => {
  try {
    const { data } = await customAxiosInstance.post('/ExistenceCategory/create', {
      TitlePersian: values['grp-specification-title-persian'],
      TitleEnglish: values['grp-specification-title-english'],
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
