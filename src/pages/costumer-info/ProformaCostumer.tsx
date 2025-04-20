import type { MyFormOptions } from '@/components/core/form';

import React, { useContext, useState } from 'react';

import { ProvinceContext } from '@/context/ProvinceContext';
import { useLocale } from '@/locales';
import { getCity } from '@/utils/util';

import FormLayout from '../layout/form-layout';

interface ProformaCostumerProps {
  onCustomerSubmit?: (values: any) => void;
}

function ProformaCostumer({ onCustomerSubmit }: ProformaCostumerProps) {
  const { formatMessage } = useLocale();
  const [personType, setPersonType] = useState('');
  const { provinceList } = useContext(ProvinceContext);
  const [cityList, setCityList] = useState([]);

  const costumerInfoFormOptions: MyFormOptions = [
    {
      name: 'personTypeTitle',
      label: `${formatMessage({ id: 'app.personComapnyInfo.personType' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => {
          setPersonType(value);
          // localStorage.setItem('person-company-type', JSON.stringify(value));
        },
      },
      options: [
        { label: 'حقیقی', value: '1' },
        { label: 'حقوقی', value: '2' },
      ],
    },
    {
      name: 'NamePersian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnamePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) =>
        //   localStorage.setItem('person-company-firstname-persian', JSON.stringify(value.target.value)),
      },
      hidden: personType === '2',
    },
    {
      name: 'FamilyPersian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnamePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) =>
        //   localStorage.setItem('person-company-lastname-persian', JSON.stringify(value.target.value)),
      },
      hidden: personType === '2',
    },
    {
      name: 'Name',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnameEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) =>
        //   localStorage.setItem('person-company-firstname-english', JSON.stringify(value.target.value)),
      },
      hidden: personType === '2',
    },
    {
      name: 'Family',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnameEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) =>
        //   localStorage.setItem('person-company-lastname-english', JSON.stringify(value.target.value)),
      },
      hidden: personType === '2',
    },
    {
      name: 'Title',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titleEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) =>
        //   localStorage.setItem('person-company-title-english', JSON.stringify(value.target.value)),
      },
      hidden: personType === '1',
    },
    {
      name: 'TitlePersian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titlePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) =>
        //   localStorage.setItem('person-company-title-persian', JSON.stringify(value.target.value)),
      },
      hidden: personType === '1',
    },
    {
      name: 'Email',
      label: `${formatMessage({ id: 'app.personComapnyInfo.email' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) => localStorage.setItem('person-company-email', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'Mobile',
      label: `${formatMessage({ id: 'app.personComapnyInfo.mobile' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) => localStorage.setItem('person-company-mobile', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'Telephone',
      label: `${formatMessage({ id: 'app.personComapnyInfo.phone' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) =>
        //   localStorage.setItem('person-company-phonenumber', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'CodeNational',
      label: `${formatMessage({ id: 'app.personComapnyInfo.nationalID' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) => localStorage.setItem('person-company-nationalID', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'person-company-province',
      label: `${formatMessage({ id: 'app.personComapnyInfo.province' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: string) => {
          getCity(setCityList, value);
          // localStorage.setItem('person-company-province', JSON.stringify(value));
        },
      },
      options: provinceList,
    },
    {
      name: 'person-company-city',
      label: `${formatMessage({ id: 'app.personComapnyInfo.city' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) => {
        //   // console.log('City changed:', value);
        //   localStorage.setItem('person-company-city', JSON.stringify(value));
        // },
      },
      options: cityList,
    },
    {
      name: 'person-company-address',
      label: `${formatMessage({ id: 'app.personComapnyInfo.address' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) => localStorage.setItem('person-company-address', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'ZipCode',
      label: `${formatMessage({ id: 'app.personComapnyInfo.postalCode' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        // onChange: (value: any) => localStorage.setItem('person-company-postalCode', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'IsActive',
      label: `${formatMessage({ id: 'app.personComapnyInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.personComapnyInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {
        // onChange: (value: any) => localStorage.setItem('person-company-active', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'IsCustomer',
      label: `${formatMessage({ id: 'app.costumerInfo.isCostumerTitle' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.isCostumer' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.isNotCostumer' })}`, value: false },
      ],
      innerProps: {
        // onChange: (value: any) => localStorage.setItem('costumer-info-isCostumer', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'IsActiveCustomer',
      label: `${formatMessage({ id: 'app.costumerInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {
        // onChange: (value: any) => localStorage.setItem('costumer-info-active', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'IsSuplier',
      label: `${formatMessage({ id: 'app.supplier.isSupplierTitle' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.supplier.isSupplier' })}`, value: true },
        { label: `${formatMessage({ id: 'app.supplier.isNotSupplier' })}`, value: false },
      ],
      innerProps: {
        // onChange: (value: any) => localStorage.setItem('supplier-isSupplier', JSON.stringify(value.target.value)),
      },
    },
    {
      name: 'IsActiveSuplier',
      label: `${formatMessage({ id: 'app.costumerInfo.status' })}`,
      type: 'radio',
      options: [
        { label: `${formatMessage({ id: 'app.costumerInfo.status.active' })}`, value: true },
        { label: `${formatMessage({ id: 'app.costumerInfo.status.deactive' })}`, value: false },
      ],
      innerProps: {
        // onChange: (value: any) => localStorage.setItem('supplier-status', JSON.stringify(value.target.value)),
      },
    },
  ];

  return (
    <FormLayout
      FormOptions={costumerInfoFormOptions}
      layoutDir="vertical"
      submitForm={values => {
        // console.log('Submitted values:', values);

        if (onCustomerSubmit) {
          onCustomerSubmit(values);
        }
      }}
      isGrid={false}
      showButton={true}
    />
  );
}

export default ProformaCostumer;
