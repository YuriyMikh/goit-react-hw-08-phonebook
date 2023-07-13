import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLabel,
} from './ContactForm.styled';
import { addContactThunk } from 'redux/thunks';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();

  //в локальном стейте будем хранить объект с именем и номером телефона контакта
  const [state, setState] = useState({
    name: '',
    phone: '',
  });

  const contacts = useSelector(selectContacts); //из файла contactsSlice.js (состояния Redux) вытягиваем наши контакты (из state.contacts.items)

  //функция-обработчик изменений в инпутах
  const handleChange = event => {
    setState(prev => ({ ...prev, [event.target.name]: event.target.value })); //стейт - это объект, чтобы не перезаписывались все значения ключей объекта, используем prev, то есть каждый раз учитываем предыдущее значение каждого отдельного ключа
  };

  //функция-обработчик сабмита (кнопки "Add contact")
  const handleSubmit = event => {
    event.preventDefault();
    //проверяем чтоб такого имени не было в contacts
    if (contacts.find(contact => contact.name === state.name)) {
      // alert(`${state.name} is already in contacts`);
      toast.error(`${state.name} is already in contacts`);
      return;
    }
    dispatch(addContactThunk(state)); //через диспатч в файл contactsSlice.js передаем созданный объект контакта с name и phone. Далее thunk на свое место вернет объект с type и payload
    setState({ name: '', phone: '' }); //очищаем инпуты
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>
        Name
        <StyledInput
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+((?:'[a-zA-Zа-яА-Я\s])?(?:-[a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я\s]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </StyledLabel>

      <StyledLabel>
        Number
        <StyledInput
          type="tel"
          name="phone"
          value={state.phone}
          onChange={handleChange}
          pattern="\+?\d{1,4}[\s]?[\-]?\(?\d{1,3}?\)?[\s]?[\-]?\d{1,4}[\s]?[\-]?\d{1,4}[\s]?[\-]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </StyledLabel>
      <StyledButton type="submit">Add contact</StyledButton>
    </StyledForm>
  );
};
