import React from 'react';
import { Link } from 'react-router-dom';

import { MDBContainer, MDBRow } from 'mdbreact';
import {
  JumbotronLogo,
  PokedexLogo,
  BackgroundLayer,
  BackgroundContainer,
  MainContent,
  LandingText,
  NatDexBTN,
  Pokedex,
  LandingTextCol,
  LandingImageCol,
  Body,
  NewSearchBar,
} from './styles';
import './form.css';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
import PokedexLogoImg from '../../assets/images/logo_pokedex2.png';
import PokedexImg from '../../assets/images/img_pokedex.png';
import usePokemonCount from '../../hooks/usePokemonCount';
import SearchAutocomplete from '../../components/SearchAutocomplete/SearchAutocomplete';

const HomePage: React.FC = () => {
  const { totalSpecies } = usePokemonCount();

  return (
    <div>
      <Body />
      <HomeNavbar />
      <MDBContainer>
        <JumbotronLogo className="d-flex justify-content-center align-items-center">
          <PokedexLogo
            src={PokedexLogoImg}
            alt="Pokedex"
            className="animated fadeInUp"
          />
        </JumbotronLogo>
      </MDBContainer>

      <BackgroundLayer>
        <BackgroundContainer className="container d-flex justify-content-center">
          <NewSearchBar className=" align-items-center">
            <SearchAutocomplete placeholder="Search for a Pokémon" />
          </NewSearchBar>
        </BackgroundContainer>

        <MainContent
          fluid
          className="d-flex justify-content-center align-items-center"
        >
          <MDBContainer>
            <MDBRow center middle>
              <LandingTextCol lg="6" middle>
                <LandingText>
                  {totalSpecies
                    ? `An up-to-date Pokédex featuring all ${totalSpecies} Pokémon`
                    : 'An up-to-date Pokédex featuring all known Pokémon'}
                </LandingText>
                <Link to="/dexlist">
                  <NatDexBTN color="red darken-1">National Dex</NatDexBTN>
                </Link>
                {/* <RegDexBtn>Regional Dex</RegDexBtn> */}
              </LandingTextCol>

              <LandingImageCol lg="6" className="d-none d-lg-block">
                <Pokedex src={PokedexImg} alt="Pokédex" />
              </LandingImageCol>
            </MDBRow>
          </MDBContainer>
        </MainContent>
      </BackgroundLayer>
    </div>
  );
};

export default HomePage;
