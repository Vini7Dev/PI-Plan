import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  button, input, textarea, label, a {
    cursor: pointer;
  }
`;
