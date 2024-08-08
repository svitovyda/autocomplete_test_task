import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-family:sans-serif;
    -ms-text-size-adjust:100%;
    -webkit-text-size-adjust:100%;
  }
  body {
    font: 16px "Helvetica Neue",Helvetica,Arial,sans-serif;
    line-height: 1.5;
    padding: 0;
    margin: 0;
    color: #543729
  }
  h1 {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding: 18px 0 4px 0;
    margin: 0;
  }
  input {
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
  }
  select {
    box-sizing: border-box;
    appearance: none;
    border-width: 1px;
    border-color: #aaa;
    border-radius: 3px;
    box-shadow: 3px 3px 5px 0 #999;
    position: relative;
    top: 100%;
    left: 0;
    width: 50%;
    min-width: fit-content;
    z-index: 100000;
    background-color: white;
    list-style: 'none';
    padding: 8px;
    margin: 0;
    scrollbar-width: none;
  }
  option {
    box-sizing: border-box;
    margin: 0;
    padding: 4px 2px;
    font-size: 18px;
    font-weight: 400;
    width: auto;
    color: #543729;
    border: '1px solid #ccc';
    border-radius: 1px;
  }
`;
