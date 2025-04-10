import { customAxiosInstance } from '@/utils/axios-config';

export const getReportsData = async (setReports: React.Dispatch<React.SetStateAction<never[]>>) => {
  try {
    const { data } = await customAxiosInstance.get('/ReportPerformaInvoiceHeaderDetail');

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setReports(formattedData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
