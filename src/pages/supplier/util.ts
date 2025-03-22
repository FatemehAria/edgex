import type { Dispatch, SetStateAction } from 'react';

import { customAxiosInstance } from '@/utils/axios-config';

export const getSuppliersList = async (
  setList: Dispatch<SetStateAction<any[]>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get('/Suplier');

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setList(formattedData);
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading?.(false);
  }
};

export const createSupplier = async (values: any) => {
  console.log('values in createCategory', values);

  try {
    const { data } = await customAxiosInstance.post('/Suplier/create', {
      companyPersonTitle: values['CompanyPersonTitle'],
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
