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
    // شماره فرم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.formNumber' })}</span>,
      dataIndex: 'reports-form-number',
      key: 'reports-form-number',
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
    // استان
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.province' })}</span>,
      dataIndex: 'reports-province',
      key: 'reports-province',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // شهر
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.city' })}</span>,
      dataIndex: 'reports-city',
      key: 'reports-city',
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
    // تاریخ
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.date' })}</span>,
      dataIndex: 'reports-date',
      key: 'reports-date',
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
    // نرخ آیتم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.rate' })}</span>,
      dataIndex: 'reports-rate',
      key: 'reports-rate',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه خدمت
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.serviceCost' })}</span>,
      dataIndex: 'reports-cost',
      key: 'reports-cost',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // افزاینده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.inc' })}</span>,
      dataIndex: 'reports-inc',
      key: 'reports-inc',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // کاهنده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.dec' })}</span>,
      dataIndex: 'reports-dec',
      key: 'reports-dec',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalCost' })}</span>,
      dataIndex: 'reports-final-cost',
      key: 'reports-final-cost',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
  ];

  return columns;
}

export default ReportsColumns;
