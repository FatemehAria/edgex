import { SearchOutlined } from '@ant-design/icons';
import { faCopy, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';

import { useLocale } from '@/locales';

export function ListOfPersonTableColumns({
  deleteRow,
  handleEdit,
  copyRow,
}: {
  deleteRow: (key: string) => void;
  handleEdit: any;
  copyRow: any;
}) {
  const { formatMessage } = useLocale();

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
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // کد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.code' })}</span>,
      dataIndex: 'Code',
      key: 'Code',
      width: 300,
      ...getColumnSearchProps('Code'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // نوع
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.type' })}</span>,
      dataIndex: 'personTypeTitle',
      key: 'personTypeTitle',
      width: 300,
      ...getColumnSearchProps('personTypeTitle'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // عنوان
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.title' })}</span>,
      dataIndex: 'Title',
      key: 'Title',
      width: 300,
      ...getColumnSearchProps('Title'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // شناسه / کدملی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.nationalID' })}</span>,
      dataIndex: 'CodeNational',
      key: 'CodeNational',
      width: 300,
      ...getColumnSearchProps('CodeNational'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تلفن
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.telephone' })}</span>,
      dataIndex: 'Telephone',
      key: 'Telephone',
      width: 600,
      ...getColumnSearchProps('Telephone'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // موبایل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.mobile' })}</span>,
      dataIndex: 'Mobile',
      key: 'Mobile',
      width: 250,
      ...getColumnSearchProps('Mobile'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // استان
    // {
    //   title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.province' })}</span>,
    //   dataIndex: 'person-company-province',
    //   key: 'person-company-province',
    //   width: 300,
    //   render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    // },
    //شهر
    // {
    //   title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.city' })}</span>,
    //   dataIndex: 'person-company-city',
    //   key: 'person-company-city',
    //   render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    // },
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
              onClick={() => handleEdit(record)}
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
    // کپی
    {
      title: <span className="center-align">{formatMessage({ id: 'gloabal.columns.copy' })}</span>, // Adjust translation if needed
      dataIndex: 'copy',
      key: 'copy',
      render: (_: any, record: any) => (
        <span className="center-align">
          <FontAwesomeIcon
            icon={faCopy}
            onClick={() => copyRow(record)} // Call copy function
            style={{ cursor: 'pointer', marginRight: 8 }}
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
        // const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                deleteRow(record);
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
