import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter', //имя слайса
  initialState: { value: '' }, //начальное состояние редюсера слайса
  //объект редюсера
  reducers: {
    filterAction(state, action) {
      state.value = action.payload;
    },
  },
});

export const { filterAction } = filterSlice.actions; //генератор экшенов
export const filterReducer = filterSlice.reducer; //редюсер слайса
