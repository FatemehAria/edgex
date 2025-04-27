import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';
import { translate } from '@/utils/intl-service';

export const createStuff = async (values: any) => {
  // console.log('create stuff values', values);

  try {
    const { data } = await customAxiosInstance.post('/Stuff/create', {
      title: values['Title'],
      titlePersian: values['TitlePersian'],
      description: values['Description'] ? values['Description'] : null,
      existenceCategoryIDs: [values['categoryId']],
    });

    // console.log(data);
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
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
      existenceCategoryIDs: [value['categoryId']],
      //نرخ
    });

    // console.log(data);
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
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
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};
