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
    innerProps: { placeholder: `${formatMessage({ id: 'app.home.headerInfo.title.placeholder' })}` },
  },
  {
    name: 'header-info-costumer',
    label: `${formatMessage({ id: 'app.home.headerInfo.costumer' })}`,
    type: 'select',
    innerProps: {
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.costumer.placeholder' })}`,
      // onChange now receives a simple string value
      onChange: (value: string) => {
        if (value === 'add-new') {
          onOpenCustomerModal();
        }
      },
    },
    // Always append an "Add New Customer" option even if customerOptions is empty
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
    innerProps: { placeholder: `${formatMessage({ id: 'app.home.headerInfo.date.placeholder' })}` },
  },
  {
    name: 'header-info-desc',
    label: `${formatMessage({ id: 'app.home.headerInfo.desc' })}`,
    type: 'textarea',
    innerProps: { placeholder: `${formatMessage({ id: 'app.home.headerInfo.desc.placeholder' })}` },
  },
];
