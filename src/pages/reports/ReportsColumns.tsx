import moment from 'moment-jalaali';

import { useLocale } from '@/locales';

function ReportsColumns() {
  const { formatMessage } = useLocale();

  const columns = [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تاریخ
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.date' })}</span>,
      dataIndex: 'Date',
      key: 'Date',
      width: 300,
      render: (text: string) => (
        <span style={{ textAlign: 'center' }}>{moment(text, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jMM/jDD')}</span>
      ),
    },
    // رویداد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.event' })}</span>,
      dataIndex: 'Event',
      key: 'Event',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // مشتری
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.customer' })}</span>,
      dataIndex: 'CustomerTitle',
      key: 'CustomerTitle',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تامین کننده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.supplier' })}</span>,
      dataIndex: 'SuplierTitle',
      key: 'SuplierTitle',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // گروهبندی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.group' })}</span>,
      dataIndex: 'ExistenceCategoryTitleModified',
      key: 'ExistenceCategoryTitleModified',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // آیتم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.item' })}</span>,
      dataIndex: 'StuffParentTitleModified',
      key: 'StuffParentTitleModified',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تعداد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.qty' })}</span>,
      dataIndex: 'QuantityTotal',
      key: 'QuantityTotal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه واحد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.unitCost' })}</span>,
      dataIndex: 'CostUnit',
      key: 'CostUnit',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.totalCost' })}</span>,
      dataIndex: 'CostTotal',
      key: 'CostTotal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // حاشیه سود
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.profitMargin' })}</span>,
      dataIndex: 'ProfitMarginFinal',
      key: 'ProfitMarginFinal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // سهم آیتم از بیمه و مالیات
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.shareOftaxAndIncome' })}</span>,
      dataIndex: 'InsuranceTax',
      key: 'InsuranceTax',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // قیمت فروش آیتم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.itemSalesPrice' })}</span>,
      dataIndex: 'PriceSale',
      key: 'PriceSale',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // قیمت فروش آیتم رند شده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.itemSalesPriceRounded' })}</span>,
      dataIndex: 'PriceSaleRounded',
      key: 'PriceSaleRounded',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // قیمت نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalPice' })}</span>,
      dataIndex: 'PriceSaleFinal',
      key: 'PriceSaleFinal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // حاشیه سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalProfitMargin' })}</span>,
      dataIndex: 'ProfitMarginFinal',
      key: 'ProfitMarginFinal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // مبلغ سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalProfitPrice' })}</span>,
      dataIndex: 'ProfitFinalMinusInsuranceVatCostTotal',
      key: 'ProfitFinalMinusInsuranceVatCostTotal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
  ];

  return columns;
}

export default ReportsColumns;
