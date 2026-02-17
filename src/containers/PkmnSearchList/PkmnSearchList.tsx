import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { MDBBtn, MDBContainer } from 'mdbreact';
import { useLocation } from 'react-router-dom';
import { NationalDexContainer } from './styles';
import PokemonBtn from '../../components/Buttons/PokemonBtn/PokemonBtn';
import usePokemonCount from '../../hooks/usePokemonCount';

const PkmnSearchList: React.FC = () => {
  const location = useLocation();
  const { totalSpecies } = usePokemonCount();
  const maxSpeciesId = totalSpecies ?? 1025;

  const query = gql`
    query pokemons($limit: Int!, $offset: Int!) {
      pokemons(limit: $limit, offset: $offset) {
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
    variables: { limit: maxSpeciesId, offset: 0 },
  });

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>Could not load search results.</h3>
        <MDBBtn color="info" onClick={() => window.location.reload()}>
          Try Again
        </MDBBtn>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const searchTerm = location.pathname.slice(8).toLowerCase();

  return (
    <MDBContainer>
      <NationalDexContainer>
        {data.pokemons.results.map(
          (pokemon: { id: number; name: string; image: string }) => {
            let name = '';
            if (pokemon.name.includes('-') && !pokemon.name.includes('-oh')) {
              if (!pokemon.name.includes('-mime')) {
                name = pokemon.name.slice(0, pokemon.name.indexOf('-'));
              } else {
                name = pokemon.name.replace('-', '. ');
              }
            } else {
              name = pokemon.name;
            }

            if (
              pokemon.name.includes(searchTerm)
              && pokemon.id <= maxSpeciesId
            ) {
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
    </MDBContainer>
  );
};

export default PkmnSearchList;
