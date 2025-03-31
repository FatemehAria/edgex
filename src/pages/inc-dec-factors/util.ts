import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

export const createFactor = async (values: any) => {
  console.log('values', values);
  const influenceValue =
    typeof values['influcence'] === 'string' && values['influcence'].includes('%')
      ? parseFloat(values['influcence'].replace('%', ''))
      : values['influcence'];

  try {
    const { data } = await customAxiosInstance.post('/AgentsReducingIncreasing/create', {
      title: values['Title'],
      effectTypeCode: values['inc-dec-tasir'] === 'price' ? 1 : 0,
      priceAgent: values['inc-dec-tasir'] === 'price' ? influenceValue : 0,
      percentAgent: values['inc-dec-tasir'] === 'percentage' ? influenceValue : 0,
      isActive: values['inc-dec-active'],
      isDisplayDetail: values['inc-dec-display'] === 'displayPen' ? true : false,
      isDisplayDocument: values['inc-dec-display'] === 'displayDocument' ? true : false,
      agentTypeCode: values['inc-dec-mahiyat'],
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const getFactrosList = async (
  endpoint: string,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get(endpoint);

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
      influcence: item.PercentAgent !== 0 ? item.PercentAgent + '%' : item.PriceAgent,
      displayDocument: item.IsDisplayDocument,
      displayPen: item.IsDisplayDetail,
      'inc-dec-active': item.IsAcvtive,
      'inc-dec-mahiyat': item.AgentTypeCode,
      'inc-dec-tasir': item.EffectTypeCode === 1 ? 'price' : 'percentage',
    }));

    setTableData(formattedData);
    // console.log(formattedData);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
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
  console.log('updatefactor value', value);

  const influenceValue =
    typeof value['influcence'] === 'string' && value['influcence'].includes('%')
      ? parseFloat(value['influcence'].replace('%', ''))
      : value['influcence'];

  const isDisplayDocument = value['inc-dec-display']
    ? value['inc-dec-display'] === 'displayDocument'
      ? true
      : false
    : value['displayDocument'];

  const isDisplayDetail = value['inc-dec-display']
    ? value['inc-dec-display'] === 'displayPen'
      ? true
      : false
    : value['displayPen'];

  // console.log('isDisplayDocument', isDisplayDocument);
  // console.log('isDisplayDetail', isDisplayDetail);

  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      title: value.Title,
      isActive: value['inc-dec-active'],
      effectTypeCode: value['inc-dec-tasir'] === 'price' ? 1 : 0,
      percentAgent: value['inc-dec-tasir'] === 'percentage' ? influenceValue : 0,
      priceAgent: value['inc-dec-tasir'] === 'price' ? influenceValue : 0,
      isDisplayDetail: isDisplayDetail,
      isDisplayDocument: isDisplayDocument,
      agentTypeCode: value['inc-dec-mahiyat'],
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const deleteFactor = async (endpoint: string, id: string) => {
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
