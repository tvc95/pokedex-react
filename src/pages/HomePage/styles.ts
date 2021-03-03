/* eslint-disable import/prefer-default-export */
import {
  MDBBtn,
  MDBCol,
  MDBContainer, MDBInputGroup, MDBJumbotron, MDBRow,
} from 'mdbreact';
import styled, { createGlobalStyle } from 'styled-components';
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
  max-width: 648px;
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

export const BackgroundContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export const Div = styled.div`
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

export const SearchBar = styled(MDBContainer)`
  z-index:1;
  margin-top: 0.85rem;
  background: #810101;
  border-radius: 2.1875rem;
  padding-right: 30px;
`;

export const SearchIcon = styled.img`
  z-index: 1;
  width: 1.5rem;
  height: 1.5rem;
  opacity: .50;
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

export const LandingTextCol = styled(MDBCol)`
    @media(min-width: 768px) and (max-width: 991px) {
      padding-left: 3.5rem;
      padding-right: 3.5rem;
    }
    @media(min-width: 1440px) {
      /* padding-left: 4rem; */
    }
`;

export const LandingText = styled.p`
/* Font info */
    font-family: Advent Pro;
    font-style: normal;
    font-weight: 300;
    font-size: 2rem;
    color: white;

    @media(min-width: 768px) and (max-width: 991px) {
      font-size: 2.6rem;
    }

    @media(min-width: 1440px) {
      font-size: 2.8rem;
      /* padding-right: 2rem; */
      /* font-weight: 500; */
    }
`;

export const NatDexBTN = styled(MDBBtn)`
  background: #E55858 !important;
  border: none;
  margin-right: 0.6rem;
  border-radius: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 1.4rem;
  text-transform: capitalize;
  color: white;
  border: 2px solid #b34545;

  :hover {
    background: #e74848 !important;
  }

  :active{
    background: #b83737 !important;
  }

  @media(max-width: 1023px) {
      width: 100%;
      margin: 0rem 0rem 1rem 0rem;
  }

`;

export const RegDexBtn = styled(MDBBtn)`
  background: #41a8a8 !important;
  border: none;
  margin-right: 0.6rem;
  border-radius: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 1.4rem;
  text-transform: capitalize;
  color: white;
  border: 2px solid #348585;

  :hover {
    background: #4bc2c2 !important;
  }

  :active{
    background: #31a5a5 !important;
  }

  @media(max-width: 1023px) {
      width: 100%;
      margin: 0rem 0rem 1rem 0rem;
  }

`;

export const LandingImageCol = styled(MDBCol)`
    @media(min-width: 1200px) {
      padding-right: 4rem;
    }
`;

export const Pokedex = styled.img`
  display: inline;
  z-index: 2;
  opacity: 0.15;
  max-width: 100%;

`;
