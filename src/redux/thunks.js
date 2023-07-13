import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'API/api';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll', //название экшена, первым словом указываем с какой структурой данных будем работать, а после слеша - с каким действием (будет отображаться в devTools)
  //в первый параметр придет то, что передаём через dispatch. Если в диспатче ничего не будем передавать - тогда пропускаем первый параметр просто подчёркиванием
  async (_, thunkAPI) => {
    //так как функция асинхронная - сразу оборачиваем в конструкцию try-catch чтобы отлавливать и ошибкии
    try {
      const response = await fetchContacts();
      return response; //то, что возвращаем из thunk мы поймаем в slice в экшене в качестве payload (проще говоря response станет payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); //rejectWithValue - метод thunkAPI, который позволяет слайсу поймать ошибку. Также в thunkAPI есть например dispatch, getState
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  //в первый параметр придет объект контакта, который надо будет добавлять
  async (contact, thunkAPI) => {
    try {
      const response = await addContact(contact);
      return response; //если ничего не возвращать - будет undefined
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await deleteContact(id); //ждем результата запроса,
      return id; //и только если будет успех - возвращаем айдишник. А если будет ошибка - return не выполнится
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
