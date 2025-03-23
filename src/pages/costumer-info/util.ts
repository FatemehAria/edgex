import type { Dispatch, SetStateAction } from 'react';

import { customAxiosInstance } from '@/utils/axios-config';

export const getCustomersList = async (
  setList: Dispatch<SetStateAction<any[]>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get('/PerformaInvoiceHeader/GetCustomerList');

    const formattedData = data.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setList(formattedData);
    console.log('customers list', data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading?.(false);
  }
};

export const createCustomer = async (values: any) => {
  console.log('values in createCustomer', values);

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/createModalCustomer', {
      companyPersonTitle: values['value'],
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
