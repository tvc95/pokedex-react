/* eslint-disable camelcase */
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import axios from 'axios';
import DexNavbar from '../../components/Navbars/DexNavbar/DexNavbar';
import PokemonHeader from '../../containers/PokemonHeader/PokemonHeader';
import PkmnArtCarousel from '../../components/Carousels/PokemonArtCarousel/PkmnArtCarousel';

interface Pokemon {
  name: string;
  id: number;
  order: number;
  base_happiness: number;
  capture_rate: number;
  gender_rate: number;
  hatch_counter: number;
  forms_switchable: boolean;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  egg_groups: Array<EggGroup>;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: Array<FlavorText>;
  form_descriptions: Array<any>;
  generation: {
    name: string;
  };
  growth_rate: {
    name: string;
  };
  varieties: Array<Varieties>;

}

interface EggGroup {
  name: string;
  url: string;
}

interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  }
}

interface Varieties {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

interface Ability {
  ability: {
    name: string;
  }
  is_hidden: boolean;
}

const DexData: React.FC = () => {
  const location = useLocation();
  const [pathName] = useState(location.pathname);
  const [pkmnDexData, setPkmnDexData] = useState<Pokemon | null>(null);
  const [genName, setGenName] = useState('');

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

  const megaQuery = gql`
    query pokemon {
      pokemon(name: "${pathName.slice(13)}-mega") {
        name
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
        forms {
          url
          name
        }
      }
    }
  `;

  const { loading, data } = useQuery(pkmnQuery);
  // const { loadingMega, megaData } = useQuery(megaQuery);

  const formatGenText = (text: string) => {
    const [gen, number] = text.split('-');

    const outputText = `${gen.charAt(0).toUpperCase() + gen.substr(1)} ${number.toUpperCase()}`;

    return outputText;
  };

  useEffect(() => {
    async function fetchPkmnData(): Promise<void> {
      const response = await axios.get(data.pokemon.species.url);

      setPkmnDexData(response.data);
      setGenName(formatGenText(response.data.generation.name));
      // console.log(pkmnDexData);
    }

    fetchPkmnData();
  }, [data.pokemon.species.url, pkmnDexData]);

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
    <>
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
                {pkmnDexData?.flavor_text_entries.map((entry) => {
                  if (entry.language.name === 'en') {
                    if (entry.version.name === 'sword' || entry.version.name === 'shield') {
                      return (`${entry.flavor_text} `);
                    }
                  }
                  return null;
                })}
              </p>
              <p>
                <small>
                  <em>
                    First introduced in
                    {' '}
                    {genName}
                  </em>
                </small>
              </p>
            </div>
            <br />

            <div id="abilities">
              <h3>Abilities</h3>
              <ul>
                {data.pokemon.abilities.map((ability: Ability) => (
                  <li key={ability.ability.name}>
                    <div className={`is-hidden-${ability.is_hidden.toString()}`}>
                      <span>{ability.ability.name}</span>
                    </div>
                  </li>
                ))}
              </ul>

            </div>
          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </>
  );
};

export default DexData;
