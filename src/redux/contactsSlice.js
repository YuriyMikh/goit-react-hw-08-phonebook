import { createSlice } from '@reduxjs/toolkit'; //из <-- этой либы делает экшены и редюсеры
import {
  addContactThunk,
  deleteContactThunk,
  getContactsThunk,
} from './thunks';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts', //имя слайса
  initialState: contactsInitialState, //начальное состояние редюсера слайса (ссылка)

  //объект редюсеров
  reducers: {}, //для описания экшенов, которые мы можем делать в этом слайсе (например, какой-нибудь переключатель)

  //так как происходят сайд-эффекты, для этого есть специальные асинхронные экшн-creatorы - asyncThunk. Чтоб их отследить есть extraReducers, которые описываем ниже
  extraReducers: (
    builder //данный builder под капотом от Redux
  ) => {
    builder // к нему через чейнинг цепляем метод .addCase() и строим нужные операции (примерно как раньше через switch)
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload; //в state (а точнее в contactsInitialState.items) записываем результат работы thunk в случае успеха (fulfilled). В payload приходит массив контактов
        state.isLoading = false; //меняем индикатор на false, чтобы не крутился после успеха (fulfilled)
        state.error = null; //чистим информацию об ошибке, чтоб при следующем запросе не висела информация из прошлого неуспешного результата работы thunk
      })
      .addCase(getContactsThunk.rejected, (state, action) => {
        state.error = action.payload; //в state записываем результат работы thunk в случае rejected (ловим thunkAPI.rejectWithValue(error.message))
        state.isLoading = false;
      })
      .addCase(getContactsThunk.pending, state => {
        state.isLoading = true; //action не будет использоваться, поэтому в state просто записываем isLoading = true
      })
      //ниже деструктуризируем payload из action
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.items = [...state.items, payload]; //в state.items сначала распыляем старые контакты + добавляем новый контакт
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addContactThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const contactsReducer = contactsSlice.reducer; //редюсер слайса
// export default contactsSlice.reducer; //дефолтный экспорт
