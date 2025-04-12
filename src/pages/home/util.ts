import type { Locale } from '@/interface/user/user';
import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

export const createProforma = async (payload: any) => {
  console.log('payload', payload);

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/create', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success('عملیات با موفقیت انجام شد.');

    [
      'header-info-title',
      'header-info-costumer',
      'header-info-date',
      'header-info-desc',
      'editedOption-items',
      'editedOption-category',
    ].forEach(item => localStorage.removeItem(item));

    // console.log(data);
  } catch (error) {
    toast.error('خطا در انجام عملیات');
  }
};

export const updateProforma = async (payload: any) => {
  console.log('payload', payload);

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/edit', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success('عملیات با موفقیت انجام شد.');

    console.log(data);
  } catch (error) {
    toast.error('خطا در انجام عملیات');

    console.log(error);
  }
};

export const getSingleProformaInfo = async (
  id: string,
  setSingleProformaInfo: any,
  setHeaderData: any,
  isCopyingProforma: boolean,
  isCopyingProformaTableRow: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    const { data } = await customAxiosInstance.get(`/PerformaInvoiceHeader/edit/${id}`);

    const headerData = {
      'header-info-title': data.eventTitle,
      'header-info-costumer': data.customerId,
      'header-info-date': data.date,
      'header-info-desc': data.descriptionHeader,
    };

    const HeaderAgentsReducingIncreasingList = data.performaInvoiceHeaderAgentsReducingIncreasingList;

    // console.log('HeaderAgentsReducingIncreasingList', HeaderAgentsReducingIncreasingList);

    const mappedTableData = data.performaInvoiceDetailList
      .sort((x: any, y: any) => x.code - y.code)
      .map((detail: any, index: number) => ({
        key: index + 1,
        ...(!isCopyingProforma && !isCopyingProformaTableRow
          ? { PerformaInvoiceDetailID: detail.id, id: detail.id, code: detail.code }
          : {}),
        description: detail.description,
        existenceCategoryID: detail.existenceCategoryID,
        category: detail.existenceCategoryID,
        items: detail.stuffParentID,
        supplier: detail.suplierParentID,
        qty: detail.quantity,
        unitCost: detail.costUnit,
        totalPriceWithoutFactors: detail.costTotal,
        insurancePriceForRecord: detail.insurancePrice,
        footerInsuranceCoefficient: detail.performaInvoiceDetailAgentsReducingIncreasingList?.find(
          (item: any) => item.agentsReducingIncreasingTitle === 'بیمه',
        )?.amountAgent,
        itemShareOfTaxAndIns: detail.insuranceTax,
        primarySalesPrice: detail.primarySalePrice,
        itemTotalPrice: detail.costTotal,
        footerInsurancePrice: detail.insurancePrice,
        itemSalePrice: detail.priceSale,
        itemSalePriceRounded: detail.priceSaleRounded,
        finalSalePrice: detail.priceSaleFinal,
        recordProfitMargin: detail.performaInvoiceDetailAgentsReducingIncreasingList?.find(
          (item: any) => item.agentsReducingIncreasingTitle === 'سود',
        )?.amountAgent,
      }));

    const finalArray = mappedTableData?.concat(HeaderAgentsReducingIncreasingList);

    console.log('finalArray', finalArray);
    setHeaderData(headerData);
    setSingleProformaInfo(finalArray);
    // console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export function mapRowToApiDetail(
  row: any,
  isEdittingProforma: boolean,
  isCopyingProforma: boolean,
  isCopyingProformaTableRow: boolean,
): any {
  // console.log('row', row);
  // console.log(isEdittingProforma);

  return {
    exportToExcel: false,
    existenceCategoryID: row.category,
    ...(!isCopyingProforma && !isCopyingProformaTableRow && { stuffParentID: row.items }),
    description: row.description?.length > 0 ? row.description : null,
    performaInvoiceDetailAgentsReducingIncreasingList: [
      //بیمه
      {
        priceAgent: 0,
        percentAgent: 0,
        ...(!isCopyingProforma &&
          !isCopyingProformaTableRow && { performaInvoiceDetailID: row.PerformaInvoiceDetailID }),
        agentsReducingIncreasingID: '19256E6D-B0A0-4D79-A534-220882E586E7',
        amountAgent: parseFloat(row.footerInsuranceCoefficient) || 0,
      },
      //درصد سود
      {
        priceAgent: 0,
        percentAgent: 0,
        ...(!isCopyingProforma &&
          !isCopyingProformaTableRow && { performaInvoiceDetailID: row.PerformaInvoiceDetailID }),
        agentsReducingIncreasingID: 'E863A8A6-25E9-4F49-A083-667B2CCD26B8',
        amountAgent: parseFloat(row.recordProfitMargin) || 0,
      },
    ],
    suplierParentID: row.supplier,
    quantity: parseFloat(row.qty) || 0,
    priceDiscount: 0,
    primarySalePrice: row.primarySalesPrice || 0,
    increasing: 0,
    reducing: 0,
    ...(!isCopyingProforma && !isCopyingProformaTableRow ? { id: row.id, code: row.code } : {}),
    priceFinal: row.finalSalePrice || 0,
    priceFinalReducing: 0,
    costUnit: parseFloat(String(row.unitCost).replace(/,/g, '')) || 0,
    insuranceTax: row.itemShareOfTaxAndIns,
    priceSale: row.itemSalePrice || 0,
    priceSaleRounded: parseFloat(String(row.itemSalePriceRounded).replace(/,/g, '')) || 0,
    priceSaleFinal: row.finalSalePrice || 0,
    costTotal: row.totalPriceWithoutFactors || 0,
    existenceCategoryTitleModified: localStorage.getItem(`editedOption-category`) || '',
    stuffParentTitleModified: localStorage.getItem(`editedOption-items`) || '',
    insurancePrice: row.insurancePriceForRecord,
  };
}

