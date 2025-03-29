import { customAxiosInstance } from '@/utils/axios-config';

export const getReportsData = async () => {
  try {
    const { data } = await customAxiosInstance.get('/ReportPerformaInvoiceHeaderDetail');

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
