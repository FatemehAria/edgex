import React, { useState } from 'react';

function ProductInfo() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <p onClick={() => setTab(0)}>اطلاعات اصلی</p>
        <p onClick={() => setTab(1)}>ویژگی ها</p>
        <p onClick={() => setTab(2)}>گروه بندی</p>
      </div>

      
    </div>
  );
}

export default ProductInfo;
