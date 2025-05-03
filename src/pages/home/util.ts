import type { Locale } from '@/interface/user/user';
import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';
import { translate } from '@/utils/intl-service';

export const createProforma = async (payload: any) => {
  // console.log('payload', payload);

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/create', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded.' }));

    // console.log(data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Error during the operation' }));
  } finally {
    const prefixes = [
      'header-info-',
      'editedOption-category-',
      'editedOption-items-',
      'category-initialValue',
      'items-initialValue',
    ];

    const allKeys = Object.keys(localStorage);

    allKeys.forEach(key => {
      if (prefixes.some(prefix => key.startsWith(prefix))) {
        localStorage.removeItem(key);
      }
    });
  }
};

export const updateProforma = async (payload: any) => {
  // console.log('payload', payload);

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/edit', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));

    // console.log(data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Error during the operation' }));

    console.log(error);
  } finally {
    const prefixes = [
      'header-info-',
      'editedOption-category-',
      'editedOption-items-',
      'category-initialValue',
      'items-initialValue',
    ];

    const allKeys = Object.keys(localStorage);

    allKeys.forEach(key => {
      if (prefixes.some(prefix => key.startsWith(prefix))) {
        localStorage.removeItem(key);
      }
    });
  }
};

export const copyConfirmedProformaInfo = async (
  id: string,
  setSingleProformaInfo: any,
  setHeaderData: any,
  isCopyingProforma: boolean,
  isCopyingProformaTableRow: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  locale: Locale,
) => {
  try {
    setLoading(true);
    const { data } = await customAxiosInstance.get(`/PerformaInvoiceHeader/Copy/${id}`);

    const isJalali = data.date.startsWith('13') || data.date.startsWith('14');

    const headerData = {
      Event: data.eventTitle,
      CustomerTitle: data.customerId,
      Date: data.date,
      isJalali,
      'header-info-desc': data.descriptionHeader,
      insurancePrice: data.insurancePrice,
    };

    const HeaderAgentsReducingIncreasingList = data.performaInvoiceHeaderAgentsReducingIncreasingList;

    const mappedTableData = data.performaInvoiceDetailList
      .sort((x: any, y: any) => x.code - y.code)
      .map((detail: any, index: number) => ({
        key: index + 1,
        ...(!isCopyingProforma && !isCopyingProformaTableRow
          ? { PerformaInvoiceDetailID: detail.id, id: null, code: 0 }
          : {}),
        description: detail.description,
        existenceCategoryID: detail.existenceCategoryID,
        category: detail.existenceCategoryID,
        categoryLabel: detail.existenceCategoryTitle,
        items: detail.stuffParentID,
        itemsLabel: detail.stuffParentTitle,
        supplier: detail.suplierParentID,
        spplierLabel: detail.suplierParentTitle,
        qty: detail.quantity,
        unitCost: detail.costUnit,
        totalPriceWithoutFactors: detail.costTotal,
        // insurancePriceForRecord: detail.insurancePrice,
        // footerInsuranceCoefficient: detail.performaInvoiceDetailAgentsReducingIncreasingList?.find(
        //   (item: any) => item.agentsReducingIncreasingTitle === 'بیمه',
        // )?.amountAgent,
        itemShareOfTaxAndIns: detail.insuranceTax,
        primarySalesPrice: detail.primarySalePrice,
        itemTotalPrice: detail.costTotal,
        // footerInsurancePrice: detail.insurancePrice,
        itemSalePrice: detail.priceSale,
        itemSalePriceRounded: detail.priceSaleRounded,
        finalSalePrice: detail.priceSaleFinal,
        recordProfitMargin: detail.performaInvoiceDetailAgentsReducingIncreasingList?.find(
          (item: any) => item.agentsReducingIncreasingTitle === 'سود',
        )?.amountAgent,
        stuffParentTitleModified: detail.stuffParentTitleModified,
        existenceCategoryTitleModified: detail.existenceCategoryTitleModified,
      }));

    const finalArray = mappedTableData?.concat(HeaderAgentsReducingIncreasingList);

    // console.log('finalArray', finalArray);
    setHeaderData(headerData);
    setSingleProformaInfo(finalArray);
    // console.log(data);
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  } finally {
    setLoading(false);
  }
};

