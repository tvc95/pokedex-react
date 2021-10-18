import { MDBCol, MDBContainer } from 'mdbreact';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
import PkmnSearchList from '../../containers/PkmnSearchList/PkmnSearchList';
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

const PokemonSearchPg: React.FC = () => {
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
        <Jumbotron>
          <Title>Search Results</Title>
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
          <PkmnSearchList />
        </MainContent>

      </BackgroundLayer>
    </div>
  );
};

export default PokemonSearchPg;
