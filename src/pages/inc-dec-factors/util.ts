import { customAxiosInstance } from '@/utils/axios-config';

export const createFactor = async (values: any) => {
  console.log(values);

  try {
    const { data } = await customAxiosInstance.post('/AgentsReducingIncreasing/create', {
      title: values['inc-dec-title'],
      effectTypeCode: values['inc-dec-tasir'] === 'price' ? 1 : 0,
      priceAgent: values['inc-dec-tasir'] === 'price' ? values['inc-dec-value'] : 0,
      percentAgent: values['inc-dec-tasir'] === 'percentage' ? values['inc-dec-value'] : 0,
      isActive: values['inc-dec-active'],
      isDisplayDetail: values['inc-dec-display'] === 'ghalam' ? true : false,
      isDisplayDocument: values['inc-dec-display'] === 'sanad' ? true : false,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
