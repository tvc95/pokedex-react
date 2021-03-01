import React from 'react';

import {
  MDBCol, MDBContainer, MDBRow,
} from 'mdbreact';
import {
  JumbotronLogo,
  PokedexLogo,
  BackgroundLayer,
  InputSearch,
  NewSearchBar,
  SearchBtn,
  BackgroundContainer,
  MainContent,
  LandingText,
  NatDexBTN,
  RegDexBtn,
  Pokedex,
  LandingTextCol,
  LandingImageCol,
} from './styles';
import './form.css';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
import PokedexLogoImg from '../../assets/images/logo_pokedex2.png';
import PokedexImg from '../../assets/images/img_pokedex.png';

const HomePage: React.FC = () => (
  <div>
    <HomeNavbar />
    <MDBContainer>
      <JumbotronLogo className="d-flex justify-content-center align-items-center">
        <PokedexLogo src={PokedexLogoImg} alt="Pokedex" className="animated fadeInUp" />
      </JumbotronLogo>
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
        <MDBRow center middle>
          <LandingTextCol md="6" middle>
            <LandingText>
              An up-to-date Pokédex featuring all 893 Pokémon, including the new Galar region
            </LandingText>
            <NatDexBTN>National Dex</NatDexBTN>
            <RegDexBtn>Regional Dex</RegDexBtn>
          </LandingTextCol>

          <LandingImageCol md="6">
            <Pokedex src={PokedexImg} alt="Pokédex" />
          </LandingImageCol>
        </MDBRow>
      </MainContent>
    </BackgroundLayer>
  </div>
);

export default HomePage;
