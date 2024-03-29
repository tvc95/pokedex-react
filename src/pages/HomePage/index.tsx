import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
  Pokedex,
  LandingTextCol,
  LandingImageCol,
  Body,
} from './styles';
import './form.css';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
import PokedexLogoImg from '../../assets/images/logo_pokedex2.png';
import PokedexImg from '../../assets/images/img_pokedex.png';

const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');

  const history = useHistory();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <div>
      <Body />
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
                value={searchInput}
                onChange={handleInputChange}
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    history.push(`/search/${searchInput}`);
                  }
                }}
                append={(
                  <SearchBtn
                    type="submit"
                    color="primary"
                    className="m-0 px-3 py-2 z-depth-0"
                    onClick={(e: React.FormEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      history.push(`/search/${searchInput}`);
                    }}
                  >
                    Search
                  </SearchBtn>
                )}
              />
            </MDBCol>
          </NewSearchBar>
        </BackgroundContainer>

        <MainContent fluid className="d-flex justify-content-center align-items-center">
          <MDBContainer>
            <MDBRow center middle>
              <LandingTextCol lg="6" middle>
                <LandingText>
                  An up-to-date Pokédex featuring all 893 Pokémon, including the new Galar region
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