export function calculateFinalValues(tableData: any[], insurancePrice: number) {
  const totalFinalSalePrice = tableData.reduce(
    (sum: number, row: any) => sum + (parseFloat(String(row.finalSalePrice).replace(/,/g, '')) || 0),
    0,
  );
  const vat = 0.1 * totalFinalSalePrice;
  const total = vat + totalFinalSalePrice;
  const tenPercentTax = 0.1 * totalFinalSalePrice;
  const totalWithoutFactors = tableData.reduce(
    (sum: number, row: any) => sum + (parseFloat(String(row.totalPriceWithoutFactors).replace(/,/g, '')) || 0),
    0,
  );
  const finalProfit = totalFinalSalePrice - tenPercentTax - insurancePrice - totalWithoutFactors;
  const totalProfitMargin = totalFinalSalePrice > 0 ? (finalProfit * 100) / totalFinalSalePrice : 0;
  const insuranceCheckAmount = 0.0778 * totalFinalSalePrice;
  const unitCostTotal = tableData.reduce(
    (sum: number, row: any) => sum + (parseFloat(String(row.unitCost).replace(/,/g, '')) || 0),
    0,
  );
  const quantityTotal = tableData.reduce(
    (sum: number, row: any) => sum + (parseFloat(String(row.qty).replace(/,/g, '')) || 0),
    0,
  );

  return {
    totalFinalSalePrice,
    vat,
    total,
    finalProfit,
    totalProfitMargin,
    insuranceCheckAmount,
    unitCostTotal,
    quantityTotal,
  };
}

