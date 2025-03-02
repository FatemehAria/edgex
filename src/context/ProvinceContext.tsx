import { createContext } from 'react';

type ProvinceContextType = {
  provinceList: any[];
  setProvinceList: React.Dispatch<React.SetStateAction<never[]>>;
};

export const ProvinceContext = createContext<ProvinceContextType>({
  provinceList: [],
  setProvinceList: () => {},
});
