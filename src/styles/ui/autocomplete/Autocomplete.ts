import styled from 'styled-components';

export const AutocompleteInput = styled.input`
  display: inline-block;
  padding: 4px 2px;
  cursor: text;
  border: 0;
  border-radius: 1px;
  box-shadow: 0 0 1px #aaa;
  font-size: 18px;
  font-weight: 400;
  width: 100%;
  margin: 0;
  padding: 8px;
  outline-width: 0;
  color: inherit;
  ::placeholder {
    color: #aaa;
    font-size: 16px;
  }
`;
