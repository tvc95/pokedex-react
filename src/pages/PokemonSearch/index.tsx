import { MDBContainer } from 'mdbreact';
import React from 'react';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
import SearchAutocomplete from '../../components/SearchAutocomplete/SearchAutocomplete';
import PkmnSearchList from '../../containers/PkmnSearchList/PkmnSearchList';
import {
  BackgroundContainer,
  BackgroundLayer,
  Body,
  Jumbotron,
  MainContent,
  NewSearchBar,
  Title,
} from './styles';

const PokemonSearchPg: React.FC = () => (
  <div>
    <Body />
    <HomeNavbar />
    <MDBContainer>
      <Jumbotron>
        <Title>Search Results</Title>
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
        <PkmnSearchList />
      </MainContent>
    </BackgroundLayer>
  </div>
);

export default PokemonSearchPg;
