import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

export const getExistanceList = async (endpoint: string, setTableData: Dispatch<SetStateAction<any[]>>) => {
  try {
    const { data } = await customAxiosInstance.get(endpoint);

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setTableData(formattedData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateExistanceCategory = async (endpoint: string, value: any, id: string) => {
  console.log(value);

  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      title: value.Title,
      // موجودیت
      // تیتر انگلیسی
    });

    console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const deleteExistanceCategory = async (endpoint: string, id: string) => {
  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
    });

    console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const createCategory = async (values: any) => {
  try {
    const { data } = await customAxiosInstance.post('/ExistenceCategory/create', {
      titlePersian: values['grp-specification-title-persian'],
      title: values['Title'],
      // موجودیت
      // existenceCode
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
