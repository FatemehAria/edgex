import { customAxiosInstance } from '@/utils/axios-config';

export const createCostumer = async (values: any) => {
  try {
    const { data } = await customAxiosInstance.post('/CompanyPerson/create', {
      personTypeCode: values['person-company-type'] === 'Haghighi' ? 1 : 2,
      Title: values['person-company-firstname-persian'],
      Name: values['person-company-firstname-english'],
      Family: values['person-company-lastname-persian'],
      //   Family: values["person-company-lastname-english"],
      Telephone: values['person-company-phonenumber'],
      Mobile: values['person-company-mobile'],
      Email: values['person-company-email'],
      ZipCode: values['person-company-postalCode'],
      provinceID: values['person-company-province'],
      cityID: values['person-company-city'],
      isActive: values['person-company-active'],
      CodeNational: values['person-company-nationalID'],
      Address: values['person-company-address'],
      isActiveSuplier: localStorage.getItem('supplier-status')
        ? JSON.parse(localStorage.getItem('supplier-status') || '')
        : false,
      isActiveCustomer: localStorage.getItem('costumer-info-active')
        ? JSON.parse(localStorage.getItem('costumer-info-active') || '')
        : false,
      isCustomer: localStorage.getItem('costumer-info-isCostumer')
        ? JSON.parse(localStorage.getItem('costumer-info-isCostumer') || '')
        : false,
      isSuplier: localStorage.getItem('supplier-isSupplier')
        ? JSON.parse(localStorage.getItem('supplier-isSupplier') || '')
        : false,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
