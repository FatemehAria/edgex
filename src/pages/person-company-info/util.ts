import { customAxiosInstance } from '@/utils/axios-config';

export const createCostumer = async () => {
  console.log('createCostumer function triggered');

  try {
    const rawPersonCompanyType = localStorage.getItem('person-company-type');
    const personCompanyType = rawPersonCompanyType ? JSON.parse(rawPersonCompanyType) : null;

    const rawFirstNamePersian = localStorage.getItem('person-company-firstname-persian');
    const title = rawFirstNamePersian ? JSON.parse(rawFirstNamePersian) : '';

    // Continue for other fields...
    const dataToPost = {
      personTypeCode: personCompanyType === 'Haghighi' ? 1 : 2,
      Title: title,
      Name: localStorage.getItem('person-company-firstname-english')
        ? JSON.parse(localStorage.getItem('person-company-firstname-english')!)
        : '',
      Family: localStorage.getItem('person-company-lastname-persian')
        ? JSON.parse(localStorage.getItem('person-company-lastname-persian')!)
        : '',
      Telephone: localStorage.getItem('person-company-phonenumber')
        ? JSON.parse(localStorage.getItem('person-company-phonenumber')!)
        : '',
      Mobile: localStorage.getItem('person-company-mobile')
        ? JSON.parse(localStorage.getItem('person-company-mobile')!)
        : '',
      Email: localStorage.getItem('person-company-email')
        ? JSON.parse(localStorage.getItem('person-company-email')!)
        : '',
      ZipCode: localStorage.getItem('person-company-postalCode')
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
      CodeNational: localStorage.getItem('person-company-nationalID')
        ? JSON.parse(localStorage.getItem('person-company-nationalID')!)
        : '',
      Address: localStorage.getItem('person-company-address')
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
  } catch (error) {
    console.error('Error in createCostumer:', error);
  }
};
