import { configureStore } from '@reduxjs/toolkit';
import {contactsReducer} from './contactsSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },

  //если проект задеплоен на продакшн - не показывай devTools.
  // devTools: process.env.NODE_ENV !== 'production',
});
