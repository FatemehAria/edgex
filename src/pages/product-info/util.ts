import type { Dispatch, SetStateAction } from 'react';

import { customAxiosInstance } from '@/utils/axios-config';

export const getProductsList = async (
  endpoint: string,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get(endpoint);

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setTableData(formattedData);
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading && setLoading(false);
  }
};
