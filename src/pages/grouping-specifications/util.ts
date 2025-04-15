import type { Locale } from '@/interface/user/user';
import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';
import { translate } from '@/utils/intl-service';

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
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getGroupList = async (
  endpoint: string,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get(endpoint);

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setTableData?.(formattedData);
    // console.log(data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  } finally {
    setLoading?.(false);
  }
};

export const updateGroup = async (endpoint: string, value: any, id: string) => {
  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      title: value.Title,
      titlePersian: value['TitlePersian'],
      existenceCode: value['ExistenceCode'],
    });

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};

export const deleteGroup = async (endpoint: string, id: string) => {
  try {
    const { data } = await customAxiosInstance.post(endpoint, id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};

export const createCategory = async (values: any) => {
  // console.log('values in createCategory', values);

  try {
    const { data } = await customAxiosInstance.post('/ExistenceCategory/create', {
      titlePersian: values['TitlePersian'],
      title: values['Title'],
      existenceCode: values['ExistenceCode'],
    });

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
    // console.log(data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};
