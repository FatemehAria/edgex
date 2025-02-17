import { Button, Table } from 'antd';
import React from 'react';

function ProformaTable({ tableData, columns, formatMessage }: { tableData: any; columns: any; formatMessage: any }) {
  return (
    <div>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowClassName="editable-row"
        scroll={{ x: 1500 }}
        footer={() => {
          const totalQty = tableData.reduce((sum: any, row: any) => sum + (parseFloat(row.qty) || 0), 0);
          const totalCostWithout = tableData.reduce(
            (sum: any, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
            0,
          );
          const totalCostOfRows = tableData.reduce(
            (sum: any, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0),
            0,
          );
          //   مبلغ بیمه
          const insurancePrice = 0.085 * totalCostOfRows;

          const totalDecremented = tableData.reduce((sum: any, row: any) => sum + (parseFloat(row.decFactors) || 0), 0);
          const totalIncremented = tableData.reduce((sum: any, row: any) => sum + (parseFloat(row.incFactors) || 0), 0);

          return (
            <div
              style={{
                textAlign: 'left',
                paddingRight: '1rem',
                backgroundColor: '#800000',
                borderRadius: '5px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'white',
                }}
              >
                <p>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalInc' })}: {totalIncremented}
                </p>
                <p>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalDec' })}: {totalDecremented}
                </p>
                <p>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalQty' })}: {totalQty}
                </p>
                <p>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithFactors' })}: {totalCostOfRows}
                </p>
                <p>
                  {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithoutFactors' })}:{' '}
                  {totalCostWithout}
                </p>
                <p>
                  {formatMessage({ id: 'app.home.detailInfo.table.footerInsurancePrice' })}:{insurancePrice}
                </p>
              </div>
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
