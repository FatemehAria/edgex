import type { Dispatch, SetStateAction } from 'react';

import { createContext } from 'react';

type EditProformaContextType = {
  isEdittingProforma: boolean;
  isCopyingProforma: boolean;
  singleProformaInfo: any;
  headerData: any;
  proformaStatus: boolean;
  selectedProformaInfo: { id: string; code: string; key: any };
  isCopyingProformaTableRow: boolean;
  isLoadingProformaInfo: boolean;
  setSelectedProformaInfo: Dispatch<SetStateAction<{ id: string; code: string; key: any }>>;
  setProformaStatus: Dispatch<SetStateAction<boolean>>;
  setHeaderData: Dispatch<SetStateAction<any>>;
  setIsEdittingProforma: Dispatch<SetStateAction<boolean>>;
  setIsCopyingProforma: Dispatch<SetStateAction<boolean>>;
  setIsCopyingProformaTableRow: Dispatch<SetStateAction<boolean>>;
  setSingleProformaInfo: Dispatch<SetStateAction<any>>;
  setIsLoadingProformaInfo: Dispatch<SetStateAction<boolean>>;
};

export const IsEdittingProformaContext = createContext<EditProformaContextType>({
  isEdittingProforma: false,
  isCopyingProforma: false,
  singleProformaInfo: [],
  headerData: [],
  proformaStatus: false,
  selectedProformaInfo: { id: '', code: '', key: '' },
  isCopyingProformaTableRow: false,
  isLoadingProformaInfo: false,
  setSelectedProformaInfo: () => {},
  setProformaStatus: () => {},
  setHeaderData: () => {},
  setIsEdittingProforma: () => {},
  setIsCopyingProforma: () => {},
  setIsCopyingProformaTableRow: () => {},
  setSingleProformaInfo: () => {},
  setIsLoadingProformaInfo: () => {},
});