export const getSingleProformaInfo = async (
  id: string,
  setSingleProformaInfo: any,
  setHeaderData: any,
  isCopyingProforma: boolean,
  isCopyingProformaTableRow: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  locale: Locale,
) => {
  // console.log('id', id);

  try {
    setLoading(true);
    const { data } = await customAxiosInstance.get(`/PerformaInvoiceHeader/edit/${id}`);

    const isJalali = data.date.startsWith('13') || data.date.startsWith('14');

    const headerData = {
      Event: data.eventTitle,
      CustomerTitle: data.customerId,
      Date: data.date,
      isJalali,
      'header-info-desc': data.descriptionHeader,
      insurancePrice: data.insurancePrice,
    };

    const HeaderAgentsReducingIncreasingList = data.performaInvoiceHeaderAgentsReducingIncreasingList;

    const mappedTableData = data.performaInvoiceDetailList
      .sort((x: any, y: any) => x.code - y.code)
      .map((detail: any, index: number) => ({
        key: index + 1,
        ...(!isCopyingProforma && !isCopyingProformaTableRow
          ? { PerformaInvoiceDetailID: detail.id, id: null, code: 0 }
          : {}),
        description: detail.description,
        existenceCategoryID: detail.existenceCategoryID,
        category: detail.existenceCategoryID,
        categoryLabel: detail.existenceCategoryTitle,
        items: detail.stuffParentID,
        itemsLabel: detail.stuffParentTitle,
        supplier: detail.suplierParentID,
        spplierLabel: detail.suplierParentTitle,
        qty: detail.quantity,
        unitCost: detail.costUnit,
        totalPriceWithoutFactors: detail.costTotal,
        // insurancePriceForRecord: detail.insurancePrice,
        // footerInsuranceCoefficient: detail.performaInvoiceDetailAgentsReducingIncreasingList?.find(
        //   (item: any) => item.agentsReducingIncreasingTitle === 'بیمه',
        // )?.amountAgent,
        itemShareOfTaxAndIns: detail.insuranceTax,
        primarySalesPrice: detail.primarySalePrice,
        itemTotalPrice: detail.costTotal,
        // footerInsurancePrice: detail.insurancePrice,
        itemSalePrice: detail.priceSale,
        itemSalePriceRounded: detail.priceSaleRounded,
        finalSalePrice: detail.priceSaleFinal,
        recordProfitMargin: detail.performaInvoiceDetailAgentsReducingIncreasingList?.find(
          (item: any) => item.agentsReducingIncreasingTitle === 'سود',
        )?.amountAgent,
        stuffParentTitleModified: detail.stuffParentTitleModified,
        existenceCategoryTitleModified: detail.existenceCategoryTitleModified,
      }));

    const finalArray = mappedTableData?.concat(HeaderAgentsReducingIncreasingList);

    // console.log('finalArray', finalArray);
    setHeaderData(headerData);
    setSingleProformaInfo(finalArray);
    // console.log(data);
  } catch (error) {
    console.log(error);
    // toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
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
  // console.log('isCopyingProforma', isCopyingProforma);
  // console.log('isCopyingProformaTableRow', isCopyingProformaTableRow);
  // console.log('isEdittingProforma', isEdittingProforma);

  let existenceCategoryTitleModified;

  if (!localStorage.getItem(`editedOption-category-${row.category}`)) {
    if (row.existenceCategoryTitleModified) {
      existenceCategoryTitleModified = row.existenceCategoryTitleModified;
    } else {
      existenceCategoryTitleModified = null;
    }
  } else {
    existenceCategoryTitleModified = localStorage.getItem(`editedOption-category-${row.category}`);
  }

  let stuffParentTitleModified;

  if (!localStorage.getItem(`editedOption-items-${row.items}`)) {
    if (row.stuffParentTitleModified) {
      stuffParentTitleModified = row.stuffParentTitleModified;
    } else {
      stuffParentTitleModified = null;
    }
  } else {
    stuffParentTitleModified = localStorage.getItem(`editedOption-items-${row.items}`);
  }

  return {
    exportToExcel: false,
    existenceCategoryID: row.category,
    ...(row.items ? { stuffParentID: row.items } : {}),
    // ...(isCopyingProforma || isCopyingProformaTableRow || isEdittingProforma ? { stuffParentID: row.items } : {}),
    description: row.description?.length > 0 ? row.description : null,
    performaInvoiceDetailAgentsReducingIncreasingList: [
      // //بیمه
      // {
      //   priceAgent: 0,
      //   percentAgent: 0,
      //   ...(!isCopyingProforma &&
      //     !isCopyingProformaTableRow && { performaInvoiceDetailID: row.PerformaInvoiceDetailID }),
      //   agentsReducingIncreasingID: '19256E6D-B0A0-4D79-A534-220882E586E7',
      //   amountAgent: parseFloat(row.footerInsuranceCoefficient) || 0,
      // },
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
    existenceCategoryTitleModified: existenceCategoryTitleModified,
    stuffParentTitleModified: stuffParentTitleModified,
    // insurancePrice: row.insurancePriceForRecord,
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
  footerInsuranceCoefficient: string,
  existingHeader?: {
    CustomerTitle: any;
    'header-info-desc': string;
    Event: string;
    Date: string;
  },
  proformaInfo?: any,
) {
  // console.log('existing header', existingHeader);
  // const customerId = localStorage.getItem('header-info-customertitle')
  //   ? JSON.parse(localStorage.getItem('header-info-customertitle')!)?.value
  //   : existingHeader?.['CustomerTitle'] ?? null;

  const rawCust = localStorage.getItem('header-info-customertitle');
  let customerId: string | null = null;

  if (rawCust && rawCust !== 'undefined') {
    try {
      const parsed = JSON.parse(rawCust);

      customerId = typeof parsed === 'object' && parsed.value != null ? parsed.value : String(parsed);
    } catch {
      customerId = rawCust;
    }
  } else {
    customerId = existingHeader?.CustomerTitle ?? null;
  }

  const descriptionHeader = localStorage.getItem('header-info-desc')
    ? JSON.parse(localStorage.getItem('header-info-desc')!)
    : existingHeader?.['header-info-desc'] ?? null;

  const eventTitle = localStorage.getItem('header-info-event')
    ? JSON.parse(localStorage.getItem('header-info-event')!)
    : existingHeader?.['Event'] ?? '';

  const date = localStorage.getItem('header-info-date')
    ? JSON.parse(localStorage.getItem('header-info-date')!)
    : existingHeader?.['Date'] ?? '';

  // console.log('date', date);
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
      //بیمه
      {
        priceAgent: 0,
        percentAgent: 0,
        ...(!isCopyingProforma && !isCopyingProformaTableRow
          ? { performaInvoiceHeaderID: proformaInfo?.[proformaInfo.length - 1]?.performaInvoiceHeaderID }
          : {}),
        agentsReducingIncreasingID: '19256E6D-B0A0-4D79-A534-220882E586E7',
        amountAgen: parseFloat(footerInsuranceCoefficient) || 0,
      },
    ],
    // should be set later
    rateStuffTotal: 0,
    priceSaleFinalTotal: finalValues.totalFinalSalePrice,
    profitMarginFinal: finalValues.totalProfitMargin,
    unitCostTotal: finalValues.unitCostTotal,
    profitFinalMinusInsuranceVatCostTotal: finalValues.finalProfit,
    quantityTotal: finalValues.quantityTotal,
    insurancePrice: insurancePrice,
    priceSaleFinal: finalValues.totalFinalSalePrice,
  };
}

export const getStuffbyId = async (setStuffList: React.Dispatch<any>, locale: Locale, id: string) => {
  const ID = id;

  // console.log('getStuffById');

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
    // toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  }
};

export const getProformaList = async (
  endpoint: string,
  setProformaList: Dispatch<SetStateAction<any[]>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
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
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  } finally {
    setLoading && setLoading(false);
  }
};

