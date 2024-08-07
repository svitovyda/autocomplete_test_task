import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-family:sans-serif;
    -ms-text-size-adjust:100%;
    -webkit-text-size-adjust:100%
  }
  body {
    font: 16px "Helvetica Neue",Helvetica,Arial,sans-serif;
    line-height: 1.5;
    padding: 0;
    margin: 0;
    color: #543729
  }
`;
