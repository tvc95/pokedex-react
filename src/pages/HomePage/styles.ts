/* eslint-disable import/prefer-default-export */
import { MDBContainer, MDBInputGroup, MDBJumbotron } from 'mdbreact';
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const JumbotronLogo = styled(MDBJumbotron)`
  background: none;
  box-shadow: none;
`;

export const PokedexLogo = styled.img`
  width: 100%;
  max-width: 634px;
  height: 100%;
  max-height: 114.32px;
  margin-top: 4rem;
  display: flex;
`;

export const BackgroundLayer = styled.div`
  background: #A81818;
  border-radius: 30px;
  border-bottom-right-radius: 0rem;
  border-bottom-left-radius: 0rem;
`;

export const SearchBar = styled(MDBContainer)`
  z-index:1;
  margin-top: 0.85rem;
  background: #810101;
  border-radius: 2.1875rem;
`;

export const SearchIcon = styled.img`
  z-index: 2;
  width: 1.5rem;
  height: 1.5rem;
  opacity: .50;
  margin: 0.5rem 0.5rem;
`;

export const InputSearch = styled(MDBInputGroup)`
  z-index: 2;
  background-color: #810101;

  /* Font info */
  font-family: Advent Pro;
  font-style: normal;
  font-weight: 700;
  font-size: larger;
  color: #FFFFFF;

  ::placeholder {
    color: rgba(217, 217, 217, 0.7);
    background-color: #810101;
  }
`;
