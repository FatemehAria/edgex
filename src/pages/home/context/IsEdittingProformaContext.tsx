import type { Dispatch, SetStateAction } from 'react';

import { createContext } from 'react';

type EditProformaContextType = {
  isEdittingProforma: boolean;
  isCopyingProforma: boolean;
  singleProformaInfo: any;
  headerData: any;
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
  setHeaderData: () => {},
  setIsEdittingProforma: () => {},
  setIsCopyingProforma: () => {},
  setSingleProformaInfo: () => {},
});
