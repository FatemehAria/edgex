import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

export const createStuff = async (values: any) => {
  console.log('create stuff values', values);

  try {
    const { data } = await customAxiosInstance.post('/Stuff/create', {
      title: values['Title'],
      titlePersian: values['TitlePersian'],
      description: values['Description'] ? values['Description'] : null,
      existenceCategoryIDs: values['categoryId'],
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    toast.error('خطا در انجام عملیات');
    console.log(error);
  }
};

export const createGroup = async (values: any) => {
  console.log(values);

  try {
  } catch (error) {}
};

export const updateStuff = async (endpoint: string, value: any, id: string) => {
  console.log('update stuff', value);

  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      title: value['Title'],
      titlePersian: value['TitlePersian'],
      description: value['Description'],
      existenceCategoryID: value.categoryId,
      //نرخ
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const deleteProduct = async (endpoint: string, id: string) => {
  try {
    const { data } = await customAxiosInstance.post(endpoint, id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};
