/* eslint-disable import/prefer-default-export */
import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/images/background.png';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-image: url(${backgroundImage});
    background-repeat: repeat;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  body, input, button {
    font-family: 'Advent Pro';
  }
`;
