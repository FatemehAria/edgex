function GroupItemTableColumn({
  handleDelete,
  formatMessage,
}: {
  handleDelete: (index: string | number) => void;
  formatMessage: any;
}) {
  return [
    {
      title: `${formatMessage({ id: 'app.productInfo.grouping.columns.row' })}`,
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: `${formatMessage({ id: 'app.productInfo.grouping.columns.group' })}`,
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: `${formatMessage({ id: 'app.productInfo.grouping.columns.product' })}`,
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: `${formatMessage({ id: 'app.productInfo.grouping.columns.delete' })}`,
      dataIndex: 'delete',
      key: 'delete',
      render: (text: any, record: any) => (
        <span onClick={() => handleDelete(record.index)} style={{ cursor: 'pointer' }}>
          {text}
        </span>
      ),
    },
  ];
}

export default GroupItemTableColumn;
