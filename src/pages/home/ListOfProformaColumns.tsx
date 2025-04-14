import { faCheck, faCopy, faPenToSquare, faPrint, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-jalaali';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';

import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import { confirmProforma, getEngReport, getPerReport, getSingleProformaInfo } from './util';

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
    headerData,
  } = useContext(IsEdittingProformaContext);

  // console.log('header data in listofproforma columns', headerData);

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
      width: 300,
      render: (customer: any) => {
        return <span style={{ textAlign: 'center' }}> {customer?.label || customer}</span>;
      },
    },
    // نام ایونت
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.eventName' })}</span>,
      dataIndex: 'Event',
      key: 'Event',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تاریخ
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.date' })}</span>,
      dataIndex: 'Date',
      key: 'Date',
      width: 300,
      render: (text: string) => (
        <span style={{ textAlign: 'center' }}>{moment(text, 'YYYY-MM-DDTHH:mm:ss').format('YYYY/MM/DD')}</span>
      ),
    },
    // تعداد کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.totalQty' })}</span>,
      dataIndex: 'QuantityTotal',
      key: 'QuantityTotal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه واحد کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.unitCostTotal' })}</span>,
      dataIndex: 'UnitCostTotal',
      key: 'UnitCostTotal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // قیمت نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.finalPrice' })}</span>,
      dataIndex: 'PriceSaleFinalTotal',
      key: 'PriceSaleFinalTotal',
      width: 600,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // حاشیه سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.profitMarginTotal' })}</span>,
      dataIndex: 'ProfitMarginFinal',
      key: 'ProfitMarginFinal',
      width: 600,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تایید وضعیت
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.proformaStatus' })}</span>,
      dataIndex: 'StatusTitle',
      key: 'StatusTitle',
      width: 200,
      render: (text: any, record: any) => (
        <span className="center-align">
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
                  await getSingleProformaInfo(
                    record.ID,
                    setSingleProformaInfo,
                    setHeaderData,
                    isCopyingProforma,
                    isCopyingProformaTableRow,
                    setIsLoadingProformaInfo,
                    locale
                  );
                  setSelectedProformaInfo({ id: record.ID, code: record.Code, key: record.key });
                  handleEdit(record);
                }
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
      render: (_: any, record: any) => (
        <span className="center-align">
          <FontAwesomeIcon
            icon={faCopy}
            onClick={async () => {
              await getSingleProformaInfo(
                record.ID,
                setSingleProformaInfo,
                setHeaderData,
                isCopyingProforma,
                isCopyingProformaTableRow,
                setIsLoadingProformaInfo,
                locale
              );
              setSelectedProformaInfo({ id: record.ID, code: record.Code, key: record.key });
              handleCopy(record);
            }}
            style={{ cursor: 'pointer', marginRight: 8 }}
            className="copy-icon"
          />
        </span>
      ),
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
