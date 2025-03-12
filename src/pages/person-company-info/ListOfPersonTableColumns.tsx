import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useLocale } from '@/locales';

export function ListOfPersonTableColumns({ deleteRow }: { deleteRow: (key: string) => void }) {
  const { formatMessage } = useLocale();

  return [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // کد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.code' })}</span>,
      dataIndex: 'code',
      key: 'code',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // نوع
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.type' })}</span>,
      dataIndex: 'type',
      key: 'type',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // عنوان
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.title' })}</span>,
      dataIndex: 'title',
      key: 'title',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // شناسه / کدملی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.nationalID' })}</span>,
      dataIndex: 'nationalID',
      key: 'nationalID',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تلفن
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.telephone' })}</span>,
      dataIndex: 'telephone',
      key: 'telephone',
      width: 600,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // موبایل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.mobile' })}</span>,
      dataIndex: 'mobile',
      key: 'mobile',
      width: 250,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // استان
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.province' })}</span>,
      dataIndex: 'province',
      key: 'province',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    //شهر
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.city' })}</span>,
      dataIndex: 'city',
      key: 'city',
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // ویرایش
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.edit' })}</span>,
      dataIndex: 'edit',
      key: 'edit',
      width: 200,
      render: (_: any, record: any) => {
        // const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faPenToSquare}
              // onClick={() => {
              //   if (!isDisabled) {
              //     deleteRow(record.key);
              //   }
              // }}
              // style={{
              //   cursor: isDisabled ? 'not-allowed' : 'pointer',
              //   marginRight: 8,
              //   opacity: isDisabled ? 0.4 : 1,
              // }}
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
        // const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                deleteRow(record.key);
              }}
              // style={{
              //   cursor: isDisabled ? 'not-allowed' : 'pointer',
              //   marginRight: 8,
              //   opacity: isDisabled ? 0.4 : 1,
              // }}
            />
          </span>
        );
      },
    },
  ];
}
