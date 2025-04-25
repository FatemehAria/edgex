import type { Locale } from '@/interface/user/user';
import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';
import { translate } from '@/utils/intl-service';

export const getCustomersList = async (
  setList: Dispatch<SetStateAction<any[]>>,
  locale: Locale,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get(
      `${
        locale === 'en_US' ? '/PerformaInvoiceHeader/GetCustomerList' : '/PerformaInvoiceHeader/GetCustomerPersianList'
      }`,
    );

    const formattedData = data.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setList(formattedData);
    // console.log('customers list', data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  } finally {
    setLoading?.(false);
  }
};

export const createCustomer = async (values: any) => {
  // console.log('values in createCustomer', values);

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/createModalCustomer', {
      personTypeCode: values['personTypeCode'],
      title: values['title'],
      name: values['name'],
      family: values['family'],
      telephone: values['telephone'],
      mobile: values['mobile'],
      email: values['email'],
      zipCode: values['zipCode'],
      codeNational: values['codeNational'],
      isActive: values['isActive'],
      provinceID: values['provinceID'],
      cityID: values['cityID'],
      isActiveSuplier: values['isActiveSuplier'],
      isActiveCustomer: values['isActiveCustomer'],
      isCustomer: values['isCustomer'],
      isSuplier: values['isSuplier'],
      titlePersian: values['titlePersian'],
      namePersian: values['namePersian'],
      familyPersian: values['familyPersian'],
    });

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));

    return data;
    // console.log(data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};
