import axios from 'axios';

//метод axios в который мы передаем объект настроек. Теперь именно в переменной contactsApi есть свой базовый URL, при этом на глобальном axios не записан URL
const contactsApi = axios.create({
  baseURL: 'https://64ad5bc4b470006a5ec5d3c8.mockapi.io',
});

export const fetchContacts = async () => {
  const { data } = await contactsApi.get('/contacts'); //axios возвращает объект в котором всегда есть свойство data (в котором будет лежать реальный ответ бэкэнда), поэтому сразу деструктуризируем data из ответа бэка.
  return data;
};

export const addContact = async contact => {
  const { data } = await contactsApi.post('/contacts', contact);
  return data;
};

export const deleteContact = id => {
  return contactsApi.delete(`/contacts/${id}`);
};
