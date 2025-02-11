import type { MyFormOptions } from '@/components/core/form';
import type { CollapseProps } from 'antd';
import type { CSSProperties } from 'react';

import './index.css';

import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import React from 'react';

import FormLayout from '../layout/form-layout';
import { useLocale } from '@/locales';

const headerInfoFormOptions: MyFormOptions = [
  {
    name: 'header-info-title',
    label: 'عنوان :',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'header-info-costumer',
    label: 'مشتری:',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'مشتری یک', value: '1' },
      { label: 'مشتری دو', value: '2' },
    ],
  },
  {
    name: 'header-info-date',
    label: 'تاریخ:',
    type: 'date-picker',
    innerProps: { placeholder: '' },
  },
  {
    name: 'header-info-desc',
    label: 'توضیحات:',
    type: 'textarea',
    innerProps: { placeholder: '' },
  },
];

const detailInfoFormOptions: MyFormOptions = [
  {
    name: 'detail-info-category',
    label: 'عنوان :',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'بخش یک', value: '1' },
      { label: 'بخش دو', value: '2' },
    ],
  },
  {
    name: 'detail-info-supplier',
    label: 'خدمات دهنده:',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'خدمات دهنده یک', value: '1' },
      { label: 'خدمات دهنده دو', value: '2' },
    ],
  },
  {
    name: 'detail-info-corrective-action',
    label: 'عملیات اطلاحی:',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'عملیات یک', value: '1' },
      { label: 'عملیات دو', value: '2' },
    ],
  },
  {
    name: 'detail-info-desc',
    label: 'توضیحات:',
    type: 'textarea',
    innerProps: { placeholder: '' },
  },
  {
    name: 'detail-info-cost',
    label: 'هزینه:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'detail-info-requirements',
    label: 'نیازها:',
    type: 'select',
    innerProps: { placeholder: '' },
    options: [
      { label: 'نیاز یک', value: '1' },
      { label: 'نیاز دو', value: '2' },
    ],
  },
  {
    name: 'detail-info-qty',
    label: 'مقدار:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'detail-info-unitCost',
    label: 'هزینه واحد:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'detail-info-actionCost',
    label: 'هزینه عملیات:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'detail-info-reducing',
    label: 'کسورات:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'detail-info-increasing',
    label: 'افزوده:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'detail-info-finalCost',
    label: 'هزینه نهایی:',
    type: 'input',
    innerProps: { placeholder: '' },
  },
];

const incDecFormOptions: MyFormOptions = [
  // {
  //   name: 'incDec-factor',
  //   label: '',
  //   type: 'radio',
  //   options: [
  //     { label: 'تخفیف درصدی', value: 'percentage discount' },
  //     { label: '10 درصد مالیات ارزش افزوده', value: 'tax' },
  //     { label: 'ایاب ذهاب', value: 'transport' },
  //     { label: 'تخفیف مبلغی', value: 'price discount' },
  //   ],
  // },
  {
    name: 'incDec-percentage-discount',
    label: 'تخفیف درصدی',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'incDec-tax',
    label: '10 درصد مالیات ارزش افزوده',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'incDec-transport',
    label: 'ایاب ذهاب',
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'incDec-price-discount',
    label: 'تخفیف مبلغی',
    type: 'input',
    innerProps: { placeholder: '' },
  },
];

function Home() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const getItems: (panelStyle: CSSProperties) => CollapseProps[] = panelStyle => [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.home.headerInfo' })}`,
      children: (
        <div>
          <FormLayout
            FormOptions={headerInfoFormOptions}
            layoutDir="vertical"
            submitForm={values => console.log('Submitted values:', values)}
            isGrid={true}
          />
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.home.detailInfo' })}`,
      children: (
        <div>
          <FormLayout
            FormOptions={detailInfoFormOptions}
            layoutDir="vertical"
            submitForm={values => console.log('Submitted values:', values)}
            isGrid={true}
          />
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '3',
      label: `${formatMessage({ id: 'app.home.incDecInfo' })}`,
      children: (
        <div>
          <FormLayout
            FormOptions={incDecFormOptions}
            layoutDir="vertical"
            submitForm={values => console.log('Submitted values:', values)}
            isGrid={true}
          />
        </div>
      ),
      style: panelStyle,
    },
  ];
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
    fontWeight: 600,
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
    >
      {getItems(panelStyle).map((item: any) => (
        <Collapse.Panel key={item.key} header={item.label} style={item.style}>
          {item.children}
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

export default Home;
