import { SearchOutlined } from '@ant-design/icons';
import { faCheck, faCopy, faPenToSquare, faPrint, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import moment from 'moment-jalaali';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';

import { getCustomersList } from '../costumer-info/util';
import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import { confirmProforma, copyConfirmedProformaInfo, getEngReport, getPerReport, getSingleProformaInfo } from './util';

export function ListOfProformaColumns({
  deleteRow,
  handleEdit,
  copyRow,
  refreshList,
  handleCopy,
}: {
  deleteRow: (key: string) => void;
  handleEdit: any;
  copyRow: any;
  refreshList: any;
  handleCopy: any;
}) {
  const { locale } = useSelector(state => state.user);
  const { formatMessage } = useLocale();
  const {
    setSingleProformaInfo,
    setHeaderData,
    setProformaStatus,
    setSelectedProformaInfo,
    isCopyingProforma,
    isCopyingProformaTableRow,
    setIsLoadingProformaInfo,
  } = useContext(IsEdittingProformaContext);

  // console.log('header data in listofproforma columns', headerData);
  const [customers, setCustomers] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    getCustomersList((rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.text ? item.text : '',
        value: item.id ? item.id : '',
      }));

      setCustomers(transformed);
    }, locale);
  }, [locale]);

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`${formatMessage({ id: 'gloabal.listcolumns.search' })}`}
          value={selectedKeys[0]}
          onChange={e => {
            const value = e.target.value;

            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false });
          }}
          // allowClear
          style={{ width: 180, display: 'block' }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string, record: any) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false,
  });

  return [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (_: any, record: any, index: number) => <span style={{ textAlign: 'center' }}>{index + 1}</span>,
    },
    // مشتری
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.customer' })}</span>,
      dataIndex: 'CustomerTitle',
      key: 'CustomerTitle',
      width: 1000,
      ...getColumnSearchProps('CustomerTitle'),
      render: (customerId: string) => {
        const customer = customers.find(c => c.value === customerId);

        return <span style={{ textAlign: 'center' }}>{customer?.label || customerId}</span>;
      },
    },
    // نام ایونت
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.eventName' })}</span>,
      dataIndex: 'Event',
      key: 'Event',
      width: 1000,
      ...getColumnSearchProps('Event'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تاریخ
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.date' })}</span>,
      dataIndex: 'Date',
      key: 'Date',
      width: 300,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`${formatMessage({ id: 'gloabal.listcolumns.search' })}`}
            value={selectedKeys[0]}
            onChange={e => {
              const value = e.target.value;

              setSelectedKeys(value ? [value] : []);
              confirm({ closeDropdown: false });
            }}
            style={{ width: 180, display: 'block' }}
          />
        </div>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value: string, record: any) => {
        const formattedDate = moment(record['Date'], 'YYYY-MM-DDTHH:mm:ss').format('YYYY/MM/DD');

        return formattedDate.includes(value);
      },
      render: (text: string) => (
        <span style={{ textAlign: 'center' }}>
          {locale === 'en_US'
            ? moment(text, 'YYYY-MM-DDTHH:mm:ss').format('YYYY/MM/DD')
            : moment(text, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jMM/jDD')}
        </span>
      ),
    },
    // تعداد کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.totalQty' })}</span>,
      dataIndex: 'QuantityTotal',
      key: 'QuantityTotal',
      width: 300,
      ...getColumnSearchProps('QuantityTotal'),
      render: (text: number) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه واحد کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.unitCostTotal' })}</span>,
      dataIndex: 'UnitCostTotal',
      key: 'UnitCostTotal',
      width: 300,
      ...getColumnSearchProps('UnitCostTotal'),
      render: (text: number) => {
        return <span style={{ textAlign: 'center' }}>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>;
      },
    },
    // قیمت نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.finalPrice' })}</span>,
      dataIndex: 'PriceSaleFinalTotal',
      key: 'PriceSaleFinalTotal',
      width: 600,
      ...getColumnSearchProps('PriceSaleFinalTotal'),
      render: (text: number) => (
        <span style={{ textAlign: 'center' }}>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
      ),
    },
    // حاشیه سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.profitMarginTotal' })}</span>,
      dataIndex: 'ProfitMarginFinal',
      key: 'ProfitMarginFinal',
      width: 600,
      ...getColumnSearchProps('ProfitMarginFinal'),
      render: (text: number) => <span style={{ textAlign: 'center' }}>{text.toFixed(2)}</span>,
    },
    // تایید وضعیت
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.proformaStatus' })}</span>,
      dataIndex: 'StatusTitle',
      key: 'StatusTitle',
      width: 200,
      ...getColumnSearchProps('StatusTitle'),
      render: (text: any, record: any) => (
        <span className="center-align" style={{ textWrap: 'nowrap' }}>
          {text === 'تایید شده' ? (
            locale === 'fa_IR' ? (
              text
            ) : (
              'confirmed'
            )
          ) : (
            <FontAwesomeIcon
              icon={faCheck}
              onClick={() =>
                confirmProforma(record.ID, setProformaStatus).then(() => {
                  refreshList();
                })
              }
              className="status-icon"
              style={{ cursor: 'pointer', marginRight: 8 }}
            />
          )}
        </span>
      ),
    },
    // چاپ انگلیسی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.printEng' })}</span>,
      dataIndex: 'eng-print',
      key: 'eng-print',
      width: 200,
      render: (_: any, record: any) => {
        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faPrint}
              onClick={() => getEngReport(record.ID, record.CustomerTitle, record.Date)}
              className="print-icon"
              style={{ cursor: 'pointer', marginRight: 8 }}
            />
          </span>
        );
      },
    },
    // چاپ فارسی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.printPer' })}</span>,
      dataIndex: 'per-print',
      key: 'per-print',
      width: 200,
      render: (_: any, record: any) => {
        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faPrint}
              onClick={() => getPerReport(record.ID, record.CustomerTitle, record.Date)}
              className="print-icon"
              style={{ cursor: 'pointer', marginRight: 8 }}
            />
          </span>
        );
      },
    },
    // ویرایش
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.edit' })}</span>,
      dataIndex: 'edit',
      key: 'edit',
      width: 200,
      render: (_: any, record: any) => {
        const isRegistered = record.StatusTitle === 'ثبت شده';

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={async () => {
                if (isRegistered) {
                  await copyConfirmedProformaInfo(
                    record.ID,
                    setSingleProformaInfo,
                    setHeaderData,
                    isCopyingProforma,
                    isCopyingProformaTableRow,
                    setIsLoadingProformaInfo,
                    locale,
                  );
                  // await getSingleProformaInfo(
                  //   record.ID,
                  //   setSingleProformaInfo,
                  //   setHeaderData,
                  //   isCopyingProforma,
                  //   isCopyingProformaTableRow,
                  //   setIsLoadingProformaInfo,
                  //   locale,
                  // );
                  setSelectedProformaInfo({ id: record.ID, code: record.Code, key: record.key });
                  handleEdit(record);
                }
                //  else {
                //   await copyConfirmedProformaInfo(
                //     record.ID,
                //     setSingleProformaInfo,
                //     setHeaderData,
                //     isCopyingProforma,
                //     isCopyingProformaTableRow,
                //     setIsLoadingProformaInfo,
                //     locale,
                //   );
                //   setSelectedProformaInfo({ id: record.ID, code: record.Code, key: record.key });
                //   handleCopy(record);
                // }
              }}
              style={{
                cursor: isRegistered ? 'pointer' : 'default',
                marginRight: 8,
                color: isRegistered ? 'darkblue' : 'gray',
              }}
              // className="edit-icon"
            />
          </span>
        );
      },
    },
    // کپی
    {
      title: <span className="center-align">{formatMessage({ id: 'gloabal.columns.copy' })}</span>,
      dataIndex: 'copy',
      key: 'copy',
      render: (_: any, record: any) => {
        const isRegistered = record.StatusTitle === 'ثبت شده';

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faCopy}
              onClick={async () => {
                if (isRegistered) {
                  await getSingleProformaInfo(
                    record.ID,
                    setSingleProformaInfo,
                    setHeaderData,
                    isCopyingProforma,
                    isCopyingProformaTableRow,
                    setIsLoadingProformaInfo,
                    locale,
                  );
                  setSelectedProformaInfo({ id: record.ID, code: record.Code, key: record.key });
                  handleCopy(record);
                } else {
                  await copyConfirmedProformaInfo(
                    record.ID,
                    setSingleProformaInfo,
                    setHeaderData,
                    isCopyingProforma,
                    isCopyingProformaTableRow,
                    setIsLoadingProformaInfo,
                    locale,
                  );
                  setSelectedProformaInfo({ id: record.ID, code: record.Code, key: record.key });
                  handleCopy(record);
                }
              }}
              style={{
                cursor: 'pointer',
                // cursor: isRegistered ? 'pointer' : 'default',
                marginRight: 8,
                // color: isRegistered ? 'darkgreen' : 'gray',
              }}
              // className="copy-icon"
            />
          </span>
        );
      },
    },
    // حذف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.delete' })}</span>,
      dataIndex: 'delete',
      key: 'delete',
      render: (_: any, record: any) => {
        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                deleteRow(record);
              }}
              style={{ cursor: 'pointer', marginRight: 8 }}
              className="delete-icon"
            />
          </span>
        );
      },
    },
  ];
}
