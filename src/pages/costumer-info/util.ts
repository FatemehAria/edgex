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
      companyPersonType: values['companyPersonType'] === 'Haghighi' ? 1 : 2,
      companyPersonTitle: values['companyPersonTitle'],
      companyPersonAddressList: [
        {
          telephone: values['telephone'],
          provinceID: values['provinceID'],
          cityID: values['cityID'],
          address: values['address'],
        },
      ],
      isActive: values['isActive'],
    });

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
    // console.log(data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};
