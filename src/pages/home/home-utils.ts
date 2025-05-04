import type { Locale } from '@/interface/user/user';
import type { FormInstance } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

import { formatValue } from '@/utils/formatTypingNums';

import { createCustomer } from '../costumer-info/util';
import { createSupplier } from '../supplier/util';
import { createProformaCategory, createProformaStuff } from './util';

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export const resetRowFields = (row: any) => {
  return {
    ...row,
    category: '',
    items: '',
    supplier: '',
    description: '',
    qty: '',
    unitCost: '',
    totalPriceWithoutFactors: 0,
    recordProfitMargin: 0,
    primarySalesPrice: 0,
    itemTotalPrice: 0,
    footerInsuranceCoefficient: '0.085',
    insurancePriceForRecord: 0,
    itemShareOfTaxAndIns: 0,
    itemSalePrice: 0,
    itemSalePriceRounded: 0,
    finalSalePrice: 0,
    totalFinalSalePrice: 0,
    totalProfitMargin: 0,
    insuranceCheckAmount: 0,
    vat: 0,
    total: 0,
    tenPercentTax: 0,
    finalProfit: 0,
    factorValue: '',
  };
};

export const deleteRow = (key: string, setTableData: Dispatch<SetStateAction<any[]>>) => {
  setTableData(prevData => {
    const rowToDelete = prevData.find(row => row.key === key);

    if (rowToDelete && prevData[0].key === rowToDelete.key && !isRowFilled(rowToDelete)) {
      return prevData;
    }

    return prevData.filter(row => row.key !== key);
  });
};

export const handleCellChange = (
  value: string,
  key: string,
  dataIndex: string,
  setTableData: Dispatch<SetStateAction<any[]>>,
  tableData: any[],
  insurancePrice: number,
  totalCostOfRows: number,
) => {
  setTableData(prevData =>
    prevData.map(row => {
      if (row.key === key) {
        const updatedRow = { ...row, [dataIndex]: value };

        if (dataIndex === 'items') {
          updatedRow.unitCost = '';
        }

        if (
          [
            'qty',
            'unitCost',
            'factorValue',
            'itemSalePriceRounded',
            'recordProfitMargin',
            'footerInsuranceCoefficient',
          ].includes(dataIndex)
        ) {
          const qty = parseFloat(updatedRow.qty) || 0;
          const unitCost = parseFloat(String(updatedRow.unitCost).replace(/,/g, '')) || 0;

          // هزینه کل
          updatedRow.totalPriceWithoutFactors = round2(qty * unitCost);

          const {
            'record-percentage-discount': percentageDiscount = 0,
            'record-commute': commute = 0,
            'record-amount-discount': amountDiscount = 0,
          } = updatedRow.modalValues || {};

          // قیمت فروش اولیه
          const primarySalesPrice = Number(updatedRow.recordProfitMargin) * unitCost + unitCost;

          updatedRow.primarySalesPrice = round2(primarySalesPrice);

          // قیمت کل آیتم
          const itemTotalPrice = primarySalesPrice * qty;

          updatedRow.itemTotalPrice = round2(itemTotalPrice);

          const totalCost = totalCostOfRows || 1;
          const qtyNumber = qty || 1;
          const shareOfTaxAndInsModulo = insurancePrice / totalCost / qtyNumber;

          // سهم آیتم از بیمه و مالیات
          const shareOfTaxAndIns = shareOfTaxAndInsModulo * 0.115 * itemTotalPrice;

          updatedRow.itemShareOfTaxAndIns = parseFloat(shareOfTaxAndIns.toFixed(4));

          // قیمت فروش آیتم
          const itemSalePrice = primarySalesPrice + shareOfTaxAndIns;

          updatedRow.itemSalePrice = round2(itemSalePrice);
          // قیمت فروش آیتم رند شده

          if (dataIndex === 'itemSalePriceRounded') {
            updatedRow.itemSalePriceRounded = formatValue(value);
          } else {
            updatedRow.itemSalePriceRounded = formatValue(String(Math.ceil(itemSalePrice)));
          }

          // قیمت فروش نهایی
          const finalSalePrice = parseFloat(String(updatedRow.itemSalePriceRounded).replace(/,/g, '')) * qty;

          updatedRow.finalSalePrice = round2(finalSalePrice);

          const recordPercentageDiscount = round2(
            (Number(percentageDiscount) / 100) * updatedRow.totalPriceWithoutFactors,
          );

          updatedRow.totalPriceWithFactors =
            primarySalesPrice +
            Number(commute) +
            updatedRow.totalPriceWithoutFactors -
            Number(amountDiscount) -
            recordPercentageDiscount;
        }

        return updatedRow;
      }

      return row;
    }),
  );
};

