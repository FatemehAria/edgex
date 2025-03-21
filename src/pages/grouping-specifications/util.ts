import type { Locale } from '@/interface/user/user';
import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

export const getExistenceList = async (
  setExistenceList: Dispatch<SetStateAction<{ label: string; value: any; disabled?: boolean | undefined }[]>>,
  locale: Locale,
) => {
  try {
    const { data } = await customAxiosInstance.get('/ExistenceCategory/GetExistenceCodeList');

    const formattedData = data.map((item: any) => {
      return {
        label: locale === 'en_US' ? item.name : item.description,
        value: item.id,
      };
    });

    setExistenceList(formattedData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getGroupList = async (
  endpoint: string,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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
  } finally {
    setLoading(false);
  }
};

export const updateGroup = async (endpoint: string, value: any, id: string) => {
  console.log(value);

  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      title: value.Title,
      existenceCode: value['ExistenceCode'],
      // تیتر انگلیسی
    });

    console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const deleteGroup = async (endpoint: string, id: string) => {
  try {
    const { data } = await customAxiosInstance.post(endpoint, id, {
      headers: {
        'Content-Type': 'application/json',
      },
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
      existenceCode: values['ExistenceCode'],
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
