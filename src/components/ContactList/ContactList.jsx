import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { StyledDeleteButton, StyledLi, StyledUl } from './ContactList.styled';
import { useEffect } from 'react';
import { deleteContactThunk, getContactsThunk } from 'redux/thunks';

export const ContactList = () => {
  const dispatch = useDispatch(); //получаем ссылку на функцию отправки экшенов

  const contacts = useSelector(selectContacts); //из файла contactsSlice.js (состояния Redux) вытягиваем наши контакты (из state.contacts.items)
  const filter = useSelector(selectFilter); //из файла filterSlice.js (состояния Redux) вытягиваем фильтр (из state.filter.value)

  //при первой загрузке страницы через useEffect получаем наши контакты с сервера (get-запрос)
  useEffect(() => {
    dispatch(getContactsThunk()); //через диспатч отправляем вызов thunk, в свою очередь thunk делает gеt-запрос
  }, [dispatch]);

  //переменная для отрисовки контактов после фильтрации
  //методом filter() перебираем массив объектов с контактами (contacts). Через includes() сравниваем значение ключа name со значением ключа value в объекте initialState в файле filterSlice.js
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  //функция-обработчик удаления контакта
  const handleDelete = id => dispatch(deleteContactThunk(id)); //отправляем результат - экшен для удаления

  return (
    <StyledUl>
      {filteredContacts.map(item => (
        <StyledLi key={item.id}>
          {item.name}: {item.phone}
          <StyledDeleteButton onClick={() => handleDelete(item.id)}>
            Delete
          </StyledDeleteButton>
        </StyledLi>
      ))}
    </StyledUl>
  );
};
