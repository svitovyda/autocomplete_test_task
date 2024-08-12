import styled from 'styled-components';

export const DropDownContainer = styled.div`
  width: 100px;
  margin: 0;
  padding: 0;
  display: block;
  height: 0;
`;

export const DropdownListContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 200px;
  min-width: fit-content;
  max-height: 300px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  background-color: white;
  border: 1px solid #aaa;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0 #999;
  z-index: 100000;
  scrollbar-width: none;
  overflow: hidden;
`;

export const DropdownList = styled.ul`
  list-style: 'none';
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  scrollbar-width: none;
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
