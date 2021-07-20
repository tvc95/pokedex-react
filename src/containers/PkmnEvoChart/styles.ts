/* eslint-disable import/prefer-default-export */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Linkk = styled(Link)`
  width: 104px;
  height: 104px;
  
  margin: 0.2rem auto;
`;

export const Container = styled.div`
  background-color: #cd323275;
  border-radius: 18px;
  margin: 0.2rem auto;
  width: 104px;
  height: 104px;

  text-anchor: middle;
  text-align: center;
  font-family: Advent Pro;
  font-style: normal;
  color: black;

  p {
    margin-bottom: 0;
  }
`;
