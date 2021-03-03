import {
  MDBBtn, MDBContainer, MDBInputGroup, MDBRow,
} from 'mdbreact';
import styled, { createGlobalStyle } from 'styled-components';
import backgroundImage from '../../assets/images/backgroundlanding.png';

export const Body = createGlobalStyle`
  body {
    margin: 0;
    background: url(${backgroundImage}) !important;
    background-color: #CD3232 !important;
    background-repeat: repeat-x !important;
    -webkit-font-smoothing: antialiased;
  }
`;

export const Jumbotron = styled.h2`
  background: none;
  box-shadow: none;
`;

export const Title = styled.h1`
  margin-top: 4.2rem;
  margin-bottom: 4.2rem;
  font-size: 4.5rem;
  font-weight: 700;
  color: #3a3a3a;
`;

export const BackgroundLayer = styled.div`
  background: #A81818;
  border-radius: 30px;
  border-bottom-right-radius: 0rem;
  border-bottom-left-radius: 0rem;
`;

export const BackgroundContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export const NewSearchBar = styled(MDBRow)`
  z-index:1;
  margin-top: 0.85rem;
  width: 900px;

`;

export const InputSearch = styled(MDBInputGroup)`
  z-index: 2;
  color: #FFFFFF;

  /* Font info */
  font-family: Advent Pro;
  font-style: normal;
  font-weight: 700;
  font-size: larger;

  ::placeholder {
    color: rgba(217, 217, 217, 0.7);
  }
`;

export const SearchBtn = styled(MDBBtn)`
  /* Font info */
  font-family: Advent Pro;
  font-style: normal;
  font-weight: 600;
  font-size: small;

  border-radius: 0.4rem 1rem;
`;

export const MainContent = styled(MDBContainer)`
  margin-top: 0.8rem;
  background: #CD3232;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border: none;
  /* Grid */
  padding: 2rem;
  
  box-shadow: 0px -8px 10px 2px rgba(0, 0, 0, 0.1) ;


`;
