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

    console.log(data);
  } catch (error) {
    toast.error('خطا در انجام عملیات');

    console.log(error);
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

export const singleProformaInfo = async (id: string, setSingleProformaInfo: any, setHeaderData: any) => {
  try {
    const { data } = await customAxiosInstance.get(`/PerformaInvoiceHeader/edit/${id}`);

    const headerData = {
      'header-info-title': data.eventTitle,
      'header-info-costumer': data.customerId,
      'header-info-date': data.date,
      'header-info-desc': data.descriptionHeader,
    };

    const mappedTableData = data.performaInvoiceDetailList.map((detail: any, index: number) => ({
      key: index + 1,
      PerformaInvoiceDetailID: detail.performaInvoiceDetailAgentsReducingIncreasingList?.[0]?.performaInvoiceDetailID,
      existenceCategoryID: detail.existenceCategoryID,
      category: detail.existenceCategoryTitle?.value,
      supplier: detail.suplierParentID,
      qty: detail.quantity,
      unitCost: detail.costUnit,
      totalPriceWithoutFactors: detail.costTotal,
      insurancePriceForRecord: detail.insuranceTax,
      footerInsuranceCoefficient: '0.085',
      itemShareOfTaxAndIns: detail.insuranceTax,
      primarySalesPrice: detail.primarySalePrice,
      itemTotalPrice: detail.costTotal,
      footerInsurancePrice: detail.insuranceTax,
      itemSalePrice: detail.priceSale,
      itemSalePriceRounded: detail.priceSaleRounded,
      finalSalePrice: detail.priceSaleFinal,
    }));

    setHeaderData(headerData);
    setSingleProformaInfo(mappedTableData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export function mapRowToApiDetail(row: any): any {
  console.log('row', row);

  return {
    // should be set based on info
    exportToExcel: false,
    existenceCategoryID: row.category,
    // existenceCategoryTitle: row.category,
    // stuffParentID: row.items ? row.items : null,
    stuffParentID: null,
    // stuffParentTitle: row.items,
    description: row.description?.length > 0 ? row.description : null,
    // //should be set based on info
    // stuffDefectiveStatusCode: 1,
    // // should be set based on info
    // statusCode: 0,
    performaInvoiceDetailAgentsReducingIncreasingList: [
      {
        //should be set based on info
        exportToExcel: false,
        priceAgent: 0,
        percentAgent: 0,
        performaInvoiceDetailID: row.PerformaInvoiceDetailID,
        agentsReducingIncreasingID: '19256E6D-B0A0-4D79-A534-220882E586E7',
        amountAgent: parseFloat(row.footerInsuranceCoefficient) || 0,
      },
    ],
    suplierParentID: row.supplier,
    // suplierParentTitle: row.supplier,
    quantity: parseFloat(row.qty) || 0,
    priceDiscount: 0,
    primarySalePrice: row.primarySalesPrice || 0,
    increasing: 0,
    reducing: 0,
    priceFinal: row.finalSalePrice || 0,
    priceFinalReducing: 0,
    costUnit: parseFloat(String(row.unitCost).replace(/,/g, '')) || 0,
    insuranceTax: row.itemShareOfTaxAndIns,
    priceSale: row.itemSalePrice || 0,
    priceSaleRounded: parseFloat(String(row.itemSalePriceRounded).replace(/,/g, '')) || 0,
    priceSaleFinal: row.finalSalePrice || 0,
    costTotal: row.totalPriceWithoutFactors || 0,
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

export function createProformaPayload(tableData: any, insurancePrice: any, isRowFilled: any) {
  const headerData = {
    // customerTitle: localStorage.getItem('header-info-costumer')
    //   ? JSON.parse(localStorage.getItem('header-info-costumer')!)
    //   : '',
    customerId: localStorage.getItem('header-info-costumer')
      ? JSON.parse(localStorage.getItem('header-info-costumer')!)
      : null,
    descriptionHeader: localStorage.getItem('header-info-desc')
      ? JSON.parse(localStorage.getItem('header-info-desc')!)
      : null,
    eventTitle: localStorage.getItem('header-info-title') ? JSON.parse(localStorage.getItem('header-info-title')!) : '',
    date: localStorage.getItem('header-info-date') ? JSON.parse(localStorage.getItem('header-info-date')!) : '',
    //should be set based on info
    statusCode: 0,
  };

  const finalValues = calculateFinalValues(tableData, insurancePrice);

  const detailList = tableData.filter((row: any) => isRowFilled(row)).map((row: any) => mapRowToApiDetail(row));

  return {
    ...headerData,
    performaInvoiceDetailList: detailList,
    // should be set based on info
    performaInvoiceHeaderAgentsReducingIncreasingList: [
      {
        exportToExcel: false,
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

export const getStuffbyId = async (setStuffList: React.Dispatch<any>) => {
  const ID = localStorage.getItem('category-initialValue') || '';

  // console.log(ID);

  try {
    const { data } = await customAxiosInstance(`/PerformaInvoiceHeader/GetStuffList/${ID}`);

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

export const getEngReport = async (id: string) => {
  try {
    const { data } = await customAxiosInstance.get(`/PerformaInvoiceHeader/print?id=${id}`);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getPerReport = async (id: string) => {
  try {
    const { data } = await customAxiosInstance.get(`/PerformaInvoiceHeader/printPersian?id=${id}`);

    console.log(data);
  } catch (error) {
    console.log(error);
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
