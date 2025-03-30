import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

export const createCostumer = async () => {
  try {
    const rawPersonCompanyType = localStorage.getItem('person-company-type');
    const personCompanyType = rawPersonCompanyType ? JSON.parse(rawPersonCompanyType) : null;

    const rawFirstNamePersian = localStorage.getItem('person-company-firstname-persian');
    const firstNamePersian = rawFirstNamePersian ? JSON.parse(rawFirstNamePersian) : '';

    const dataToPost = {
      personTypeCode: personCompanyType === 'Haghighi' ? 1 : 2,
      namePersian: firstNamePersian,
      name: localStorage.getItem('person-company-firstname-english')
        ? JSON.parse(localStorage.getItem('person-company-firstname-english')!)
        : '',
      familyPersian: localStorage.getItem('person-company-lastname-persian')
        ? JSON.parse(localStorage.getItem('person-company-lastname-persian')!)
        : '',
      family: localStorage.getItem('person-company-lastname-english')
        ? JSON.parse(localStorage.getItem('person-company-lastname-english')!)
        : '',
      title: localStorage.getItem('person-company-title-english')
        ? JSON.parse(localStorage.getItem('person-company-title-english')!)
        : '',
      titlePersian: localStorage.getItem('person-company-title-persian')
        ? JSON.parse(localStorage.getItem('person-company-title-persian')!)
        : '',
      telephone: localStorage.getItem('person-company-phonenumber')
        ? JSON.parse(localStorage.getItem('person-company-phonenumber')!)
        : '',
      mobile: localStorage.getItem('person-company-mobile')
        ? JSON.parse(localStorage.getItem('person-company-mobile')!)
        : '',
      email: localStorage.getItem('person-company-email')
        ? JSON.parse(localStorage.getItem('person-company-email')!)
        : '',
      zipCode: localStorage.getItem('person-company-postalCode')
        ? JSON.parse(localStorage.getItem('person-company-postalCode')!)
        : '',
      provinceID: localStorage.getItem('person-company-province')
        ? JSON.parse(localStorage.getItem('person-company-province')!)
        : '',
      cityID: localStorage.getItem('person-company-city')
        ? JSON.parse(localStorage.getItem('person-company-city')!)
        : '',
      isActive: localStorage.getItem('person-company-active')
        ? JSON.parse(localStorage.getItem('person-company-active')!)
        : false,
      codeNational: localStorage.getItem('person-company-nationalID')
        ? JSON.parse(localStorage.getItem('person-company-nationalID')!)
        : '',
      address: localStorage.getItem('person-company-address')
        ? JSON.parse(localStorage.getItem('person-company-address')!)
        : '',
      isActiveSuplier: localStorage.getItem('supplier-status')
        ? JSON.parse(localStorage.getItem('supplier-status')!)
        : false,
      isActiveCustomer: localStorage.getItem('costumer-info-active')
        ? JSON.parse(localStorage.getItem('costumer-info-active')!)
        : false,
      isCustomer: localStorage.getItem('costumer-info-isCostumer')
        ? JSON.parse(localStorage.getItem('costumer-info-isCostumer')!)
        : false,
      isSuplier: localStorage.getItem('supplier-isSupplier')
        ? JSON.parse(localStorage.getItem('supplier-isSupplier')!)
        : false,
    };

    const { data } = await customAxiosInstance.post('/CompanyPerson/create', dataToPost);

    console.log('Response data:', data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    toast.error('خطا در انجام عملیات');
  }
};

export const getLists = async (
  endpoint: string,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get(endpoint);

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
      personTypeTitle: item.PersonTypeCode === 1 ? 'حقیقی' : 'حقوقی',
    }));

    setTableData(formattedData);
    // console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const updateValues = async (endpoint: string, value: any, id: string) => {
  // console.log(value);

  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      Title: value.Title,
      codeNational: value.CodeNational,
      telephone: value.Telephone,
      mobile: value.Mobile,
      email: value['Email'],
      isActive: value['person-company-active'],
      cityID: value['person-company-city'],
      provinceID: value['person-company-province'],
      titlePersian: value['person-company-title-persian'],
      namePersian: value['person-company-firstname-persian'],
      familyPersian: value['person-company-lastname-persian'],
      zipCode: value['person-company-postalCode'],
      personTypeCode: value['personTypeTitle'] === 'Haghighi' ? 1 : 2,
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    // console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};

export const deleteCompanyPerson = async (endpoint: string, id: string) => {
  try {
    const { data } = await customAxiosInstance.post(endpoint, id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};
