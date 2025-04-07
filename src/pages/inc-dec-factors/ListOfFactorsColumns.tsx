import { SearchOutlined } from '@ant-design/icons';
import { faCopy, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';

import { useLocale } from '@/locales';

function ListOfFactorsColumns({
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

  const getBooleanColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`${formatMessage({ id: 'gloabal.listcolumns.search' })}`}
          value={selectedKeys[0] || ''}
          onChange={e => {
            const value = e.target.value.trim();

            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false });
          }}
          // allowClear
          onClear={() => {
            clearFilters();
            confirm({ closeDropdown: true });
          }}
          style={{ width: 180, display: 'block' }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string, record: any) => {
      if (!value) return true;
      const booleanValue = record[dataIndex]; // true or false
      const translatedValue = booleanValue ? 'بله' : 'خیر';

      return translatedValue.includes(value);
    },
  });

  return [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // کد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.code' })}</span>,
      dataIndex: 'Code',
      key: 'Code',
      width: 300,
      ...getColumnSearchProps('Code'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // عنوان
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.title' })}</span>,
      dataIndex: 'Title',
      key: 'Title',
      width: 300,
      ...getColumnSearchProps('Title'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تاثیر
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.influence' })}</span>,
      dataIndex: 'influcence',
      key: 'influcence',
      width: 300,
      ...getColumnSearchProps('influcence'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // نمایش در سند
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.document' })}</span>,
      dataIndex: 'displayDocument',
      key: 'displayDocument',
      width: 600,
      ...getBooleanColumnSearchProps('displayDocument'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text ? 'بله' : 'خیر'}</span>,
    },
    // نمایش در قلم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.pen' })}</span>,
      dataIndex: 'displayPen',
      key: 'displayPen',
      width: 250,
      ...getBooleanColumnSearchProps('displayPen'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text ? 'بله' : 'خیر'}</span>,
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
              onClick={() => handleEdit(record)}
              style={{ cursor: 'pointer', marginRight: 8 }}
              className="edit-icon"
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
            onClick={() => copyRow(record)}
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
        // const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

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

export default ListOfFactorsColumns;
