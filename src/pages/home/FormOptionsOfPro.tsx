import type { Dispatch } from 'react';

export const ModalFormOptions = (formatMessage: (descriptor: any) => string) => [
  {
    name: 'recordProfitMargin',
    label: `${formatMessage({ id: 'app.home.detailInfo.table.modalForm.profitMargin' })}`,
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'record-percentage-discount',
    label: `${formatMessage({ id: 'app.home.detailInfo.table.modalForm.percentageDiscount' })}`,
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'record-commute',
    label: `${formatMessage({ id: 'app.home.detailInfo.table.modalForm.commute' })}`,
    type: 'input',
    innerProps: { placeholder: '' },
  },
  {
    name: 'record-amount-discount',
    label: `${formatMessage({ id: 'app.home.detailInfo.table.modalForm.amountDiscount' })}`,
    type: 'input',
    innerProps: { placeholder: '' },
  },
];

export const ProformaFormOptions = (
  formatMessage: (descriptor: any) => string,
  customerOptions: { label: string; value: string }[],
  onOpenCustomerModal: () => void,
  setHeaderData: Dispatch<any>,
  singleProformaInfo?: any,
) => [
  {
    name: 'header-info-title',
    label: `${formatMessage({ id: 'app.home.headerInfo.title' })}`,
    type: 'input',
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.title.placeholder' })}`,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setHeaderData((prev: any) => ({ ...prev, 'header-info-title': newValue }));
        localStorage.setItem('header-info-title', JSON.stringify(newValue));
      },
    },
  },
  {
    name: 'header-info-costumer',
    label: `${formatMessage({ id: 'app.home.headerInfo.costumer' })}`,
    type: 'select',
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.costumer.placeholder' })}`,
      onChange: (value: any) => {
        if (value === 'add-new') {
          onOpenCustomerModal();
        }

        setHeaderData((prev: any) => ({ ...prev, 'header-info-costumer': value }));
        localStorage.setItem('header-info-costumer', JSON.stringify(value));
      },
    },
    options: [
      ...customerOptions,
      {
        label: formatMessage({ id: 'app.home.headerInfo.costumer.addNew' }) || 'Add New Customer',
        value: 'add-new',
      },
    ],
  },
  {
    name: 'header-info-date',
    label: `${formatMessage({ id: 'app.home.headerInfo.date' })}`,
    type: 'date-picker',
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.date.placeholder' })}`,
      onChange: (dateString: string) => {
        localStorage.setItem('header-info-date', JSON.stringify(dateString));
      },
    },
  },
  {
    name: 'header-info-desc',
    label: `${formatMessage({ id: 'app.home.headerInfo.desc' })}`,
    type: 'textarea',
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.desc.placeholder' })}`,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        setHeaderData((prev: any) => ({ ...prev, 'header-info-desc': newValue }));
        localStorage.setItem('header-info-desc', JSON.stringify(newValue));
      },
    },
  },
];
