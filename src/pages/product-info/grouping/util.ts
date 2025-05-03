import type { Locale } from '@/interface/user/user';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';
import { translate } from '@/utils/intl-service';

export const getGroupItems = async (setTreeData: React.Dispatch<React.SetStateAction<never[]>>, locale: Locale) => {
  try {
    const { data } = await customAxiosInstance.get(
      `${
        // locale === 'en_US'?
        '/PerformaInvoiceHeader/ExistenceCategoryList'
        // : '/Stuff/GetExistenceCategoryPersianTreeList'
      }`,
    );

    setTreeData(data);

    // console.log('getGroupItems', data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  }
};
