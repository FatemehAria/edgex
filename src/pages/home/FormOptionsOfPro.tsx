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
) => [
  {
    name: 'header-info-title',
    label: `${formatMessage({ id: 'app.home.headerInfo.title' })}`,
    type: 'input',
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.title.placeholder' })}`,
      onChange: (value: any) => localStorage.setItem('header-info-title', JSON.stringify(value.target.value)),
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
      onChange: (dateString: any) => {
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
      onChange: (value: any) => localStorage.setItem('header-info-desc', JSON.stringify(value.target.value)),
    },
  },
];
