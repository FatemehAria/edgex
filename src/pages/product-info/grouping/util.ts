import { customAxiosInstance } from '@/utils/axios-config';

export const getGroupItems = async (setTreeData: React.Dispatch<React.SetStateAction<never[]>>) => {
  try {
    const { data } = await customAxiosInstance.get('/Stuff/GetExistenceCategoryPersianTreeList');

    setTreeData(data);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
