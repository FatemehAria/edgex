import type { Dispatch, SetStateAction } from 'react';

import { customAxiosInstance } from './axios-config';

export const getProvince = async (setter: Dispatch<SetStateAction<never[]>>) => {
  try {
    const { data } = await customAxiosInstance.get('/Customer/GetProvinceList');
    const mappedProvinceList = data.map((province: any) => ({
      value: province.id,
      label: province.text,
    }));

    setter(mappedProvinceList);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// f89319a4-d730-40a0-8b85-10871693c9c7
export const getCity = async (setter: React.Dispatch<React.SetStateAction<never[]>>, id: string) => {
  try {
    const { data } = await customAxiosInstance.get(`/Customer/GetCitiyList/${id}`);
    const mappedCityList = data.map((city: any) => ({
      value: city.id,
      label: city.text,
    }));

    setter(mappedCityList);

    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getExcelReport = async () => {
  try {
    const response = await fetch('https://localhost:7214/api/ReportPerformaInvoiceHeaderDetail/export-excel', {
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf, video/mp4',
      },
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const contentType = response.headers.get('content-type');
    const blob = await response.blob();
    const filename = 'Export.xlsx';

    // Set the correct MIME type for Excel files
    const blobOptions = {
      type:
        contentType ||
        (filename.endsWith('.xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : blob.type),
    };
    const downloadUrl = window.URL.createObjectURL(new Blob([blob], blobOptions));

    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
