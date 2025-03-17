import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

export const createFactor = async (values: any) => {
  console.log(values);

  try {
    const { data } = await customAxiosInstance.post('/AgentsReducingIncreasing/create', {
      title: values['Title'],
      effectTypeCode: values['inc-dec-tasir'] === 'price' ? 1 : 0,
      priceAgent: values['inc-dec-tasir'] === 'price' ? values['influcence'] : 0,
      percentAgent: values['inc-dec-tasir'] === 'percentage' ? values['influcence'] : 0,
      isActive: values['inc-dec-active'],
      isDisplayDetail: values['inc-dec-display'] === 'displayPen' ? true : false,
      isDisplayDocument: values['inc-dec-display'] === 'displayDocument' ? true : false,
    });

    console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const getFactrosList = async (endpoint: string, setTableData: Dispatch<SetStateAction<any[]>>) => {
  try {
    const { data } = await customAxiosInstance.get(endpoint);

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
      influcence: item.PercentAgent !== 0 ? item.PercentAgent + '%' : item.PriceAgent,
      displayDocument: item.IsDisplayDocument,
      displayPen: item.IsDisplayDetail,
    }));

    setTableData(formattedData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getNatureList = async (setNatureList: Dispatch<SetStateAction<never[]>>) => {
  try {
    const { data } = await customAxiosInstance.get('/AgentsReducingIncreasing/GetNatureFactorsTypeCodeList');

    setNatureList(data);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateFactor = async (endpoint: string, value: any, id: string) => {
  console.log(value);

  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      title: value.Title,
      isActive: value['inc-dec-active'],
      effectTypeCode: value['inc-dec-tasir'] === 'price' ? 1 : 0,
      percentAgent: value['inc-dec-tasir'] === 'percentage' ? value['influcence'] : 0,
      priceAgent: value['inc-dec-tasir'] === 'price' ? value['influcence'] : 0,
      isDisplayDetail: value['inc-dec-display'] === 'displayPen' ? true : false,
      isDisplayDocument: value['inc-dec-display'] === 'displayDocument' ? true : false,
    });

    console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const deleteFactor = async (endpoint: string, id: string) => {
  console.log('delete running');

  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      Title: '',
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
