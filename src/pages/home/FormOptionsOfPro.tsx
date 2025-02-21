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

export const ProformaFormOptions = (formatMessage: (descriptor: any) => string) => [
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
      mode: 'tags',
      placeholder: `${formatMessage({ id: 'app.home.headerInfo.costumer.placeholder' })}`,
      getValueFromEvent: (value: string[]) => (value.length > 0 ? value[value.length - 1] : ''),
    },
    options: [
      { label: 'مشتری یک', value: '1' },
      { label: 'مشتری دو', value: '2' },
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
