import { customAxiosInstance } from '@/utils/axios-config';
import { Dispatch, SetStateAction } from 'react';

export const createProforma = async (payload: any) => {
  console.log('payload', payload);
  //   try {
  //     const { data } = await customAxiosInstance.post('/PerformaInvoiceHeader/create', values);
  //   } catch (error) {
  //     console.log(error);
  //   }
};

export function mapRowToApiDetail(row: any): any {
  //   console.log('row', row);

  return {
    existenceCategoryID: row.category,
    existenceCategoryTitle: row.category,
    stuffParentID: row.items,
    stuffParentTitle: row.items,
    description: row.description,
    performaInvoiceDetailAgentsReducingIncreasingList: [
      {
        priceAgent: 0,
        percentAgent: 0,
        agentsReducingIncreasingTitle: '',
        agentsReducingIncreasingID: '',
        invoiceSaleAfterServiceDetailID: '',
        amountAgent: 0,
      },
    ],
    suplierParentID: row.supplier,
    suplierParentTitle: row.supplier,
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
    priceSaleRounded: row.itemSalePriceRounded || 0,
    priceSaleFinal: row.finalSalePrice || 0,
    costTotal: row.itemTotalPrice || 0,
  };
}

export function calculateFinalValues(tableData: any[], insurancePrice: number) {
  const totalFinalSalePrice = tableData.reduce(
    (sum: number, row: any) => sum + (parseFloat(row.finalSalePrice) || 0),
    0,
  );
  const vat = 0.1 * totalFinalSalePrice;
  const total = vat + totalFinalSalePrice;
  const tenPercentTax = 0.1 * totalFinalSalePrice;
  const totalWithoutFactors = tableData.reduce(
    (sum: number, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
    0,
  );
  const finalProfit = totalFinalSalePrice - tenPercentTax - insurancePrice - totalWithoutFactors;
  const totalProfitMargin = totalFinalSalePrice > 0 ? (finalProfit * 100) / totalFinalSalePrice : 0;
  const insuranceCheckAmount = 0.0778 * totalFinalSalePrice;

  return {
    totalFinalSalePrice,
    vat,
    total,
    finalProfit,
    totalProfitMargin,
    insuranceCheckAmount,
  };
}

export function createProformaPayload(tableData: any, insurancePrice: any, isRowFilled: any) {
  const headerData = {
    customerTitle: localStorage.getItem('header-info-costumer')
      ? JSON.parse(localStorage.getItem('header-info-costumer')!)
      : '',
    descriptionHeader: localStorage.getItem('header-info-desc')
      ? JSON.parse(localStorage.getItem('header-info-desc')!)
      : '',
    eventTitle: localStorage.getItem('header-info-title') ? JSON.parse(localStorage.getItem('header-info-title')!) : '',
    date: localStorage.getItem('header-info-date') ? JSON.parse(localStorage.getItem('header-info-date')!) : '',
  };

  const finalValues = calculateFinalValues(tableData, insurancePrice);

  const detailList = tableData.filter((row: any) => isRowFilled(row)).map((row: any) => mapRowToApiDetail(row));

  return {
    ...headerData,
    performaInvoiceDetailList: detailList,
    priceSaleFinalTotal: finalValues.totalFinalSalePrice,
    profitMarginFinal: finalValues.totalProfitMargin,
    profitFinalMinusInsuranceVatCostTotal: finalValues.finalProfit,
  };
}

export const getStuffbyId = async (setStuffList: React.Dispatch<any>) => {
  const ID = localStorage.getItem('selected-cat-ID') ? JSON.parse(localStorage.getItem('selected-cat-ID')!) : '';

  try {
    const { data } = await customAxiosInstance(`/PerformaInvoiceHeader/GetStuffList/${ID}`);

    console.log(data);
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
