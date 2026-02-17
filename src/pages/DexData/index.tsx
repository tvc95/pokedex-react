/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { MDBBtn, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import axios from 'axios';

import DexNavbar from '../../components/Navbars/DexNavbar/DexNavbar';
import PokemonHeader from '../../containers/PokemonHeader/PokemonHeader';
import PkmnArtCarousel from '../../components/Carousels/PokemonArtCarousel/PkmnArtCarousel';

import {
  EvoChartContainer,
  List,
  PkmnImageSlides,
  PkmnPhysicalInfo,
  PokemonInfoI,
  PokemonInfoII,
  PokemonStatsContainer,
  PokemonTypeChart,
  SubTitle,
} from './styles';

import {
  Pokemon,
  Ability,
  PokemonVariety,
  PokemonMove,
  EggGroup,
} from '../../types/pokemon';

import PkmnEvoChart from '../../containers/PkmnEvoChart';
import PkmnAlternateForms from '../../containers/PkmnAltForms';
import BaseStatsChart from '../../components/BaseStatsChart/BaseStatsChart';
import PkmnTypeCharts from '../../containers/PkmnTypeCharts/PkmnTypeCharts';
import PkmnMovesets from '../../containers/PkmnMovesets/PkmnMovesets';

/**
 * Page component that returns all dex data from a specific Pokémon
 * @returns
 */
const DexData: React.FC = () => {
  /// States and Hooks
  const location = useLocation();
  const [pathName] = useState(location.pathname);
  const [pkmnDexData, setPkmnDexData] = useState<Pokemon | null>(null);
  const [pkmnVarieties, setPkmnVarieties] = useState<PokemonVariety[]>([]);
  const [pkmnMoves, setPkmnMoves] = useState<PokemonMove[]>([]);
  const [genName, setGenName] = useState('');
  const [growthRate, setGrowthRate] = useState(0);
  const [loadData, setLoadData] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  /// GraphQL queries
  const pkmnQuery = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
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
        moves {
          move {
            url
            name
          }
          version_group_details {
            level_learned_at
            move_learn_method {
              name
            }
            version_group {
              name
            }
          }
        }
      }
    }
  `;
  const { loading, data, error } = useQuery(pkmnQuery, {
    variables: { name: pathName.slice(13) },
  });

  /**
   * [Helper function]
   * Formats text ("First introduced in Generation (Roman number)")
   * @param text (Ex.: "generation-x")
   * @returns the formatted input text
   */
  const formatGenText = (text: string) => {
    const [gen, number] = text.split('-');

    const outputText = `${gen.charAt(0).toUpperCase() + gen.substr(1)} ${number.toUpperCase()}`;

    return outputText;
  };

  /**
   * [Helper function]
   * This function gets the string value from the Pokémon's leveling
   * rate and converts it to a percentual proportion, in order to apply
   * to the Leveling Rate progress bar UI
   * @param rate (string)
   * @returns a decimal number from 0 to 1, indicating the Pokémon's leveling rate
   */
  const getGrowthRate = (rate: string) => {
    switch (rate) {
      case 'fast-then-very-slow':
        return 0.1;
      case 'slow':
        return 0.2;
      case 'medium-slow':
        return 0.4;
      case 'medium':
        return 0.6;
      case 'fast':
        return 0.8;
      case 'slow-then-very-fast':
        return 0.9;
      default:
        return 0;
    }
  };

  /**
   * Fetches data from PokéAPI, including varieties info (mega evolutions and
   * alternate forms) and moves
   */
  const fetchPkmnData = useCallback(async (pkData: any) => {
    try {
      const response = await axios.get(pkData.pokemon.species.url);

      setPkmnDexData(response.data);

      // Fetch and set varieties
      const varieties = await response.data.varieties.map(
        async (variety: {
          is_default: boolean;
          pokemon: {
            name: string;
            url: string;
          };
        }) => {
          const varietyResponse = await axios.get(variety.pokemon.url);

          const res: PokemonVariety = {
            abilities: varietyResponse.data.abilities,
            forms: varietyResponse.data.forms,
            name: varietyResponse.data.name,
            stats: varietyResponse.data.stats,
            types: varietyResponse.data.types,
            weight: varietyResponse.data.weight,
          };

          return res;
        },
      );

      const promises = await Promise.all<PokemonVariety>(varieties);
      setPkmnVarieties(promises);

      setPkmnMoves(pkData.pokemon.moves);

      setGenName(formatGenText(response.data.generation.name));
      setGrowthRate(getGrowthRate(response.data.growth_rate.name));
    } catch (err) {
      setFetchError('Failed to load Pokémon data. Please try again later.');
    }
  }, []);

  /**
   * useEffect() will be responsible for all Pokémon data fetching
   * in the page. It is made to run only once, every time the user
   * enters a specific pokémon dex info page. This avoids problems
   * of performance.
   */
  useEffect(() => {
    const execute = async () => {
      await fetchPkmnData(data);
    };

    if (data) {
      execute();
    }
  }, [data, fetchPkmnData]);

  useEffect(() => {
    if (!loadData) {
      if (pkmnVarieties.length !== 0) {
        setLoadData(true);
      }
    }
  }, [data, loadData, pkmnVarieties]);

  /// Render DOM
  /**
   * Rendering error state
   */
  if (error || fetchError) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '15%',
        }}
      >
        <h2>Oops! Something went wrong.</h2>
        <p>{fetchError || 'Could not load Pokémon data from the server.'}</p>
        <MDBBtn color="info" onClick={() => window.location.reload()}>
          Try Again
        </MDBBtn>
      </div>
    );
  }

  /**
   * Rendering loading spinner
   */
  if (loading || pkmnDexData === null || pkmnVarieties.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '25%',
        }}
      >
        <div
          className="spinner-border text-info"
          role="status"
          style={{ width: '160px', height: '160px' }}
        >
          <span style={{ width: '200px', height: '200px' }} className="sr-only">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  /**
   * Rendering full page
   */
  if (loadData) {
    return (
      <>
        <DexNavbar />

        <PokemonHeader
          name={
            data.pokemon.name.charAt(0)
            + data.pokemon.name.slice(1).replace('-', ' ')
          }
          types={data.pokemon.types}
          number={data.pokemon.id}
          url={data.pokemon.species.url}
        />

        <MDBContainer fluid style={{ marginTop: '1rem' }}>
          <MDBRow className="align-items-center">
            <PkmnImageSlides xs="12" lg="6">
              <PkmnArtCarousel
                pkmnVarieties={pkmnVarieties}
                pkmnName={data.pokemon.name}
              />
            </PkmnImageSlides>

            <PokemonInfoI xs="12" lg="6">
              <div id="description">
                <SubTitle>Description</SubTitle>
                <p id="flavor-txt">
                  {pkmnDexData?.flavor_text_entries
                    .filter(
                      (entry) => entry.language.name === 'en'
                        && (entry.version.name === 'x'
                          || entry.version.name === 'ultra-sun'
                          || entry.version.name === 'sword'),
                    )
                    .slice(0, 2)
                    .map((entry) => `${entry.flavor_text} `)}
                </p>
                <p>
                  <small>
                    <em>
                      First introduced in
                      {genName}
                    </em>
                  </small>
                </p>
              </div>

              <div id="abilities">
                <SubTitle>Abilities</SubTitle>
                <List>
                  {data.pokemon.abilities.map((ability: Ability) => (
                    <li key={ability.ability.name}>
                      <div
                        className={`is-hidden-${ability.is_hidden.toString()}`}
                      >
                        <span>{ability.ability.name}</span>
                        {ability.is_hidden && <em>(Hidden)</em>}
                      </div>
                    </li>
                  ))}
                </List>
                {/* Still needs to render pokemon mega abilities (if applicable) */}
              </div>

              <div id="gender-ratio">
                <SubTitle>Gender Ratio</SubTitle>
                <div className="progress" style={{ height: '1.5rem' }}>
                  {pkmnDexData.gender_rate !== -1 ? (
                    <>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${12.5 * (8 - pkmnDexData.gender_rate)}%`,
                        }}
                      >
                        <strong>
                          {`${12.5 * (8 - pkmnDexData.gender_rate)}%`}
                          {' '}
                          (M)
                        </strong>
                      </div>
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: `${12.5 * pkmnDexData.gender_rate}%` }}
                      >
                        <strong>
                          {`${12.5 * pkmnDexData.gender_rate}%`}
                          {' '}
                          (F)
                        </strong>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="progress-bar bg-dark"
                        role="progressbar"
                        style={{ width: `${100}%` }}
                      >
                        <strong>Genderless</strong>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <PkmnPhysicalInfo>
                <div id="height">
                  <h2>Height</h2>
                  <h3>
                    {data.pokemon.height / 10}
                    m
                  </h3>
                </div>

                <div id="weight">
                  <h2>Weight</h2>
                  <h3>
                    {data.pokemon.weight / 10}
                    kg
                  </h3>
                </div>

                <div id="catch-rate">
                  <h2>Catch rate</h2>
                  <h3>
                    {((pkmnDexData.capture_rate * 100) / 378).toFixed(1)}
                    %
                  </h3>
                </div>
              </PkmnPhysicalInfo>
            </PokemonInfoI>
          </MDBRow>

          <MDBRow className="align-items-center">
            <PokemonInfoII xs="12" lg="6">
              <div id="egg-gps">
                <SubTitle>Egg Groups</SubTitle>
                <List>
                  {pkmnDexData.egg_groups.map((eggGp: EggGroup) => (
                    <li key={eggGp.name}>
                      <div className="egg-gp">
                        <span>{eggGp.name}</span>
                      </div>
                    </li>
                  ))}
                </List>
              </div>

              <div id="hatching-time">
                <SubTitle>Hatching time</SubTitle>
                <p>
                  {(pkmnDexData.hatch_counter + 1) * 250}
                  {' '}
                  steps (approximately)
                </p>
              </div>

              <div id="leveling-rate">
                <SubTitle>Leveling rate</SubTitle>
                <div className="progress" style={{ height: '1.5rem' }}>
                  <div
                    className="progress-bar progress-bar-striped bg-success"
                    role="progressbar"
                    style={{ width: `${100 * growthRate}%` }}
                  >
                    {pkmnDexData.growth_rate.name !== 'slow-then-very-fast' ? (
                      <strong>
                        {growthRate >= 0.4 && pkmnDexData.growth_rate.name}
                      </strong>
                    ) : (
                      <strong>{growthRate >= 0.4 && 'erratic'}</strong>
                    )}
                  </div>
                  <div
                    className="progress-bar bg-dark"
                    role="progressbar"
                    style={{ width: `${100 - 100 * growthRate}%` }}
                  >
                    {pkmnDexData.growth_rate.name !== 'fast-then-very-slow' ? (
                      <strong>
                        {growthRate < 0.4 && pkmnDexData.growth_rate.name}
                      </strong>
                    ) : (
                      <strong>{growthRate < 0.4 && 'fluctuating'}</strong>
                    )}
                  </div>
                </div>
              </div>

              <div id="evolution-chart-div">
                <SubTitle>Evolution Chart</SubTitle>
                <EvoChartContainer id="evo-chart-container">
                  <PkmnEvoChart
                    url={pkmnDexData.evolution_chain.url}
                    pkmnName={data.pokemon.name}
                  />
                </EvoChartContainer>
              </div>

              <hr />

              <div id="forms">
                <h4>
                  <strong>Alternate forms and Regional Variants</strong>
                </h4>
                <PkmnAlternateForms pkmnVarieties={pkmnVarieties} />
              </div>
            </PokemonInfoII>

            <PokemonStatsContainer xs="12" lg="6">
              <SubTitle>Base Stats</SubTitle>
              <BaseStatsChart pkmnVarieties={pkmnVarieties} />
            </PokemonStatsContainer>
          </MDBRow>

          <MDBRow>
            <PokemonTypeChart>
              <SubTitle>Type Chart</SubTitle>
              <PkmnTypeCharts
                pkmnVarieties={pkmnVarieties}
                pkmnName={data.pokemon.name.toString()}
              />
            </PokemonTypeChart>
          </MDBRow>

          <MDBRow>
            <MDBContainer fluid>
              <SubTitle
                style={{ fontSize: '2.5rem', textDecorationLine: 'underline' }}
              >
                Moveset
              </SubTitle>
              <PkmnMovesets pkmnMoves={pkmnMoves} />
            </MDBContainer>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }

  return null;
};

export default DexData;
