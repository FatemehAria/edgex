import type { Locale } from '@/interface/user/user';
import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';
import { translate } from '@/utils/intl-service';

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
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
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

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
    // console.log(data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Error during the operation' }));
  }
};