export function createProformaPayload(
  tableData: any,
  insurancePrice: any,
  isRowFilled: any,
  isEdittingProforma: any,
  isCopyingProforma: boolean,
  isCopyingProformaTableRow: boolean,
  existingHeader?: {
    'header-info-costumer': string;
    'header-info-desc': string;
    'header-info-title': string;
    'header-info-date': string;
  },
  proformaInfo?: any,
) {
  console.log('isCopyingProformaTableRow', isCopyingProformaTableRow);
  const customerId = localStorage.getItem('header-info-costumer')
    ? JSON.parse(localStorage.getItem('header-info-costumer')!)
    : existingHeader?.['header-info-costumer'] ?? null;

  const descriptionHeader = localStorage.getItem('header-info-desc')
    ? JSON.parse(localStorage.getItem('header-info-desc')!)
    : existingHeader?.['header-info-desc'] ?? null;

  const eventTitle = localStorage.getItem('header-info-title')
    ? JSON.parse(localStorage.getItem('header-info-title')!)
    : existingHeader?.['header-info-title'] ?? '';

  const date = localStorage.getItem('header-info-date')
    ? JSON.parse(localStorage.getItem('header-info-date')!)
    : existingHeader?.['header-info-date'] ?? '';

  const headerData = { customerId, descriptionHeader, eventTitle, date };

  const finalValues = calculateFinalValues(tableData, insurancePrice);

  const detailList = tableData
    .filter((row: any) => isRowFilled(row))
    .map((row: any) => mapRowToApiDetail(row, isEdittingProforma, isCopyingProforma, isCopyingProformaTableRow));

  return {
    ...headerData,
    performaInvoiceDetailList: detailList,
    performaInvoiceHeaderAgentsReducingIncreasingList: [
      {
        ...(!isCopyingProforma && !isCopyingProformaTableRow
          ? { performaInvoiceHeaderID: proformaInfo?.[proformaInfo.length - 1]?.performaInvoiceHeaderID }
          : {}),
        amountAgen: 10,
        agentsReducingIncreasingID: 'EDA36B90-5A9E-4487-8C62-7377E40743B8',
        increasing: 0,
        reducing: 0,
        priceFinalReducing: 0,
        priceFinal: 0,
        number: 0,
        rate: 0,
        price: 0,
      },
    ],
    // should be set later
    rateStuffTotal: 0,
    priceSaleFinalTotal: finalValues.totalFinalSalePrice,
    profitMarginFinal: finalValues.totalProfitMargin,
    unitCostTotal: finalValues.unitCostTotal,
    profitFinalMinusInsuranceVatCostTotal: finalValues.finalProfit,
    quantityTotal: finalValues.quantityTotal,
  };
}

export const getStuffbyId = async (setStuffList: React.Dispatch<any>, locale: Locale) => {
  const ID = localStorage.getItem('category-initialValue') || '';

  // console.log(ID);

  try {
    const { data } = await customAxiosInstance(
      `${
        locale === 'en_US'
          ? `/PerformaInvoiceHeader/GetStuffList/${ID}`
          : `/PerformaInvoiceHeader/GetStuffPersianList/${ID}`
      }`,
    );

    // console.log(data);
    setStuffList(data);
  } catch (error) {
    console.log(error);
  }
};

export const getProformaList = async (
  endpoint: string,
  setProformaList: Dispatch<SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const { data } = await customAxiosInstance.get(endpoint);

    const formattedData = data.rows.map((item: any, index: number) => ({
      ...item,
      key: index + 1,
    }));

    setProformaList(formattedData);
    // console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const createProformaStuff = async (values: any) => {
  const categoryId = localStorage.getItem('category-initialValue') || '';

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/createModalStuff', {
      title: values['Title'],
      titlePersian: values['TitlePersian'],
      description: values['Description'],
      existenceCategoryID: categoryId,
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    toast.error('خطا در انجام عملیات');
    console.log(error);
  }
};

export const createProformaCategory = async (values: any) => {
  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/createModalExistenceCategory', {
      title: values['Title'],
      titlePersian: values['grp-specification-title-persian'],
      existenceCode: values['ExistenceCode'],
    });

    // console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    toast.error('خطا در انجام عملیات');
    console.log(error);
  }
};

export const confirmProforma = async (id: string, setProformaStatus: any) => {
  try {
    const { data } = await customAxiosInstance.post(
      `/PerformaInvoiceHeader/Issue?id=${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    setProformaStatus(true);
    toast.success('عملیات با موفقیت انجام شد.');
    console.log(data);
  } catch (error) {
    toast.error('خطا در انجام عملیات');

    console.log(error);
  }
};

export const getEngReport = async (id: string, customerTitle: string, date: string) => {
  try {
    const response = await fetch(`https://localhost:7214/api/PerformaInvoiceHeader/print/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `${customerTitle}_${date}_proforma.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

export const getPerReport = async (id: string, customerTitle: string, date: string) => {
  try {
    const response = await fetch(`https://localhost:7214/api/PerformaInvoiceHeader/printPersian/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `${customerTitle}_${date}_proforma.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

export const deleteProforma = async (endpoint: string, id: string) => {
  try {
    const { data } = await customAxiosInstance.post(endpoint, id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(data);
    toast.success('عملیات با موفقیت انجام شد.');
  } catch (error) {
    console.log(error);
    toast.error('خطا در انجام عملیات');
  }
};
