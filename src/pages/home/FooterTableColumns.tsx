import './footerTableColumns.css';

import { Table } from 'antd';
import React from 'react';

import { useLocale } from '@/locales';

function FooterTableColumns({ tableData, footerContent }: { tableData: any; footerContent: React.ReactNode }) {
  const { formatMessage } = useLocale();
  const columns = [
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.footer.totalQty' })}</span>,
      dataIndex: 'totalQty',
      key: 'totalQty',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: (
        <span className="center-align">
          {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithFactors' })}
        </span>
      ),
      dataIndex: 'totalCostWithFactors',
      key: 'totalCostWithFactors',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: (
        <span className="center-align">
          {formatMessage({ id: 'app.home.detailInfo.table.footer.totalCostWithoutFactors' })}
        </span>
      ),
      dataIndex: 'totalCostWithoutFactors',
      key: 'totalCostWithoutFactors',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: (
        <span className="center-align">
          {formatMessage({ id: 'app.home.detailInfo.table.footer.totalFinalSalePrice' })}
        </span>
      ),
      dataIndex: 'totalFinalSalePrice',
      key: 'totalFinalSalePrice',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.footer.vat' })}</span>,
      dataIndex: 'vat',
      key: 'vat',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.footer.total' })}</span>,
      dataIndex: 'total',
      key: 'total',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: (
        <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.footer.tenPercentTax' })}</span>
      ),
      dataIndex: 'tenPercentTax',
      key: 'tenPercentTax',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: (
        <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.footerInsurancePrice' })}</span>
      ),
      dataIndex: 'footerInsurancePrice',
      key: 'footerInsurancePrice',
      render: () => <span style={{ textAlign: 'center' }}>{footerContent}</span>,
    },
    {
      title: (
        <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.footer.finalProfit' })}</span>
      ),
      dataIndex: 'finalProfit',
      key: 'finalProfit',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: (
        <span className="center-align">
          {formatMessage({ id: 'app.home.detailInfo.table.footer.finalProfitMargin' })}
        </span>
      ),
      dataIndex: 'finalProfitMargin',
      key: 'finalProfitMargin',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{Number(text).toFixed(9)}</span>,
    },
    {
      title: (
        <span className="center-align">
          {formatMessage({ id: 'app.home.detailInfo.table.footer.insuranceCheckAmount' })}
        </span>
      ),
      dataIndex: 'insuranceCheckAmount',
      key: 'insuranceCheckAmount',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
  ];

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        className="custom-footer-table"
        scroll={{ x: 2000 }}
      />
    </div>
  );
}

export default FooterTableColumns;
