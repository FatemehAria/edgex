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
  const { theme } = useSelector((state: any) => state.global);

  useEffect(() => {
    // Calculate the total cost (sum of itemTotalPrice)
    const totalCost = tableData.reduce(
      (sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0),
      0,
    );
    setTotalCostOfRows(totalCost);

    // Calculate the insurance price based on the footer coefficient
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
          const totalFinalSalePrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.finalSalePrice) || 0),
            0,
          );
          const vat = 0.1 * totalFinalSalePrice;
          const total = vat + totalFinalSalePrice;
          const tenPercentTax = 0.1 * totalFinalSalePrice;
          const finalProfit =
            totalFinalSalePrice -
            tenPercentTax -
            insurancePrice -
            tableData.reduce(
              (sum: number, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
              0,
            );
          const totalProfitMargin = totalFinalSalePrice > 0 ? (finalProfit * 100) / totalFinalSalePrice : 0;
          const insuranceCheckAmount = 0.0778 * totalFinalSalePrice;

          const FooterTableData = [
            {
              vat: `${Math.round(vat).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              total: `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              finalProfit: `${finalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              finalProfitMargin: `${totalProfitMargin}`,
              insuranceCheckAmount: `${Math.round(insuranceCheckAmount)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            },
          ];

          const footerContent = <div></div>;
          return <FooterTableColumns tableData={FooterTableData} footerContent={footerContent} />;
        }}
        summary={() => {
          const totalQty = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.qty) || 0),
            0,
          );
          const totalUnitCosts = tableData.reduce(
            (sum: number, row: any) =>
              sum + (parseFloat(String(row.unitCost).replace(/,/g, '')) || 0),
            0,
          );
          const totalCostWithout = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
            0,
          );
          const totalFinalSalePrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.finalSalePrice) || 0),
            0,
          );
          const totalItemTotalPrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0),
            0,
          );

          return (
            <Table.Summary>
              <Table.Summary.Row style={{ backgroundColor: '#8ebfbb', textAlign: 'center' }}>
                {columns.map((col: any, index: any) => {
                  if (col.dataIndex === 'qty') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalQty}</strong>
                      </Table.Summary.Cell>
                    );
                  }
                  if (col.dataIndex === 'unitCost') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalUnitCosts}</strong>
                      </Table.Summary.Cell>
                    );
                  }
                  if (col.dataIndex === 'totalPriceWithoutFactors') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>
                          {totalCostWithout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </strong>
                      </Table.Summary.Cell>
                    );
                  }
                  if (col.dataIndex === 'totalCostWithFactors') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>
                          {totalCostOfRows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </strong>
                      </Table.Summary.Cell>
                    );
                  }
                  if (col.dataIndex === 'finalSalePrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>
                          {totalFinalSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </strong>
                      </Table.Summary.Cell>
                    );
                  }
                  if (col.dataIndex === 'itemTotalPrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>
                          {totalItemTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </strong>
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