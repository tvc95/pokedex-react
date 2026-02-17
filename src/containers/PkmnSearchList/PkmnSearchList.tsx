import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { MDBBtn, MDBContainer } from 'mdbreact';
import { useLocation } from 'react-router-dom';
import { NationalDexContainer } from './styles';
import PokemonBtn from '../../components/Buttons/PokemonBtn/PokemonBtn';
import usePokemonCount from '../../hooks/usePokemonCount';
import formatPokemonName from '../../utils/formatPokemonName';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

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
    return <LoadingSpinner size="sm" fullPage={false} />;
  }

  const searchTerm = location.pathname.slice(8).toLowerCase();

  return (
    <MDBContainer>
      <NationalDexContainer>
        {data.pokemons.results.map(
          (pokemon: { id: number; name: string; image: string }) => {
            if (
              pokemon.name.includes(searchTerm)
              && pokemon.id <= maxSpeciesId
            ) {
              return (
                <PokemonBtn
                  key={pokemon.id}
                  pkmnIconPath={pokemon.image}
                  pkmnName={pokemon.name}
                  trueName={formatPokemonName(pokemon.name)}
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
