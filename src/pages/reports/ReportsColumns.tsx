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
      dataIndex: 'reports-date',
      key: 'reports-date',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // رویداد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.event' })}</span>,
      dataIndex: 'reports-event',
      key: 'reports-event',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // مشتری
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.customer' })}</span>,
      dataIndex: 'reports-customer',
      key: 'reports-customer',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تامین کننده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.supplier' })}</span>,
      dataIndex: 'reports-supplier',
      key: 'reports-supplier',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // گروهبندی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.group' })}</span>,
      dataIndex: 'reports-group',
      key: 'reports-group',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // آیتم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.item' })}</span>,
      dataIndex: 'reports-item',
      key: 'reports-item',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تعداد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.qty' })}</span>,
      dataIndex: 'reports-qty',
      key: 'reports-qty',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه واحد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.unitCost' })}</span>,
      dataIndex: 'reports-unitCost',
      key: 'reports-unitCost',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.totalCost' })}</span>,
      dataIndex: 'reports-totalCost',
      key: 'reports-totalCost',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // حاشیه سود
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.profitMargin' })}</span>,
      dataIndex: 'reports-profitMargin',
      key: 'reports-profitMargin',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // سهم آیتم از بیمه و مالیات
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.shareOftaxAndIncome' })}</span>,
      dataIndex: 'reports-shareOfTaxAndIncome',
      key: 'reports-shareOfTaxAndIncome',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // قیمت فروش آیتم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.itemSalesPrice' })}</span>,
      dataIndex: 'reports-itemSalesPrice',
      key: 'reports-itemSalesPrice',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // قیمت فروش آیتم رند شده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.itemSalesPriceRounded' })}</span>,
      dataIndex: 'reports-itemSalesPriceRounded',
      key: 'reports-itemSalesPriceRounded',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // قیمت نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalPice' })}</span>,
      dataIndex: 'reports-finalPrice',
      key: 'reports-finalPrice',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // حاشیه سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalProfitMargin' })}</span>,
      dataIndex: 'reports-finalProfitMargin',
      key: 'reports-finalProfitMargin',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // مبلغ سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalProfitPrice' })}</span>,
      dataIndex: 'reports-finalProfitPrice',
      key: 'reports-finalProfitPrice',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
  ];

  return columns;
}

export default ReportsColumns;
