import type { FilesInterface } from '@/interface/files.inerface';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

const initialState: FilesInterface = {
  files: [],
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    fileAddition(state, action: PayloadAction<Partial<any>>) {
      state.files = [...state.files, ...action.payload.files];
    },
  },
});

export default filesSlice.reducer;

export const { fileAddition } = filesSlice.actions;
