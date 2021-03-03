import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { MDBBtn, MDBContainer } from 'mdbreact';
import { BtnGroup, NationalDexContainer } from './styles';
import PokemonBtn from '../../components/Buttons/PokemonBtn/PokemonBtn';

const PkmnBtnList: React.FC = () => {
  const [prevOffset, setPrevOffset] = useState(0);

  const query = gql`
    query pokemons {
      pokemons(limit: 120, offset: ${prevOffset}) {
        next
        previous
        nextOffset
        prevOffset
        params
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
            {data.pokemons.results.map((pokemon: { id: number; name: string; image: string }) => (
              <PokemonBtn
                key={pokemon.id}
                pkmnIconPath={pokemon.image}
                pkmnName={pokemon.name}
                pkmnNumber={pokemon.id}
              />
            ))}
          </NationalDexContainer>

          <MDBContainer className="d-flex justify-content-center">
            <BtnGroup>
              <MDBBtn color="info" size="lg" onClick={() => setPrevOffset(data.pokemons.prevOffset)}>Previous</MDBBtn>
              <MDBBtn color="info" size="lg" onClick={() => setPrevOffset(data.pokemons.nextOffset)}>Next</MDBBtn>
            </BtnGroup>
          </MDBContainer>
        </MDBContainer>
      )}
    </>
  );
};

export default PkmnBtnList;
