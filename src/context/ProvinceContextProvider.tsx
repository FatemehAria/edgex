import React, { useEffect, useState } from 'react';

import { getProvince } from '@/utils/util';

import { ProvinceContext } from './ProvinceContext';

function ProvinceContextProvider({ children }: { children: React.ReactNode }) {
  const [provinceList, setProvinceList] = useState([]);

  useEffect(() => {
    getProvince(setProvinceList);
  }, []);

  return <ProvinceContext.Provider value={{ provinceList, setProvinceList }}>{children}</ProvinceContext.Provider>;
}

export default ProvinceContextProvider;
