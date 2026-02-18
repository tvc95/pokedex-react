/* eslint-disable import/prefer-default-export */
import styled, { createGlobalStyle } from 'styled-components';
import { MDBBtn } from 'mdbreact';
import backgroundImage from '../../assets/images/bg2.png';

export const Body = createGlobalStyle`
  body {
    margin: 0;
    background: url(${backgroundImage}) !important;
    background-color: #CD3232 !important;
    background-repeat: repeat-x !important;
    -webkit-font-smoothing: antialiased;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 2rem;
`;

export const ErrorCode = styled.h1`
  font-family: "Advent Pro", sans-serif;
  font-weight: 700;
  font-size: 8rem;
  color: #e42e2e;
  text-shadow: 4px 4px 0 #a81818;
  margin: 0;
  line-height: 1;

  @media (max-width: 576px) {
    font-size: 5rem;
  }
`;

export const Title = styled.h2`
  font-family: "Advent Pro", sans-serif;
  font-weight: 600;
  font-size: 2rem;
  color: #830000;
  margin: 0.5rem 0 1rem;

  @media (max-width: 576px) {
    font-size: 1.4rem;
  }
`;

export const Message = styled.p`
  font-family: "Advent Pro", sans-serif;
  font-weight: 300;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.85);
  max-width: 480px;
  margin-bottom: 2rem;
`;

export const HomeButton = styled(MDBBtn)`
  background: #e55858 !important;
  border: 2px solid #b34545;
  border-radius: 8px;
  font-family: "Advent Pro", sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: capitalize;
  color: white;
  padding: 0.6rem 2rem;

  &:hover {
    background: #e74848 !important;
  }

  &:active {
    background: #b83737 !important;
  }
`;

export const SpriteImage = styled.img`
  width: 120px;
  height: 120px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  opacity: 0.9;
  margin-bottom: 1rem;
`;
