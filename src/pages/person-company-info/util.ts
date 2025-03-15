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

    const keysToRemove = [
      'person-company-type',
      'person-company-firstname-persian',
      'person-company-firstname-english',
      'person-company-lastname-persian',
      'person-company-lastname-english',
      'person-company-email',
      'person-company-mobile',
      'person-company-phonenumber',
      'person-company-nationalID',
      'person-company-province',
      'person-company-city',
      'person-company-address',
      'person-company-postalCode',
      'person-company-active',
      'supplier-status',
      'costumer-info-active',
      'costumer-info-isCostumer',
      'supplier-isSupplier',
    ];

    keysToRemove.forEach(key => localStorage.removeItem(key));

    console.log('Response data:', data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    toast.error('خطا در انجام عملیات');
  }
};

export const getLists = async (endpoint: string, setTableData: Dispatch<SetStateAction<any[]>>) => {
  try {
    const { data } = await customAxiosInstance.get(endpoint);

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
      personTypeTitle: item.PersonTypeCode === 1 ? 'حقیقی' : 'حقوقی',
    }));

    setTableData(formattedData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateValues = async (endpoint: string, value: string, id: string) => {
  try {
    console.log(value);
  } catch (error) {}
};

export const deleteValues = async (endpoint: string, id: string) => {
  try {
  } catch (error) {}
};
