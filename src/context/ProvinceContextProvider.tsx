import React, { useState } from 'react';

import { ProvinceContext } from './ProvinceContext';

function ProvinceContextProvider({ children }: { children: React.ReactNode }) {
  const [provinceList, setProvinceList] = useState([]);

  return <ProvinceContext.Provider value={{ provinceList, setProvinceList }}>{children}</ProvinceContext.Provider>;
}

export default ProvinceContextProvider;
