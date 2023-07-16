import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearToken, instance, setToken } from 'api-heroku/instance';

//frankfrank@mail.com

export const registerThunk = createAsyncThunk(
  'auth/register',
  //в первый параметр credentials придет body (информация из компонента), данные пользователя для регистрации/авторизации
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post('users/signup', credentials);
      console.log(data);
      setToken(data.token); //записываем токен в header
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
      // console.log(data);
      setToken(data.token); //записываем токен в header
      return data; //data попадет в slice, будет использован extraReducer, получим fulfilled, вытянем все эти данные
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  //в данном случае ничего не передаю
  async (_, thunkAPI) => {
    try {
      await instance.post('/users/logout'); //ничего не возвращаю
      clearToken(); //при логауте очищаем токен. Можно отследить что передается токен на logout во вкладке Network -> Fetch/XHR -> Name:logout ->  Headers -> Request Headers -> Authorization
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//будет проверяться есть ли у нас уже токен. Если токен уже существует - будем его передавать. Если нет - выкинем ошибку.
//Эту thunk будем вызывать App.jsx в useEffect
export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    //перед try-catch делаем проверку
    const persistedToken = thunkAPI.getState().auth.token; //методом getState() получаем весь state и вытягиваем token из auth
    //если токена нет - возвращаем ошибку
    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Token is not find!')
    }
    try {
      //перед запросом сэтим токен
      setToken(persistedToken)
      const { data } = await instance.get('/users/current');
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
