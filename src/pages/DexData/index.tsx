import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import axios from 'axios';
import DexNavbar from '../../components/Navbars/DexNavbar/DexNavbar';
import PokemonHeader from '../../containers/PokemonHeader/PokemonHeader';
import PkmnArtCarousel from '../../components/Carousels/PokemonArtCarousel/PkmnArtCarousel';

const DexData: React.FC = () => {
  const location = useLocation();
  const [pathName] = useState(location.pathname);
  const [pkmnDexData, setPkmnDexData] = useState([]);

  const pkmnQuery = gql`
    query pokemon {
      pokemon(name: "${pathName.slice(13)}") {
        is_default
        name
        species {
          url
        }
        types {
          slot
          type {
            name
          }
        }
        id
        order
        height
        weight
        abilities {
          ability {
            name
          }
          is_hidden
        }
        stats {
          stat {
            name
          }
          base_stat
        }
        base_experience
        forms {
          url
          name
        }
      }
    }
  `;

  const { loading, data } = useQuery(pkmnQuery);

  const fetchPokemonData = () => {
    if (!loading) {
      axios.get(data.pokemon.species.url)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.data;
          }
          throw Error(response.data.message);
        })
        .then((pkmnFullData) => {
          setPkmnDexData(pkmnFullData);
          console.log(pkmnDexData);
        });
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DexNavbar />
      <PokemonHeader
        name={data.pokemon.name}
        types={data.pokemon.types}
        number={data.pokemon.id}
        url={data.pokemon.species.url}
      />
      <MDBContainer fluid style={{ marginTop: '1rem' }}>
        <MDBRow className="align-items-center">
          <MDBCol xs="12" lg="6" id="pokemon-image-slides">
            <PkmnArtCarousel
              length={3}
              pkmnName={data.pokemon.name}
            />
          </MDBCol>

          <MDBCol xs="12" lg="6" id="pkmn-info-p1">
            <div id="description">
              <h3>Description</h3>
              <p id="flavor-txt">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ab numquam nulla, exercitationem necessitatibus veniam explicabo quia aspernatur
                ad inventore, voluptate soluta consequatur? Ex fugiat illum quisquam. Fugit
                placeat quae unde.
              </p>
              <p>
                <small>
                  <em>
                    First introduced in Generation I (Pokémon Red/Blue/Green/Yellow)
                  </em>
                </small>
              </p>
            </div>
            <br />
            <div id="a" />
          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </div>
  );
};

export default DexData;
