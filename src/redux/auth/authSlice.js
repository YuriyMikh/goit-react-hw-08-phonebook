import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, registerThunk } from './operations';

//выносим наверх функцию-шаблон, которую будем передавать в extraReducers в addMatcher(isAnyOf())
const pending = (state, action) => {
  state.loading = true;
  state.error = '';
};

//выносим наверх функцию-шаблон, которую будем передавать в extraReducers в addMatcher(isAnyOf())
const rejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  error: null,
  loading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      //записываем действия при логинизации
      //так как обработка кейса на логин и на регистрацию одинаковые, выношу эти 2 обработки в .addMatcher(isAnyOf())
      // .addCase(loginThunk.fulfilled, (state, action) => {
      //   state.user = action.payload.user; //команда забрать все поля из объекта user себе в user
      //   state.token = action.payload.token; //команда записать token в state
      //   state.isLoggedIn = true;
      //   state.loading = false;
      // })
      // //записываем действия при регистрации
      // .addCase(registerThunk.fulfilled, (state, action) => {
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      //   state.isLoggedIn = true;
      //   state.loading = false;
      // })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.user = { name: '', email: '' }; //вытягиваем данные не из payload, а четко указываем начальное значение контакта
        state.token = ''; //очищаем токен
        state.isLoggedIn = false;
        state.loading = false;
      })

      //кейс для обработки повторяющихся действий: pending и rejected. Ксли пишем именно через isAnyOf() - указываем какие именно thunk подкинуты к этому мэтчеру
      //isAnyOf() - команда использовать либо-что из того что будет описано далее. Через endsWith может быть баг с бесконечным циклом

      //если slice один, то можно использовать и обычный мэтчер с методом endsWith (например: .addMatcher(action => action.type.endsWith('/pending'))
      .addMatcher(isAnyOf(loginThunk.pending, registerThunk.pending), pending) //передаем функцию pending
      .addMatcher(
        isAnyOf(loginThunk.rejected, registerThunk.rejected),
        rejected //передаем функцию rejected
      )
      //обработка кейсов для fulfilled логинизации и регистрации
      .addMatcher(
        isAnyOf(loginThunk.fulfilled, registerThunk.fulfilled),
        (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.loading = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
