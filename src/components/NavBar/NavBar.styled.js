import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  background-color: #edfaef;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
`;

export const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 15px;

  a {
    color: #111111;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
  .active {
    color: red;
    text-decoration: underline;
  }
`;
