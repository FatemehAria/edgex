import type { Dispatch, SetStateAction } from 'react';

import { createContext } from 'react';

type SearchContextType = {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType>({
  searchInput: '',
  setSearchInput: () => {},
});
