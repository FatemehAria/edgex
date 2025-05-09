import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';
import { translate } from '@/utils/intl-service';

export const createCostumer = async (values?: any) => {
  const safeValues = values || {};

  // console.log('values', values);

  try {
    const rawPersonCompanyType = localStorage.getItem('person-company-type');
    const personCompanyType = rawPersonCompanyType ? JSON.parse(rawPersonCompanyType) : values['personTypeCode'];

    const rawFirstNamePersian = localStorage.getItem('person-company-firstname-persian');
    const firstNamePersian = rawFirstNamePersian ? JSON.parse(rawFirstNamePersian) : '';

    const activeSupplierLocal = localStorage.getItem('supplier-status')
      ? JSON.parse(localStorage.getItem('supplier-status')!)
      : false;

    const activeCustomerLocal = localStorage.getItem('costumer-info-active')
      ? JSON.parse(localStorage.getItem('costumer-info-active')!)
      : false;

    const isCustomerLocal = localStorage.getItem('costumer-info-isCostumer')
      ? JSON.parse(localStorage.getItem('costumer-info-isCostumer')!)
      : false;

    const isSuplierLocal = localStorage.getItem('supplier-isSupplier')
      ? JSON.parse(localStorage.getItem('supplier-isSupplier')!)
      : false;

    const rawNameEnglish = localStorage.getItem('person-company-firstname-english');
    const nameEnglish = rawNameEnglish ? JSON.parse(rawNameEnglish) : '';

    const dataToPost = {
      personTypeCode: Number(personCompanyType),
      namePersian: firstNamePersian || safeValues['namePersian'],
      name: nameEnglish || safeValues['name'] || '',
      familyPersian: localStorage.getItem('person-company-lastname-persian')
        ? JSON.parse(localStorage.getItem('person-company-lastname-persian')!)
        : safeValues['familyPersian'],
      family: localStorage.getItem('person-company-lastname-english')
        ? JSON.parse(localStorage.getItem('person-company-lastname-english')!)
        : safeValues['family'],
      title: localStorage.getItem('person-company-title-english')
        ? JSON.parse(localStorage.getItem('person-company-title-english')!)
        : safeValues['title'],
      titlePersian: localStorage.getItem('person-company-title-persian')
        ? JSON.parse(localStorage.getItem('person-company-title-persian')!)
        : safeValues['titlePersian'],
      telephone: localStorage.getItem('person-company-phonenumber')
        ? JSON.parse(localStorage.getItem('person-company-phonenumber')!)
        : safeValues['telephone'],
      mobile: localStorage.getItem('person-company-mobile')
        ? JSON.parse(localStorage.getItem('person-company-mobile')!)
        : safeValues['mobile'],
      email: localStorage.getItem('person-company-email')
        ? JSON.parse(localStorage.getItem('person-company-email')!)
        : safeValues['email'],
      zipCode: localStorage.getItem('person-company-postalCode')
        ? JSON.parse(localStorage.getItem('person-company-postalCode')!)
        : safeValues['zipCode'],
      provinceID: localStorage.getItem('person-company-province')
        ? JSON.parse(localStorage.getItem('person-company-province')!)
        : safeValues['provinceID'],
      cityID: localStorage.getItem('person-company-city')
        ? JSON.parse(localStorage.getItem('person-company-city')!)
        : safeValues['cityID'],
      isActive: localStorage.getItem('person-company-active')
        ? JSON.parse(localStorage.getItem('person-company-active')!)
        : safeValues['isActive'],
      codeNational: localStorage.getItem('person-company-nationalID')
        ? JSON.parse(localStorage.getItem('person-company-nationalID')!)
        : safeValues['codeNational'],
      address: localStorage.getItem('person-company-address')
        ? JSON.parse(localStorage.getItem('person-company-address')!)
        : safeValues['address'],
      NumberRegistration: localStorage.getItem('RegistrationCode')
        ? JSON.parse(localStorage.getItem('RegistrationCode')!)
        : safeValues['NumberRegistration'],
      isActiveSuplier: activeSupplierLocal !== null ? activeSupplierLocal : false,
      isActiveCustomer: activeCustomerLocal !== null ? activeCustomerLocal : false,
      isCustomer: isCustomerLocal !== null ? isCustomerLocal : false,
      isSuplier: isSuplierLocal !== null ? isSuplierLocal : false,
    };

    // console.log(dataToPost);
    const { data } = await customAxiosInstance.post('/CompanyPerson/create', dataToPost);

    // console.log('Response data:', data);
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    console.log(error);
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  } finally {
    [
      'person-company-type',
      'person-company-firstname-persian',
      'person-company-firstname-english',
      'person-company-lastname-persian',
      'person-company-lastname-english',
      'person-company-title-english',
      'person-company-title-persian',
      'person-company-phonenumber',
      'person-company-mobile',
      'person-company-email',
      'person-company-postalCode',
      'person-company-province',
      'person-company-city',
      'person-company-active',
      'person-company-nationalID',
      'person-company-address',
      'supplier-status',
      'costumer-info-active',
      'costumer-info-isCostumer',
      'supplier-isSupplier',
      'RegistrationCode',
    ].forEach(key => localStorage.removeItem(key));
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
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  } finally {
    setLoading(false);
  }
};

