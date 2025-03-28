import type { Dispatch, SetStateAction } from 'react';

import toast from 'react-hot-toast';

import { customAxiosInstance } from '@/utils/axios-config';

export const createProforma = async (payload: any) => {
  console.log('payload', payload);

  try {
    const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/create', { data: payload });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export function mapRowToApiDetail(row: any): any {
  //   console.log('row', row);

  return {
    // should be set based on info
    exportToExcel: false,
    existenceCategoryID: row.category,
    // existenceCategoryTitle: row.category,

    //should be set later
    stuffParentID: null,
    // stuffParentTitle: row.items,
    description: row.description,
    //should be set based on info
    stuffDefectiveStatusCode: 1,
    // should be set based on info
    statusCode: 0,
    performaInvoiceDetailAgentsReducingIncreasingList: [
      {
        //should be set based on info
        exportToExcel: false,
        priceAgent: 0,
        percentAgent: 0,
        // agentsReducingIncreasingTitle: '',
        agentsReducingIncreasingID: '',
        invoiceSaleAfterServiceDetailID: null,
        amountAgent: 0,
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
    costTotal: row.itemTotalPrice || 0,
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
      : '',
    descriptionHeader: localStorage.getItem('header-info-desc')
      ? JSON.parse(localStorage.getItem('header-info-desc')!)
      : '',
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
        amountAgen: 0,
        agentsReducingIncreasingID: '',
        invoiceSaleAfterServiceHeaderID: '',
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

    setProformaList(data.rows);
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const createProformaStuff = async (values: any) => {
  const categoryId = localStorage.getItem('category-initialValue') || '';

  try {
    const { data } = await customAxiosInstance.post('/Stuff/create', {
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
