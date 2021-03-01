import React from 'react';

import {
  MDBBtn, MDBCol, MDBContainer, MDBInputGroup, MDBRow,
} from 'mdbreact';
import {
  JumbotronLogo, PokedexLogo, BackgroundLayer, SearchBar, SearchIcon, InputSearch,
} from './styles';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
import PokedexLogoImg from '../../assets/images/logo_pokedex2.png';
import SearchIconImg from '../../assets/images/smallsearch1.png';

const HomePage: React.FC = () => (
  <div>
    <HomeNavbar />
    <MDBContainer>
      <JumbotronLogo className="d-flex justify-content-center align-items-center">
        <PokedexLogo src={PokedexLogoImg} alt="Pokedex" />
      </JumbotronLogo>

      <BackgroundLayer>
        <MDBContainer className="d-flex justify-content-center">
          <SearchBar id="search-bar">
            <MDBRow className="align-items-center">
              <MDBCol size="1" className="px-0 pl-lg-4">
                <SearchIcon src={SearchIconImg} alt="search-icon" />
              </MDBCol>
              <MDBCol size="11" className="align-self-center px-0">
                <InputSearch
                  material
                  size="lg"
                  containerClassName="mb-3 mt-0"
                  hint="Search for a Pokemon"
                  append={(
                    <MDBBtn className="m-0 px-3 py-2 z-depth-0">
                      Search
                    </MDBBtn>
                  )}
                />
              </MDBCol>
            </MDBRow>

          </SearchBar>
        </MDBContainer>
      </BackgroundLayer>

    </MDBContainer>
  </div>
);

export default HomePage;
