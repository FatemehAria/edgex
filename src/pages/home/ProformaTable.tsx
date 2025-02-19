import type { Dispatch, SetStateAction } from 'react';

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
    <React.Fragment>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowClassName="editable-row"
        scroll={{ x: 2000 }}
        footer={() => {
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
                paddingRight: '1rem',
                backgroundColor: '#800000',
                borderRadius: '5px',
              }}
            >
              <p
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'white',
                }}
              >
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalQty' })}: {totalQty}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithFactors' })}: {totalCostOfRows}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithoutFactors' })}:{' '}
                  {totalCostWithout}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalFinalSalePrice' })}: {totalFinalSalePrice}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.vat' })}: {vat}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.total' })}: {total}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.tenPercentTax' })}: {tenPercentTax}
                </span>
                <span>
                  <Select
                    value={footerInsuranceCoefficient}
                    placeholder="Select coefficient"
                    onChange={value => setFooterInsuranceCoefficient(value)}
                    options={[
                      { label: '0.085', value: '0.085' },
                      { label: '0.2', value: '0.2' },
                      { label: '0', value: '0' },
                    ]}
                    style={{ width: '100%' }}
                  />
                  {formatMessage({ id: 'app.home.detailInfo.table.footerInsurancePrice' })}:{insurancePrice}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.finalProfit' })}: {finalProfit}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.finalProfitMargin' })}: {totalProfitMargin}
                </span>
                <span>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.insuranceCheckAmount' })}:{' '}
                  {insuranceCheckAmount}
                </span>
              </p>
            </div>
          );
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary">{formatMessage({ id: 'app.home.submissionBtn' })}</Button>
      </div>
    </React.Fragment>
  );
}

export default ProformaTable;