export const createProformaStuff = async (values: any) => {
  const categoryId = localStorage.getItem('category-initialValue');

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/createModalStuff', {
      title: values['Title'],
      titlePersian: values['TitlePersian'],
      description: values['Description'] ? values['Description'] : null,
      existenceCategoryID: categoryId,
    });

    // console.log(data);
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
    localStorage.setItem('items-initialValue', data);

    return data;
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};

export const createProformaCategory = async (values: any) => {
  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/createModalExistenceCategory', {
      title: values['Title'],
      titlePersian: values['grp-specification-title-persian'],
      existenceCode: Number(values['ExistenceCode']),
    });

    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
    localStorage.setItem('category-initialValue', data);

    return data;
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
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
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};

export const getEngReport = async (id: string, customerTitle: string, date: string) => {
  try {
    const response = await fetch(`https://edgex.liara.run/api/PerformaInvoiceHeader/print/${id}`, {
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
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  }
};

export const getPerReport = async (id: string, customerTitle: string, date: string) => {
  try {
    const response = await fetch(`https://edgex.liara.run/api/PerformaInvoiceHeader/printPersian/${id}`, {
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
    toast.error(translate({ id: 'gloabal.tips.toastErrorFetch', defaultMessage: 'Error fetching data' }));
  }
};

export const deleteProforma = async (endpoint: string, id: string) => {
  try {
    const { data } = await customAxiosInstance.post(endpoint, id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log(data);
    toast.success(translate({ id: 'gloabal.tips.toastSuccess', defaultMessage: 'Operation succeeded' }));
  } catch (error) {
    toast.error(translate({ id: 'gloabal.tips.toastError', defaultMessage: 'Operation failed' }));
  }
};

export const getLastUnitCostByID = async (stuffId: string) => {
  try {
    const { data } = await customAxiosInstance.get(
      '/PerformaInvoiceHeader/LastUnitCostByStuffParentID?stuffParentID=' + stuffId,
    );

    return data;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};
