import type { Dispatch, SetStateAction } from 'react';

import { customAxiosInstance } from '@/utils/axios-config';

export const getSuppliersList = async (
  setList: Dispatch<SetStateAction<any[]>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get('/PerformaInvoiceHeader/GetSuplierList');

    const formattedData = data.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setList(formattedData);
    // console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading?.(false);
  }
};

export const createSupplier = async (values: any) => {
  try {
    const { data } = await customAxiosInstance.post('/Suplier/create', {
      companyPersonTitle: values['companyPersonTitle'],
      personTypeCode: values['personTypeCode'] === 'Haghighi' ? 1 : 2,
      isActive: values['isActive'],
    });

    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
