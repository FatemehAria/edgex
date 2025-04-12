import type { Locale } from '@/interface/user/user';
import type { Dispatch, SetStateAction } from 'react';

import { customAxiosInstance } from '@/utils/axios-config';

export const getSuppliersList = async (
  setList: Dispatch<SetStateAction<any[]>>,
  locale: Locale,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get(
      `${
        locale === 'en_US' ? '/PerformaInvoiceHeader/GetSuplierList' : '/PerformaInvoiceHeader/GetSuplierPersianList'
      }`,
    );

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
  // console.log('values in create suolier', values);

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/createModalSuplier', {
      personTypeCode: Number(values['personTypeCode']),
      namePersian: values['namePersian'],
      familyPersian: values['familyPersian'],
      name: values['name'],
      family: values['family'],
      title: values['title'],
      titlePersian: values['titlePersian'],
      email: values['email'],
      mobile: values['mobile'],
      telephone: values['telephone'],
      codeNational: values['codeNational'],
      provinceID: values['provinceID'],
      cityID: values['cityID'],
      address: values['address'],
      zipCode: values['zipCode'],
      isActive: values['isActive'],
      isActiveSuplier: values['isActiveSuplier'],
      isSuplier: values['isSuplier'],
      isActiveCustomer: values['isActiveCustomer'],
      isCustomer: values['isCustomer'],
    });

    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
