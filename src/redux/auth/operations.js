import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'api-heroku/instance';

//frankfrank@mail.com

export const registerThunk = createAsyncThunk(
  'auth/register',
  //в первый параметр credentials придет body (информация из компонента), данные пользователя для регистрации/авторизации
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post('users/signup', credentials);
      console.log(data);
      return data; //data попадет в slice, будет использован extraReducer, получим fulfilled, вытянем все эти данные
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  //в первый параметр credentials придет body (информация из компонента), данные пользователя для регистрации/авторизации
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post('/users/login', credentials);
      console.log(data);
      return data; //data попадет в slice, будет использован extraReducer, получим fulfilled, вытянем все эти данные
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);