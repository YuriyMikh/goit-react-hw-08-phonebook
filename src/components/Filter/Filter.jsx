import { useDispatch } from 'react-redux';
import { filterAction } from 'redux/filterSlice';
import { StyledInput, StyledLabel } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <StyledLabel>
      Find contacts by name
      <StyledInput
        type="text"
        name="find"
        onChange={event => {
          dispatch(filterAction(event.target.value)); //через диспатч передаем информацию из инпута в filterSlice.js
        }}
      />
    </StyledLabel>
  );
};