export const updateValues = async (endpoint: string, value: any, id: string) => {
  // console.log('updateValues', value);

  try {
    const { data } = await customAxiosInstance.post(endpoint, {
      id,
      Title: value.Title,
      codeNational: value.CodeNational,
      telephone: value.Telephone,
      mobile: value.Mobile,
      email: value['Email'],
      isActive: value['IsActive'],
      cityID: value['CityID'],
      name: value['Name'],
      family: value['Family'],
      provinceID: value['ProvinceID'],
      titlePersian: value['TitlePersian'],
      namePersian: value['NamePersian'],
      familyPersian: value['FamilyPersian'],
      zipCode: value['ZipCode'],
      personTypeCode: value['personTypeTitle'] === 'حقیقی' ? 1 : 2,
      address: value['Address'],
      NumberRegistration: value['NumberRegistration'],
      isActiveSuplier: localStorage.getItem('supplier-status')
        ? JSON.parse(localStorage.getItem('supplier-status')!)
        : value['IsActiveSuplier'] === 'True'
        ? true
        : false,
      isActiveCustomer: localStorage.getItem('costumer-info-active')
        ? JSON.parse(localStorage.getItem('costumer-info-active')!)
        : value['IsActiveCustomer'] === 'True'
        ? true
        : false,
      isCustomer: localStorage.getItem('costumer-info-isCostumer')
        ? JSON.parse(localStorage.getItem('costumer-info-isCostumer')!)
        : value['IsCustomer'] === 'True'
        ? true
        : false,
      isSuplier: localStorage.getItem('supplier-isSupplier')
        ? JSON.parse(localStorage.getItem('supplier-isSupplier')!)
        : value['IsSuplier'] === 'True'
        ? true
        : false,
    });

    // console.log(data);
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    // console.log(error);
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  } finally {
    [
      'person-company-type',
      'person-company-firstname-persian',
      'person-company-firstname-english',
      'person-company-lastname-persian',
      'person-company-lastname-english',
      'person-company-title-english',
      'person-company-title-persian',
      'person-company-phonenumber',
      'person-company-mobile',
      'person-company-email',
      'person-company-postalCode',
      'person-company-province',
      'person-company-city',
      'person-company-active',
      'person-company-nationalID',
      'person-company-address',
      'supplier-status',
      'costumer-info-active',
      'costumer-info-isCostumer',
      'supplier-isSupplier',
      'RegistrationCode',
    ].forEach(key => localStorage.removeItem(key));
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
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};
