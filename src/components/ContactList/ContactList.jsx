import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { StyledDeleteButton, StyledLi, StyledUl } from './ContactList.styled';
import { useEffect } from 'react';
import {
  deleteContactThunk,
  getContactsThunk,
} from 'redux/contacts/operations';
import { selectLoggedIn } from 'redux/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ContactList = () => {
  const dispatch = useDispatch(); //получаем ссылку на функцию отправки экшенов
  const isLoggedIn = useSelector(selectLoggedIn);
  const navigate = useNavigate();

  const contacts = useSelector(selectContacts); //из файла contactsSlice.js (состояния Redux) вытягиваем наши контакты (из state.contacts.items)
  const filter = useSelector(selectFilter); //из файла filterSlice.js (состояния Redux) вытягиваем фильтр (из state.filter.value)

  //при первой загрузке страницы через useEffect получаем наши контакты с сервера (get-запрос)
  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getContactsThunk()); //делаем запрос только если isLoggedIn === true (через диспатч отправляем вызов thunk, в свою очередь thunk делает gеt-запрос)
      // navigate('/contacts');
    } else {
      toast.info('Please signin'); navigate('/login')
    }
  }, [dispatch, isLoggedIn, navigate]);

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
          {item.name}: {item.number}
          <StyledDeleteButton onClick={() => handleDelete(item.id)}>
            Delete
          </StyledDeleteButton>
        </StyledLi>
      ))}
    </StyledUl>
  );
};
