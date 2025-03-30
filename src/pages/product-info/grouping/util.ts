import type { Locale } from '@/interface/user/user';

import { customAxiosInstance } from '@/utils/axios-config';

export const getGroupItems = async (setTreeData: React.Dispatch<React.SetStateAction<never[]>>, locale: Locale) => {
  try {
    const { data } = await customAxiosInstance.get(
      `${
        locale === 'en_US'
          ? '/PerformaInvoiceHeader/ExistenceCategoryList'
          : '/Stuff/GetExistenceCategoryPersianTreeList'
      }`,
    );

    setTreeData(data);

    // console.log('getGroupItems', data);
  } catch (error) {
    console.log(error);
  }
};
