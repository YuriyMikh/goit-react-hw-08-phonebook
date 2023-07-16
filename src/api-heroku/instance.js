import axios from 'axios';

//экземпляр с базовым URL для дальнейшего использования. Если надо - в этом файле делаются такие экземпляры на другие бэкэнды
export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

//функция дя настройки токена, будет использоваться в loginThunk в файле operations.js
export const setToken = token => {
  //через headers будем передавать токен
  instance.defaults.headers.common.Authorization = `Bearer ${token}`; //У JWT-токена есть особенность записи на авторизацию, которая начинается с названия Bearer. Это зарезервированное слово, читатется сервером как token, передается строкой вместе с токеном
};

//функция для очистики токена при логауте. Записывается пустая строка, чтобы авторизационный header был пустой.
export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};
