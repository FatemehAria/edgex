import { customAxiosInstance } from '@/utils/axios-config';

export const createSupplier = async (values: any) => {
  try {
    const { data } = await customAxiosInstance.post('/Suplier/create', {
      CompanyPersonTitle: values['supplier-person-company'],
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
