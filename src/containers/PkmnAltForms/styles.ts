/* eslint-disable import/prefer-default-export */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AltForms = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-gap: 1rem;
  grid-template-columns:  repeat(1, minmax(104px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(104px, 1fr));

  @media (min-width: 400px) {
    grid-template-columns:  repeat(3, minmax(104px, 1fr));
  }
`;

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

export const TypeSpan = styled.span`
  display: inline-flex;
`;

// 8A9B689f
// 9F7833
export const RegionVariant = styled.div`
  background-color: rgba(222, 158, 54, 0.85); 
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
