import { createSelector } from '@reduxjs/toolkit';

export const selectLoggedIn = state => state.auth.isLoggedIn; //вытягиваем состояние логинизации
export const selectIsRefresh = state => state.auth.isRefreshing; //вытягиваем состояние рефреша

//Для мемоизации селектора используем функцию createSelector
//мемоизация - сохранение результатов выполнения функции, чтобы не было повторных вычислений.
export const selectUser = createSelector(
  //пишем что приходит
  [state => state.auth.user], //массив зависимостей
  user => user //будет приходить user и будем возвращать user
);
