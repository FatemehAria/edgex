import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import moment from 'moment-jalaali';

import { useLocale } from '@/locales';

function ReportsColumns() {
  const { formatMessage } = useLocale();

  const getColumnSearchProps = (dataIndex: string, columnWidth: number) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
      <div style={{ padding: 2, width: columnWidth }}>
        <Input
          placeholder={`${formatMessage({ id: 'gloabal.listcolumns.search' })}`}
          value={selectedKeys[0]}
          onChange={e => {
            const value = e.target.value;

            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false });
          }}
          // allowClear
          style={{ width: '100%' }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string, record: any) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false,
  });

  const columns = [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span>{text}</span>,
    },
    // تاریخ
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.date' })}</span>,
      dataIndex: 'Date',
      key: 'Date',
      width: 300,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
        <div style={{ padding: 2, width: 300 }}>
          <Input
            placeholder={`${formatMessage({ id: 'gloabal.listcolumns.search' })}`}
            value={selectedKeys[0]}
            onChange={e => {
              const value = e.target.value;

              setSelectedKeys(value ? [value] : []);
              confirm({ closeDropdown: false });
            }}
            style={{ width: '100%' }}
          />
        </div>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value: string, record: any) => {
        const formattedDate = moment(record.Date, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jMM/jDD');

        return formattedDate.includes(value);
      },
      render: (text: string) => <span>{moment(text, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jMM/jDD')}</span>,
    },
    // رویداد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.event' })}</span>,
      dataIndex: 'Event',
      key: 'Event',
      width: 300,
      ...getColumnSearchProps('Event', 300),
      render: (text: string) => <span>{text}</span>,
    },
    // مشتری
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.customer' })}</span>,
      dataIndex: 'CustomerTitle',
      key: 'CustomerTitle',
      width: 300,
      ...getColumnSearchProps('CustomerTitle', 300),
      render: (text: string) => <span>{text}</span>,
    },
    // تامین کننده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.supplier' })}</span>,
      dataIndex: 'SuplierTitle',
      key: 'SuplierTitle',
      width: 300,
      ...getColumnSearchProps('SuplierTitle', 300),
      render: (text: string) => <span>{text ? text : '-'}</span>,
    },
    // گروهبندی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.group' })}</span>,
      dataIndex: 'ExistenceCategoryTitle',
      key: 'ExistenceCategoryTitle',
      width: 300,
      ...getColumnSearchProps('ExistenceCategoryTitle', 300),
      render: (text: string) => <span>{text ? text : '-'}</span>,
    },
    //  گروهبندی مودیفای شده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.groupModified' })}</span>,
      dataIndex: 'ExistenceCategoryTitleModified',
      key: 'ExistenceCategoryTitleModified',
      width: 300,
      ...getColumnSearchProps('ExistenceCategoryTitleModified', 300),
      render: (text: string) => <span>{text ? text : '-'}</span>,
    },
    // آیتم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.item' })}</span>,
      dataIndex: 'StuffParentTitle',
      key: 'StuffParentTitle',
      width: 300,
      ...getColumnSearchProps('StuffParentTitle', 300),
      render: (text: string) => <span>{text ? text : '-'}</span>,
    },
    // آیتم مودیفای شده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.itemModified' })}</span>,
      dataIndex: 'StuffParentTitleModified',
      key: 'StuffParentTitleModified',
      width: 300,
      ...getColumnSearchProps('StuffParentTitleModified', 300),
      render: (text: string) => <span>{text ? text : '-'}</span>,
    },
    // تعداد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.qty' })}</span>,
      dataIndex: 'QuantityTotal',
      key: 'QuantityTotal',
      width: 300,
      ...getColumnSearchProps('QuantityTotal', 300),
      render: (text: number) => <span>{text}</span>,
    },
    // هزینه واحد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.unitCost' })}</span>,
      dataIndex: 'CostUnit',
      key: 'CostUnit',
      width: 300,
      ...getColumnSearchProps('CostUnit', 300),
      render: (text: number) => {
        return <span>{text ? text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}</span>;
      },
    },
    // هزینه کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.totalCost' })}</span>,
      dataIndex: 'CostTotal',
      key: 'CostTotal',
      width: 300,
      ...getColumnSearchProps('CostTotal', 300),
      render: (text: number) => <span>{text ? text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}</span>,
    },
    // // حاشیه سود
    // {
    //   title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.profitMargin' })}</span>,
    //   dataIndex: 'ProfitMarginFinal',
    //   key: 'ProfitMarginFinal',
    //   width: 300,
    //   render: (text: string) => <span>{text}</span>,
    // },
    // سهم آیتم از بیمه و مالیات
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.shareOftaxAndIncome' })}</span>,
      dataIndex: 'InsuranceTax',
      key: 'InsuranceTax',
      width: 300,
      ...getColumnSearchProps('InsuranceTax', 300),
      render: (text: number) => (
        <span>
          {text
            ? text?.toFixed(4).toString()
            : // .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              '-'}
        </span>
      ),
    },
    // قیمت فروش آیتم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.itemSalesPrice' })}</span>,
      dataIndex: 'PriceSale',
      key: 'PriceSale',
      width: 300,
      ...getColumnSearchProps('PriceSale', 300),
      render: (text: number) => (
        <span>
          {text
            ? text
                ?.toFixed(3)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : '-'}
        </span>
      ),
    },
    // قیمت فروش آیتم رند شده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.itemSalesPriceRounded' })}</span>,
      dataIndex: 'PriceSaleRounded',
      key: 'PriceSaleRounded',
      width: 300,
      ...getColumnSearchProps('PriceSaleRounded', 300),
      render: (text: number) => <span>{text ? text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}</span>,
    },
    // قیمت نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalPice' })}</span>,
      dataIndex: 'PriceSaleFinal',
      key: 'PriceSaleFinal',
      width: 300,
      ...getColumnSearchProps('PriceSaleFinal', 300),
      render: (text: number) => <span>{text ? text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}</span>,
    },
    // حاشیه سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalProfitMargin' })}</span>,
      dataIndex: 'ProfitMarginFinal',
      key: 'ProfitMarginFinal',
      width: 300,
      ...getColumnSearchProps('ProfitMarginFinal', 300),
      render: (text: number) => (
        <span>
          {text
            ? text
                ?.toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : '-'}
        </span>
      ),
    },
    // مبلغ سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.reports.columns.finalProfitPrice' })}</span>,
      dataIndex: 'ProfitFinalMinusInsuranceVatCostTotal',
      key: 'ProfitFinalMinusInsuranceVatCostTotal',
      width: 300,
      ...getColumnSearchProps('ProfitFinalMinusInsuranceVatCostTotal', 300),
      render: (text: number) => (
        <span>
          {text
            ? text
                ?.toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : '-'}
        </span>
      ),
    },
  ];

  return columns;
}

export default ReportsColumns;
