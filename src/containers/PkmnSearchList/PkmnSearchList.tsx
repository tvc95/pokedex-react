import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { MDBContainer } from 'mdbreact';
import { useLocation } from 'react-router-dom';
import { NationalDexContainer } from './styles';
import PokemonBtn from '../../components/Buttons/PokemonBtn/PokemonBtn';

const PkmnSearchList: React.FC = () => {
  const [prevOffset] = useState(0);
  const location = useLocation();

  const query = gql`
    query pokemons {
      pokemons(limit: 898, offset: ${prevOffset}) {
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

  const { loading, data } = useQuery(query);

  return (
    <>
      {loading ? (
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <MDBContainer>
          <NationalDexContainer>
            {data.pokemons.results.map((pokemon: { id: number; name: string; image: string }) => {
              let name = '';
              if (pokemon.name.includes('-')) {
                if (!pokemon.name.includes('-mime')) {
                  name = pokemon.name.slice(0, pokemon.name.indexOf('-'));
                } else {
                  name = pokemon.name.replace('-', '. ');
                }
              } else {
                name = pokemon.name;
              }

              if (pokemon.name.includes(location.pathname.slice(8).toLowerCase())) {
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
            })}
          </NationalDexContainer>
        </MDBContainer>
      )}
    </>
  );
};

export default PkmnSearchList;
