import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  #root {
    margin: 0 auto;
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body{
    Background: #ffffff;
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }
  html {
    height: 100%;
  }
  body, input, button {
    font-family: arial;
    font-size: 16px;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;
