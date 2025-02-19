import type { Dispatch, SetStateAction } from 'react';

import './columns.css';

import { Button, Select, Table } from 'antd';
import React, { useEffect } from 'react';

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
          const totalProfitMargin = (finalProfit * 100) / totalFinalSalePrice;
          // چک مبلغ بیمه
          const insuranceCheckAmount = 0.0778 * totalFinalSalePrice;

          return (
            <div
              style={{
                textAlign: 'left',
                padding: '0.5rem',
                // paddingRight: '1rem',
                backgroundColor: '#800000',
                borderRadius: '5px',
              }}
            >
              <p
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  // alignItems: 'center',
                  gap: '0.5rem',
                  color: 'white',
                }}
              >
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalQty' })}: {totalQty}
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithFactors' })}:{' '}
                  {totalCostOfRows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithoutFactors' })}:{' '}
                  {totalCostWithout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalFinalSalePrice' })}:{' '}
                  {totalFinalSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.vat' })}:{' '}
                  {vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.total' })}:{' '}
                  {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.tenPercentTax' })}:{' '}
                  {tenPercentTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span
                  className="center-align"
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
                >
                  {formatMessage({ id: 'app.home.detailInfo.table.footerInsurancePrice' })}:
                  <Select
                    value={
                      insurancePrice !== 0
                        ? Math.round(insurancePrice)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : footerInsuranceCoefficient
                    }
                    placeholder={`${formatMessage({ id: 'app.home.detailInfo.table.footerInsurancePrice' })}`}
                    onChange={value => setFooterInsuranceCoefficient(value)}
                    options={[
                      { label: '0.085', value: '0.085' },
                      { label: '0.2', value: '0.2' },
                      { label: '0', value: '0' },
                    ]}
                  />
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.finalProfit' })}:{' '}
                  {finalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.finalProfitMargin' })}: {totalProfitMargin}
                </span>
                <span className="center-align">
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.insuranceCheckAmount' })}:{' '}
                  {Math.round(insuranceCheckAmount)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
              </p>
            </div>
          );
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary">{formatMessage({ id: 'app.home.submissionBtn' })}</Button>
      </div>
    </div>
  );
}

export default ProformaTable;
