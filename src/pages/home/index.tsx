import type { MyFormOptions } from '@/components/core/form';
import type { CollapseProps } from 'antd';
import type { CSSProperties } from 'react';

import './index.css';

import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import React from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';

function Home() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();

  const headerInfoFormOptions: MyFormOptions = [
    {
      name: 'header-info-title',
      label: `${formatMessage({ id: 'app.home.headerInfo.title' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'header-info-costumer',
      label: `${formatMessage({ id: 'app.home.headerInfo.costumer' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: 'مشتری یک', value: '1' },
        { label: 'مشتری دو', value: '2' },
      ],
    },
    {
      name: 'header-info-date',
      label: `${formatMessage({ id: 'app.home.headerInfo.date' })}`,
      type: 'date-picker',
      innerProps: { placeholder: '' },
    },
    {
      name: 'header-info-desc',
      label: `${formatMessage({ id: 'app.home.headerInfo.desc' })}`,
      type: 'textarea',
      innerProps: { placeholder: '' },
    },
  ];

  const detailInfoFormOptions: MyFormOptions = [
    {
      name: 'detail-info-category',
      label: `${formatMessage({ id: 'app.home.detailInfo.category' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: 'بخش یک', value: '1' },
        { label: 'بخش دو', value: '2' },
      ],
    },
    {
      name: 'detail-info-supplier',
      label: `${formatMessage({ id: 'app.home.detailInfo.supplier' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: 'خدمات دهنده یک', value: '1' },
        { label: 'خدمات دهنده دو', value: '2' },
      ],
    },
    {
      name: 'detail-info-corrective-action',
      label: `${formatMessage({ id: 'app.home.detailInfo.corrective' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: 'عملیات یک', value: '1' },
        { label: 'عملیات دو', value: '2' },
      ],
    },
    {
      name: 'detail-info-desc',
      label: `${formatMessage({ id: 'app.home.detailInfo.desc' })}`,
      type: 'textarea',
      innerProps: { placeholder: '' },
    },
    {
      name: 'detail-info-cost',
      label: `${formatMessage({ id: 'app.home.detailInfo.cost' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'detail-info-requirements',
      label: `${formatMessage({ id: 'app.home.detailInfo.requirements' })}`,
      type: 'select',
      innerProps: { placeholder: '' },
      options: [
        { label: 'نیاز یک', value: '1' },
        { label: 'نیاز دو', value: '2' },
      ],
    },
    {
      name: 'detail-info-qty',
      label: `${formatMessage({ id: 'app.home.detailInfo.qty' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'detail-info-unitCost',
      label: `${formatMessage({ id: 'app.home.detailInfo.unitCost' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'detail-info-actionCost',
      label: `${formatMessage({ id: 'app.home.detailInfo.actionCost' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'detail-info-reducing',
      label: `${formatMessage({ id: 'app.home.detailInfo.reduce' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'detail-info-increasing',
      label: `${formatMessage({ id: 'app.home.detailInfo.increase' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'detail-info-finalCost',
      label: `${formatMessage({ id: 'app.home.detailInfo.finalCost' })}`,
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
    //     { label: 'ایاب ذهاب', value: 'commute' },
    //     { label: 'تخفیف مبلغی', value: 'price discount' },
    //   ],
    // },
    {
      name: 'incDec-percentage-discount',
      label: `${formatMessage({ id: 'app.home.incDecInfo.percDiscount' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'incDec-tax',
      label: `${formatMessage({ id: 'app.home.incDecInfo.tax' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'incDec-commute',
      label: `${formatMessage({ id: 'app.home.incDecInfo.commute' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
    {
      name: 'incDec-price-discount',
      label: `${formatMessage({ id: 'app.home.incDecInfo.priceDiscount' })}`,
      type: 'input',
      innerProps: { placeholder: '' },
    },
  ];

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
