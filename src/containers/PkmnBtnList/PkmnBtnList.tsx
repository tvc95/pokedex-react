import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { MDBBtn, MDBContainer } from 'mdbreact';
import { BtnGroup, NationalDexContainer } from './styles';
import PokemonBtn from '../../components/Buttons/PokemonBtn/PokemonBtn';

const PkmnBtnList: React.FC = () => {
  const [prevOffset, setPrevOffset] = useState(0);

  const query = gql`
    query pokemons($limit: Int!, $offset: Int!) {
      pokemons(limit: $limit, offset: $offset) {
        next
        previous
        nextOffset
        prevOffset
        results {
          url
          name
          image
          id
        }
      }
    }
  `;

  const { loading, data, error } = useQuery(query, {
    variables: { limit: 120, offset: prevOffset },
  });

  return (
    <>
      {error && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>Could not load Pokémon list.</h3>
          <p>Please check your connection and try again.</p>
          <MDBBtn color="info" onClick={() => window.location.reload()}>
            Try Again
          </MDBBtn>
        </div>
      )}
      {loading ? (
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <MDBContainer>
          <NationalDexContainer>
            {data.pokemons.results.map(
              (pokemon: { id: number; name: string; image: string }) => {
                let name = '';
                if (
                  pokemon.name.includes('-')
                  && !pokemon.name.includes('-oh')
                ) {
                  if (!pokemon.name.includes('-mime')) {
                    name = pokemon.name.slice(0, pokemon.name.indexOf('-'));
                  } else {
                    name = pokemon.name.replace('-', '. ');
                  }
                } else {
                  name = pokemon.name;
                }

                if (pokemon.id <= 898) {
                  return (
                    <PokemonBtn
                      key={pokemon.id}
                      pkmnIconPath={pokemon.image}
                      pkmnName={pokemon.name}
                      trueName={name}
                      pkmnNumber={pokemon.id}
                    />
                  );
                }
                return null;
              },
            )}
          </NationalDexContainer>

          <MDBContainer className="d-flex justify-content-center">
            <BtnGroup>
              <MDBBtn
                color="info"
                size="lg"
                onClick={() => setPrevOffset(data.pokemons.prevOffset)}
              >
                Previous
              </MDBBtn>
              <MDBBtn
                color="info"
                size="lg"
                onClick={() => {
                  if (data.pokemons.nextOffset <= 840) {
                    setPrevOffset(data.pokemons.nextOffset);
                  }
                }}
              >
                Next
              </MDBBtn>
            </BtnGroup>
          </MDBContainer>
        </MDBContainer>
      )}
    </>
  );
};

export default PkmnBtnList;
