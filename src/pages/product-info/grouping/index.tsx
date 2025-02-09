import type { DataNode } from 'antd/es/tree';

import { TreeSelect } from 'antd';
import React, { useState } from 'react';

function Grouping() {
  const initTreeData: DataNode[] = [
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2', isLeaf: true },
  ];

  const [treeData, setTreeData] = useState(initTreeData);

  return (
    <div>
      <TreeSelect showSearch treeNodeFilterProp="title" treeData={treeData} />
    </div>
  );
}

export default Grouping;
