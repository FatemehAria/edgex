import type { Dispatch, SetStateAction } from 'react';

import { Button, Select, Table } from 'antd';

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
  insurancePrice: any;
  setinsurancePrice: any;
  setTotalCostOfRows: any;
  totalCostOfRows: any;
}) {
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
          // جمع قیمت فروش

          totalCostOfRows = tableData.reduce((sum: any, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0), 0);

          setTotalCostOfRows(totalCostOfRows);

          //   مبلغ بیمه
          insurancePrice = Number(footerInsuranceCoefficient) * totalCostOfRows;
          setinsurancePrice(insurancePrice);

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
                  {/* footerInsuranceCoefficient */}
                  <Select
                    value={footerInsuranceCoefficient}
                    placeholder="Select supplier"
                    onChange={value => setFooterInsuranceCoefficient(value)}
                    options={[
                      { label: '0.085', value: '0.085' },
                      { label: '0.2', value: '0.2' },
                      { label: '0', value: '0' },
                    ]}
                    style={{ width: '100%' }}
                  />
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
