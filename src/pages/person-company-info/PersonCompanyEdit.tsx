import type { MyFormOptions } from '@/components/core/form';

import { Tabs } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

import { ProvinceContext } from '@/context/ProvinceContext';
import { useLocale } from '@/locales';
import { getCity } from '@/utils/util';

import CostumerInfo from '../costumer-info';
import FormLayout from '../layout/form-layout';
import Supplier from '../supplier';

interface PersonCompanyInfoProps {
  initialValues?: Record<string, any>;
  onSubmit: any;
  showButton?: boolean;
}

function PersonCompanyEdit({ initialValues = {}, onSubmit, showButton = false }: PersonCompanyInfoProps) {
  const { formatMessage } = useLocale();
  const { provinceList } = useContext(ProvinceContext);
  const [cityList, setCityList] = useState([]);
  const [personType, setPersonType] = useState('');

  useEffect(() => {
    if (initialValues['personTypeTitle']) {
      const pType = initialValues['personTypeTitle'];

      if (pType === 'حقوقی') {
        setPersonType('2');
      } else if (pType === 'حقیقی') {
        setPersonType('1');
      } else {
        setPersonType(String(pType));
      }
    }

    if (initialValues['ProvinceID']) {
      getCity(setCityList, initialValues['ProvinceID']);
    }
  }, [initialValues]);

  const personCompanyFormOptions: MyFormOptions = [
    {
      name: 'personTypeTitle',
      label: `${formatMessage({ id: 'app.personComapnyInfo.personType' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => {
          setPersonType(value);
          localStorage.setItem('person-company-type', JSON.stringify(value));
        },
        defaultValue: initialValues['personTypeTitle'],
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
        onChange: (value: any) =>
          localStorage.setItem('person-company-firstname-persian', JSON.stringify(value.target.value)),
        defaultValue: initialValues['NamePersian'],
      },
      hidden: personType === '2',
    },
    {
      name: 'FamilyPersian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnamePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-lastname-persian', JSON.stringify(value.target.value)),
        defaultValue: initialValues['FamilyPersian'],
      },
      hidden: personType === '2',
    },
    {
      name: 'Name',
      label: `${formatMessage({ id: 'app.personComapnyInfo.firstnameEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-firstname-english', JSON.stringify(value.target.value)),
        defaultValue: initialValues['Name'],
      },
      hidden: personType === '2',
    },

    {
      name: 'Family',
      label: `${formatMessage({ id: 'app.personComapnyInfo.lastnameEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-lastname-english', JSON.stringify(value.target.value)),
        defaultValue: initialValues['Family'],
      },
      hidden: personType === '2',
    },
    {
      name: 'Title',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titleEng' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-title-english', JSON.stringify(value.target.value)),
        defaultValue: initialValues['Title'],
      },
      hidden: personType === '1',
    },
    {
      name: 'TitlePersian',
      label: `${formatMessage({ id: 'app.personComapnyInfo.titlePer' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-title-persian', JSON.stringify(value.target.value)),
        defaultValue: initialValues['TitlePersian'],
      },
      hidden: personType === '1',
    },
    {
      name: 'Email',
      label: `${formatMessage({ id: 'app.personComapnyInfo.email' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-email', JSON.stringify(value.target.value)),
        defaultValue: initialValues['Email'],
      },
    },
    {
      name: 'Mobile',
      label: `${formatMessage({ id: 'app.personComapnyInfo.mobile' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-mobile', JSON.stringify(value.target.value)),
        defaultValue: initialValues['Mobile'],
      },
    },
    {
      name: 'Telephone',
      label: `${formatMessage({ id: 'app.personComapnyInfo.phone' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) =>
          localStorage.setItem('person-company-phonenumber', JSON.stringify(value.target.value)),
        defaultValue: initialValues['Telephone'],
      },
    },
    {
      name: 'CodeNational',
      label: `${formatMessage({ id: 'app.personComapnyInfo.nationalID' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-nationalID', JSON.stringify(value.target.value)),
        defaultValue: initialValues['CodeNational'],
      },
    },
    {
      name: 'ProvinceID',
      label: `${formatMessage({ id: 'app.personComapnyInfo.province' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: string) => {
          getCity(setCityList, value);
          localStorage.setItem('person-company-province', JSON.stringify(value));
        },
        defaultValue: initialValues['ProvinceID'],
      },
      options: provinceList,
    },
    {
      name: 'CityID',
      label: `${formatMessage({ id: 'app.personComapnyInfo.city' })}`,
      type: 'select',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => {
          // console.log('City changed:', value);
          localStorage.setItem('person-company-city', JSON.stringify(value));
        },
        defaultValue: initialValues['CityID'],
      },
      options: cityList,
    },
    {
      name: 'Address',
      label: `${formatMessage({ id: 'app.personComapnyInfo.address' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-address', JSON.stringify(value.target.value)),
        defaultValue: initialValues['Address'],
      },
    },
    {
      name: 'ZipCode',
      label: `${formatMessage({ id: 'app.personComapnyInfo.postalCode' })}`,
      type: 'input',
      innerProps: {
        placeholder: '',
        onChange: (value: any) => localStorage.setItem('person-company-postalCode', JSON.stringify(value.target.value)),
        defaultValue: initialValues['ZipCode'],
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
        onChange: (value: any) => localStorage.setItem('person-company-active', JSON.stringify(value.target.value)),
        defaultValue: initialValues['IsActive'],
      },
    },
  ];
  const items = [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.defineType.tabs.supplier' })}`,
      children: <Supplier initialValues={initialValues} />,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.personComapnyInfo.tabs.defineType.tabs.costumer' })}`,
      children: <CostumerInfo initialValues={initialValues} />,
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <FormLayout
        FormOptions={personCompanyFormOptions}
        layoutDir="vertical"
        submitForm={onSubmit}
        isGrid={true}
        showButton={true}
        children={
          <Tabs defaultActiveKey="1" items={items} style={{ padding: '0 1rem' }} destroyInactiveTabPane={false} />
        }
      />
    </div>
  );
}

export default PersonCompanyEdit;
