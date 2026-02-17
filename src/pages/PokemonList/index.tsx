import { MDBContainer } from 'mdbreact';
import React from 'react';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
import SearchAutocomplete from '../../components/SearchAutocomplete/SearchAutocomplete';
import PkmnBtnList from '../../containers/PkmnBtnList/PkmnBtnList';
import {
  BackgroundContainer,
  BackgroundLayer,
  Body,
  InputSearch,
  Jumbotron,
  MainContent,
  NewSearchBar,
  SearchBtn,
  Title,
} from './styles';

const PokemonListPg: React.FC = () => (
  <div>
    <Body />
    <HomeNavbar />
    <MDBContainer>
      <Jumbotron>
        <Title>National Dex</Title>
      </Jumbotron>
    </MDBContainer>

    <BackgroundLayer>
      <BackgroundContainer className="container d-flex justify-content-center">
        <NewSearchBar className="align-items-center">
          <SearchAutocomplete placeholder="Search for a Pokémon" />
        </NewSearchBar>
      </BackgroundContainer>

      <MainContent
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        <PkmnBtnList />
      </MainContent>
    </BackgroundLayer>
  </div>
);

export default PokemonListPg;
