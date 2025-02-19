import type { Dispatch, SetStateAction } from 'react';

import './columns.css';

import { Button, Select, Table } from 'antd';
import React, { useEffect } from 'react';

import FooterTableColumns from './FooterTableColumns';

function ProformaTable({
  tableData,
  columns,
  formatMessage,
  setFooterInsuranceCoefficient,
  footerInsuranceCoefficient,
  insurancePrice,
  setinsurancePrice,
  setTotalCostOfRows,
  totalCostOfRows,
}: {
  tableData: any;
  columns: any;
  formatMessage: any;
  setFooterInsuranceCoefficient: Dispatch<SetStateAction<string>>;
  footerInsuranceCoefficient: string;
  insurancePrice: number;
  setinsurancePrice: Dispatch<SetStateAction<number>>;
  setTotalCostOfRows: Dispatch<SetStateAction<number>>;
  totalCostOfRows: number;
}) {
  useEffect(() => {
    // جمع قیمت فروش
    const totalCost = tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0), 0);

    setTotalCostOfRows(totalCost);

    //   مبلغ بیمه
    const calculatedInsurancePrice = Number(footerInsuranceCoefficient) * totalCost;

    setinsurancePrice(calculatedInsurancePrice);
  }, [tableData, footerInsuranceCoefficient, setTotalCostOfRows, setinsurancePrice]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowClassName="editable-row"
        scroll={{ x: 2000 }}
        footer={() => {
          // تعداد
          const totalQty = tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.qty) || 0), 0);
          // جمع هزینه
          const totalCostWithout = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
            0,
          );
          //   جمع قیمت فروش نهایی فاکتور
          const totalFinalSalePrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.finalSalePrice) || 0),
            0,
          );
          // vat
          const vat = 0.1 * totalFinalSalePrice;
          // total
          const total = vat + totalFinalSalePrice;
          // 10 درصد مالیات بر ارزش افزوده
          const tenPercentTax = 0.1 * totalFinalSalePrice;
          // مبلغ سود نهایی پس از کسر مالیات، بیمه و هزینه ها
          const finalProfit = totalFinalSalePrice - tenPercentTax - insurancePrice - totalCostWithout;
          // حاشیه سود نهایی
          const totalProfitMargin = totalFinalSalePrice > 0 ? (finalProfit * 100) / totalFinalSalePrice : 0;
          // چک مبلغ بیمه
          const insuranceCheckAmount = 0.0778 * totalFinalSalePrice;

          const FooterTableData = [
            {
              totalQty: totalQty,
              totalCostWithFactors: `${totalCostOfRows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              totalCostWithoutFactors: `${totalCostWithout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              totalFinalSalePrice: `${totalFinalSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              vat: `${vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              tenPercentTax: `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              total: `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              finalProfit: `${finalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              finalProfitMargin: `${totalProfitMargin}`,
              insuranceCheckAmount: `${Math.round(insuranceCheckAmount)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              footerInsurancePrice: `${Math.round(insurancePrice)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            },
          ];

          // Render the footer
          const footerContent = (
            <div
              style={{
                backgroundColor: '#fffeff',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // gap: '0.5rem',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                width: '100%',
              }}
            >
              <span>
                {Math.round(insurancePrice)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
              <Select
                bordered={false}
                value={footerInsuranceCoefficient}
                placeholder={`${formatMessage({
                  id: 'app.home.detailInfo.table.footerInsurancePrice',
                })}`}
                onChange={value => setFooterInsuranceCoefficient(value)}
                options={[
                  { label: '0.085', value: '0.085' },
                  { label: '0.2', value: '0.2' },
                  { label: '0', value: '0' },
                ]}
                style={{ outline: 'none' }}
              />
            </div>
          );

          return <FooterTableColumns tableData={FooterTableData} footerContent={footerContent} />;
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary">{formatMessage({ id: 'app.home.submissionBtn' })}</Button>
      </div>
    </div>
  );
}

export default ProformaTable;
