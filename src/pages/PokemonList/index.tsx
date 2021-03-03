import { MDBCol, MDBContainer } from 'mdbreact';
import React from 'react';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
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
        <NewSearchBar className=" align-items-center">
          <MDBCol size="12">
            <InputSearch
              material
              containerClassName="mt-0 mb-2"
              hint="Search for a Pokemon"
              append={(
                <SearchBtn type="submit" color="primary" className="m-0 px-3 py-2 z-depth-0">
                  Search
                </SearchBtn>
              )}
            />
          </MDBCol>
        </NewSearchBar>
      </BackgroundContainer>

      <MainContent fluid className="d-flex justify-content-center align-items-center">
        <PkmnBtnList />
      </MainContent>

    </BackgroundLayer>
  </div>
);

export default PokemonListPg;
