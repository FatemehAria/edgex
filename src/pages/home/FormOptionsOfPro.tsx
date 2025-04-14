import type { Locale } from '@/interface/user/user';
import type { Dispatch } from 'react';

export const ProformaFormOptions = (
  formatMessage: (descriptor: any) => string,
  customerOptions: { label: string; value: string }[],
  onOpenCustomerModal: () => void,
  setHeaderData: Dispatch<any>,
  updateEditedRow: (field: string, value: any) => void,
  singleProformaInfo?: any,
  locale?: Locale,
  headerData?: any,
) => [
  {
    name: 'Event',
    label: `${formatMessage({ id: 'app.home.headerInfo.title' })}`,
    type: 'input',
    initialValue: headerData?.Event,
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.title.placeholder' })}`,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        updateEditedRow('Event', newValue);
      },
    },
  },
  {
    name: 'CustomerTitle',
    label: `${formatMessage({ id: 'app.home.headerInfo.costumer' })}`,
    type: 'select',
    initialValue: headerData?.CustomerTitle,
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.costumer.placeholder' })}`,
      onChange: (value: any) => {
        if (value === 'add-new') {
          onOpenCustomerModal();
        }

        const selectedOption = customerOptions.find(opt => opt.value === value);

        setHeaderData((prev: any) => ({ ...prev, CustomerTitle: selectedOption }));

        updateEditedRow('CustomerTitle', selectedOption);
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
    name: 'Date',
    label: `${formatMessage({ id: 'app.home.headerInfo.date' })}`,
    type: 'date-picker',
    initialValue: headerData?.Date,
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.date.placeholder' })}`,
      onChange: (value: any) => {
        const formattedDate = value.format('YYYY-MM-DD');

        // console.log('Formatted Gregorian date:', formattedDate);

        setHeaderData((prev: any) => ({ ...prev, Date: formattedDate }));
        updateEditedRow('Date', formattedDate);
      },
    },
  },
  {
    name: 'header-info-desc',
    label: `${formatMessage({ id: 'app.home.headerInfo.desc' })}`,
    type: 'textarea',
    initialValue: headerData?.['header-info-desc'],
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.desc.placeholder' })}`,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;

        setHeaderData((prev: any) => ({ ...prev, 'header-info-desc': newValue }));
        updateEditedRow('header-info-desc', newValue);
      },
    },
  },
];

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
