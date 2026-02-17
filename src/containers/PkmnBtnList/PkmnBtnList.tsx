import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { MDBBtn, MDBContainer } from 'mdbreact';
import { BtnGroup, NationalDexContainer } from './styles';
import PokemonBtn from '../../components/Buttons/PokemonBtn/PokemonBtn';
import usePokemonCount from '../../hooks/usePokemonCount';
import formatPokemonName from '../../utils/formatPokemonName';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const PAGE_SIZE = 120;

const PkmnBtnList: React.FC = () => {
  const [prevOffset, setPrevOffset] = useState(0);
  const { totalSpecies } = usePokemonCount();

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
    variables: { limit: PAGE_SIZE, offset: prevOffset },
  });

  /**
   * The maximum valid species ID. If the API count is available we use
   * it; otherwise fall back to a safe default that will be updated on
   * the next render once the count loads.
   */
  const maxSpeciesId = totalSpecies ?? 1025;

  /**
   * Calculate the last valid offset for the "Next" button so that
   * pagination never goes beyond the total number of species.
   * For example, with 1025 species and PAGE_SIZE 120, the last
   * page starts at offset 960.
   */
  const lastPageOffset = Math.max(
    0,
    Math.floor((maxSpeciesId - 1) / PAGE_SIZE) * PAGE_SIZE,
  );

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>Could not load Pokémon list.</h3>
        <p>Please check your connection and try again.</p>
        <MDBBtn color="info" onClick={() => window.location.reload()}>
          Try Again
        </MDBBtn>
      </div>
    );
  }

  if (loading || !data) {
    return <LoadingSpinner size="sm" fullPage={false} />;
  }

  return (
    <MDBContainer>
      <NationalDexContainer>
        {data.pokemons.results.map(
          (pokemon: { id: number; name: string; image: string }) => {
            // Only render Pokémon that are actual species (not alternate
            // forms which have IDs above the species count)
            if (pokemon.id <= maxSpeciesId) {
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

      <MDBContainer className="d-flex justify-content-center">
        <BtnGroup>
          <MDBBtn
            color="info"
            size="lg"
            disabled={prevOffset === 0}
            onClick={() => setPrevOffset(data.pokemons.prevOffset)}
          >
            Previous
          </MDBBtn>
          <MDBBtn
            color="info"
            size="lg"
            disabled={prevOffset >= lastPageOffset}
            onClick={() => {
              if (data.pokemons.nextOffset <= lastPageOffset) {
                setPrevOffset(data.pokemons.nextOffset);
              }
            }}
          >
            Next
          </MDBBtn>
        </BtnGroup>
      </MDBContainer>
    </MDBContainer>
  );
};

export default PkmnBtnList;
