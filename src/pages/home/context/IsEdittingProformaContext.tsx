import type { Dispatch, SetStateAction } from 'react';

import { createContext } from 'react';

type EditProformaContextType = {
  isEdittingProforma: boolean;
  isCopyingProforma: boolean;
  singleProformaInfo: any;
  headerData: any;
  proformaStatus: boolean;
  selectedProformaInfo: { id: string; code: string };
  setSelectedProformaInfo: Dispatch<SetStateAction<{ id: string; code: string }>>;
  setProformaStatus: Dispatch<SetStateAction<boolean>>;
  setHeaderData: Dispatch<SetStateAction<any>>;
  setIsEdittingProforma: Dispatch<SetStateAction<boolean>>;
  setIsCopyingProforma: Dispatch<SetStateAction<boolean>>;
  setSingleProformaInfo: Dispatch<SetStateAction<any>>;
};

export const IsEdittingProformaContext = createContext<EditProformaContextType>({
  isEdittingProforma: false,
  isCopyingProforma: false,
  singleProformaInfo: [],
  headerData: [],
  proformaStatus: false,
  selectedProformaInfo: { id: '', code: '' },
  setSelectedProformaInfo: () => {},
  setProformaStatus: () => {},
  setHeaderData: () => {},
  setIsEdittingProforma: () => {},
  setIsCopyingProforma: () => {},
  setSingleProformaInfo: () => {},
});
