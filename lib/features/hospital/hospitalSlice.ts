import { SelectHospital } from '@/lib/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface HospitalState {
  data: SelectHospital[];  // Update to handle an array of hospital objects
}

const initialState: HospitalState = {
  data: [],
};

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<SelectHospital[]>) {
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<SelectHospital>) {
      state.data.push(action.payload);
    },
    clearData(state) {
      state.data = [];
    },
  },
});

export const { setData, addItem, clearData } = hospitalSlice.actions;
export default hospitalSlice.reducer;