export const handleNewCustomer = async (
  values: any,
  setCustomerOptions: Dispatch<
    SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >,
  setSelectedCostumer: Dispatch<SetStateAction<string>>,
  setIsCustomerModalOpen: Dispatch<SetStateAction<boolean>>,
  form: FormInstance,
  setHeaderData: Dispatch<any>,
  updateEditedRow: (field: string, value: any) => void,
) => {
  const newCustomer = {
    label: values['personTypeTitle'] === '1' ? values['Name'] + ' ' + values['Family'] : values['Title'],
    value: values['personTypeTitle'],
    personTypeCode: Number(values['personTypeTitle']),
    title: values['Title'],
    name: values['Name'],
    family: values['Family'],
    telephone: values['Telephone'],
    mobile: values['Mobile'],
    email: values['Email'],
    zipCode: values['ZipCode'],
    codeNational: values['CodeNational'],
    isActive: values['IsActive'],
    provinceID: values['person-company-province'],
    cityID: values['person-company-city'],
    isActiveSuplier: values['IsActiveSuplier'],
    isActiveCustomer: values['IsActiveCustomer'],
    isCustomer: values['IsCustomer'],
    isSuplier: values['IsSuplier'],
    titlePersian: values['TitlePersian'],
    namePersian: values['NamePersian'],
    familyPersian: values['FamilyPersian'],
  };

  const newId = await createCustomer(newCustomer);
  const newLabel = values.personTypeTitle === '1' ? `${values.Name} ${values.Family}` : values.Title;

  setCustomerOptions(prev => [...prev, { label: newLabel, value: newId }]);

  setHeaderData((prev: any) => ({ ...prev, CustomerTitle: newId }));
  updateEditedRow('CustomerTitle', newId);
  form.setFieldsValue({ CustomerTitle: newId });
  setIsCustomerModalOpen(false);
};

export const handleNewSupplier = async (
  values: any,
  setSupplierOptions: Dispatch<
    SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >,
  activeSupplierRow: number | null,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setActiveSupplierRow: Dispatch<SetStateAction<number | null>>,
  setIsSupplierModalOpen: Dispatch<SetStateAction<boolean>>,
  locale: Locale,
) => {
  const newId = await createSupplier(values);
  const newLabel = values.personTypeCode === '1' ? `${values.name} ${values.family}` : `${values.title}`;
  const newOption = { label: newLabel, value: newId };

  setSupplierOptions(prev => [...prev, newOption]);

  if (activeSupplierRow !== null) {
    setTableData(prevData => prevData.map(row => (row.key === activeSupplierRow ? { ...row, supplier: newId } : row)));
    setActiveSupplierRow(null);
  }

  setIsSupplierModalOpen(false);
};

export const handleNewGroup = async (
  values: any,
  setGroupingOptions: Dispatch<
    SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >,
  setIsGroupingModalOpen: Dispatch<SetStateAction<boolean>>,
  activeGroupingRow: number | null,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setActiveGroupingRow: Dispatch<SetStateAction<number | null>>,
) => {
  const newGroup = {
    label: values['Title'],
    value: values['Title'],
    Title: values['Title'],
    'grp-specification-title-persian': values['TitlePersian'],
    ExistenceCode: values['ExistenceCode'] || '1',
  };

  const newId = await createProformaCategory(newGroup);
  const newLabel = values.Title;

  setGroupingOptions(prev => [...prev, { label: newLabel, value: newId }]);

  if (activeGroupingRow !== null) {
    setTableData(prevData => prevData.map(row => (row.key === activeGroupingRow ? { ...row, category: newId } : row)));
    setActiveGroupingRow(null);
  }

  setIsGroupingModalOpen(false);
};

export const handleNewItem = async (
  values: any,
  setItemOptionsMap: Dispatch<SetStateAction<Record<string, any[]>>>,
  activeItemRow: number | null,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setActiveItemRow: Dispatch<SetStateAction<number | null>>,
  setIsItemModalOpen: Dispatch<SetStateAction<boolean>>,
  categoryId: string,
) => {
  const newItem = {
    label: values['title'],
    value: values['title'],
    Title: values['title'],
    TitlePersian: values['titlePersian'],
    Description: values['description'],
  };

  const newId = await createProformaStuff(newItem);
  const newLabel = values.title;

  setItemOptionsMap(prev => ({
    ...prev,
    [categoryId]: [...(prev[categoryId] || []), { label: newLabel, value: newId?.toString() }],
  }));

  if (activeItemRow !== null) {
    setTableData(prev =>
      prev.map(row => (row.key === activeItemRow ? { ...row, items: newId?.toString(), itemsLabel: newLabel } : row)),
    );
    setActiveItemRow(null);
  }

  setIsItemModalOpen(false);
};

export const isRowFilled = (row: any) => {
  const requiredFields = [
    'category',
    // 'items',
    'supplier',
    // 'description',
    'qty',
    'unitCost',
    'recordProfitMargin',
    'itemSalePriceRounded',
  ];

  return requiredFields.every(field => {
    const value = row[field];

    return value !== undefined && value !== null && value.toString().trim() !== '';
  });
};
