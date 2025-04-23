import type { Locale } from '@/interface/user/user';
import type { Dispatch, SetStateAction } from 'react';

import { formatValue } from '@/utils/formatTypingNums';

import { createCustomer } from '../costumer-info/util';
import { createSupplier } from '../supplier/util';
import { createProformaCategory, createProformaStuff } from './util';

export function round2(n: number): number {
  // +Number.EPSILON guards against floating-point weirdness
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
) => {
  setTableData(prevData =>
    prevData.map(row => {
      if (row.key === key) {
        const updatedRow = { ...row, [dataIndex]: value };

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

          // مبلغ بیمه برای هر رکورد
          const insurancePriceForRecord = updatedRow.itemTotalPrice * Number(updatedRow.footerInsuranceCoefficient);

          updatedRow.insurancePriceForRecord = round2(insurancePriceForRecord);

          // const totalCost = totalCostOfRows || 1;
          const qtyNumber = qty || 1;

          const sumOfItemTotalPrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0),
            0,
          );

          // console.log(sumOfItemTotalPrice);
          const shareOfTaxAndInsModulo = insurancePriceForRecord / sumOfItemTotalPrice / qtyNumber;

          // سهم آیتم از بیمه و مالیات
          // const shareOfTaxAndIns = shareOfTaxAndInsModulo * 0.115 * itemTotalPrice;
          const shareOfTaxAndIns = shareOfTaxAndInsModulo * 0.115;

          // updatedRow.itemShareOfTaxAndIns = Math.ceil(shareOfTaxAndIns);
          updatedRow.itemShareOfTaxAndIns = parseFloat(shareOfTaxAndIns.toFixed(4));

          // قیمت فروش آیتم
          const itemSalePrice = primarySalesPrice + shareOfTaxAndIns;

          updatedRow.itemSalePrice = round2(itemSalePrice);
          // قیمت فروش آیتم رند شده

          if (dataIndex === 'itemSalePriceRounded') {
            updatedRow.itemSalePriceRounded = formatValue(value);
          } else {
            updatedRow.itemSalePriceRounded = formatValue(String(Math.round(itemSalePrice)));
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

export const handleNewCustomer = (
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
) => {
  // console.log('values for new customer', values);
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

  setCustomerOptions(prev => [...prev, newCustomer]);

  setSelectedCostumer(newCustomer.value);

  createCustomer(newCustomer);

  setIsCustomerModalOpen(false);
};

export const handleNewSupplier = (
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
  // console.log(values);
  const newSupplier = {
    label: locale === 'en_US' ? values['name'] + values['family'] : values['namePersian'] + values['familyPersian'],
    value: locale === 'en_US' ? values['name'] + values['family'] : values['namePersian'] + values['familyPersian'],
    personTypeCode: Number(values['personTypeCode']),
    namePersian: values['namePersian'],
    familyPersian: values['familyPersian'],
    name: values['name'],
    family: values['family'],
    title: values['title'],
    titlePersian: values['titlePersian'],
    email: values['email'],
    mobile: values['mobile'],
    telephone: values['telephone'],
    codeNational: values['codeNational'],
    provinceID: values['provinceID'],
    cityID: values['cityID'],
    address: values['address'],
    zipCode: values['zipCode'],
    isActive: values['isActive'],
    isActiveSuplier: values['isActiveSuplier'],
    isSuplier: values['isSuplier'],
    isActiveCustomer: values['isActiveCustomer'],
    isCustomer: values['isCustomer'],
  };

  setSupplierOptions(prev => [...prev, newSupplier]);

  if (activeSupplierRow !== null) {
    setTableData(prevData =>
      prevData.map(row => (row.key === activeSupplierRow ? { ...row, supplier: newSupplier.value } : row)),
    );
    setActiveSupplierRow(null);
  }

  createSupplier(values);

  setIsSupplierModalOpen(false);
};

export const handleNewGroup = (
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
  // console.log('Group submitted:', values);

  const newGroup = {
    label: values['Title'],
    value: values['Title'],
    Title: values['Title'],
    'grp-specification-title-persian': values['TitlePersian'],
    ExistenceCode: values['ExistenceCode'] || '1',
  };

  setGroupingOptions(prev => [...prev, newGroup]);

  if (activeGroupingRow !== null) {
    setTableData(prevData =>
      prevData.map(row => (row.key === activeGroupingRow ? { ...row, category: newGroup.value } : row)),
    );
    setActiveGroupingRow(null);
  }

  createProformaCategory(newGroup);

  setIsGroupingModalOpen(false);
};

export const handleNewItem = (
  values: any,
  // ← now a map-of-arrays setter:
  setItemOptionsMap: Dispatch<SetStateAction<Record<string, any[]>>>,
  activeItemRow: number | null,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setActiveItemRow: Dispatch<SetStateAction<number | null>>,
  setIsItemModalOpen: Dispatch<SetStateAction<boolean>>,
  // ← you need to pass in the categoryId for this row:
  categoryId: string,
) => {
  const newItem = {
    label: values['title'],
    value: values['title'],
    Title: values['title'],
    TitlePersian: values['titlePersian'],
    Description: values['description'],
  };

  // merge _just_ this category’s list:
  setItemOptionsMap(prev => ({
    ...prev,
    [categoryId]: [...(prev[categoryId] || []), newItem],
  }));

  if (activeItemRow !== null) {
    setTableData(prev => prev.map(row => (row.key === activeItemRow ? { ...row, items: newItem.value } : row)));
    setActiveItemRow(null);
  }

  createProformaStuff(newItem);
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
