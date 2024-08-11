import styled, { css } from 'styled-components';

export const DropDownContainer = styled.div`
  width: 100px;
  margin: 0;
  padding: 0;
  display: block;
  height: 0;
`;

export const DropdownList = styled.ul`
  position: absolute;
  box-sizing: border-box;
  list-style: 'none';
  width: 200px;
  min-width: fit-content;
  max-height: 300px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: white;
  border: 1px solid #aaa;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0 #999;
  z-index: 100000;
  scrollbar-width: none;
`;

css`
  option {
    box-sizing: border-box;
    margin: 0;
    padding: 4px 2px;
    font-size: 18px;
    font-weight: 400;
    width: auto;
    color: #543729;
  }
`;

export const DropdownItem = styled.li`
  padding: 4px 10px;
  font-size: 16px;
  font-weight: 400;
  width: auto;
  cursor: pointer;
  &:hover {
    background-color: #d0d0d0;
    border: '1px solid #ccc';
  }
`;
