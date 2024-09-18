import { SelectReceptionist } from '@/lib/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ReceptionistState {
  data: SelectReceptionist[];  // Update to handle an array of Receptionist objects
}

const initialState: ReceptionistState = {
  data: [],
};

const receptionistSlice = createSlice({
  name: 'receptionist',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<SelectReceptionist[]>) {
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<SelectReceptionist>) {
      state.data.push(action.payload);
    },
    clearData(state) {
      state.data = [];
    },
  },
});

export const { setData, addItem, clearData } = receptionistSlice.actions;
export default receptionistSlice.reducer;
