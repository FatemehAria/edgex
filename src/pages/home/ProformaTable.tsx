import type { Dispatch, SetStateAction } from 'react';

import './columns.css';

import { Button, Select, Table } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
  const { theme } = useSelector(state => state.global);

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
          // const totalQty = tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.qty) || 0), 0);
          // جمع هزینه
          // const totalCostWithout = tableData.reduce(
          //   (sum: number, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
          //   0,
          // );
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
          // const tenPercentTax = 0.1 * totalFinalSalePrice;

          // مبلغ سود نهایی پس از کسر مالیات، بیمه و هزینه ها
          const finalProfit =
            totalFinalSalePrice -
            tenPercentTax -
            insurancePrice -
            tableData.reduce(
              (sum: number, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
              0, // Initial value added here
            );
          // حاشیه سود نهایی
          const totalProfitMargin = totalFinalSalePrice > 0 ? (finalProfit * 100) / totalFinalSalePrice : 0;
          // چک مبلغ بیمه
          const insuranceCheckAmount = 0.0778 * totalFinalSalePrice;

          const FooterTableData = [
            {
              // totalQty: totalQty,
              // totalCostWithFactors: `${totalCostOfRows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              // totalCostWithoutFactors: `${totalCostWithout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              // totalFinalSalePrice: `${totalFinalSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              vat: `${Math.round(vat)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              // tenPercentTax: `${tenPercentTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              // tenPercentTax: `${tenPercentTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
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
                // backgroundColor: '#fffeff',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                // gap: '0.5rem',
                padding: '0 0.5rem',
                borderRadius: '0.5rem',
                width: '200px',
                margin: 'auto',
                backgroundColor: `${theme === 'dark' ? 'black' : 'white'}`,
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
        summary={() => {
          // جمع تعداد
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

          //   جمع قیمت فروش
          const totalItemTotalPrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0),
            0,
          );

          return (
            <Table.Summary>
              <Table.Summary.Row style={{ backgroundColor: '#8ebfbb', textAlign: 'center' }}>
                {columns.map((col: any, index: any) => {
                  // For the qty column, display the total
                  if (col.dataIndex === 'qty') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalQty}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'totalPriceWithoutFactors') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalCostWithout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'totalCostWithFactors') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalCostOfRows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'finalSalePrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalFinalSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'itemTotalPrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalItemTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  return <Table.Summary.Cell index={index} key={col.key || index} />;
                })}
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <Button type="primary">{formatMessage({ id: 'app.home.submissionBtn' })}</Button>
      </div>
    </div>
  );
}

export default ProformaTable;
