/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
import { MDBBtn, MDBContainer, MDBRow } from 'mdbreact';
import React from 'react';

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

import { Ability, EggGroup } from '../../types/pokemon';

import PkmnEvoChart from '../../containers/PkmnEvoChart';
import PkmnAlternateForms from '../../containers/PkmnAltForms';
import BaseStatsChart from '../../components/BaseStatsChart/BaseStatsChart';
import PkmnTypeCharts from '../../containers/PkmnTypeCharts/PkmnTypeCharts';
import PkmnMovesets from '../../containers/PkmnMovesets/PkmnMovesets';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import usePokemonData from '../../hooks/usePokemonData';
import formatPokemonName from '../../utils/formatPokemonName';

/**
 * Page component that displays all dex data for a specific Pokémon.
 *
 * All data fetching and transformation is handled by the usePokemonData
 * hook. This component is purely presentational — it only reads the
 * hook's return values and renders the UI.
 */
const DexData: React.FC = () => {
  const {
    graphqlData,
    pokemon,
    varieties,
    moves,
    genName,
    growthRate,
    loading,
    ready,
    error,
  } = usePokemonData();

  // ── Error state ──────────────────────────────────────────────────────
  if (error) {
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
        <p>{error}</p>
        <MDBBtn color="info" onClick={() => window.location.reload()}>
          Try Again
        </MDBBtn>
      </div>
    );
  }

  // ── Loading state ────────────────────────────────────────────────────
  if (loading || !ready) {
    return <LoadingSpinner size="lg" fullPage />;
  }

  // At this point both graphqlData and pokemon are guaranteed non-null
  // because ready === true requires both.
  const gql = graphqlData.pokemon;

  // ── Full page ────────────────────────────────────────────────────────
  return (
    <>
      <DexNavbar />

      <PokemonHeader
        name={formatPokemonName(gql.name)}
        types={gql.types}
        number={gql.id}
        url={gql.species.url}
      />

      <MDBContainer fluid style={{ marginTop: '1rem' }}>
        <MDBRow className="align-items-center">
          <PkmnImageSlides xs="12" lg="6">
            <PkmnArtCarousel pkmnVarieties={varieties} pkmnName={gql.name} />
          </PkmnImageSlides>

          <PokemonInfoI xs="12" lg="6">
            <div id="description">
              <SubTitle>Description</SubTitle>
              <p id="flavor-txt">
                {pokemon!.flavor_text_entries
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
                {gql.abilities.map((ability: Ability) => (
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
            </div>

            <div id="gender-ratio">
              <SubTitle>Gender Ratio</SubTitle>
              <div className="progress" style={{ height: '1.5rem' }}>
                {pokemon!.gender_rate !== -1 ? (
                  <>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${12.5 * (8 - pokemon!.gender_rate)}%` }}
                    >
                      <strong>
                        {`${12.5 * (8 - pokemon!.gender_rate)}%`}
                        {' '}
                        (M)
                      </strong>
                    </div>
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: `${12.5 * pokemon!.gender_rate}%` }}
                    >
                      <strong>
                        {`${12.5 * pokemon!.gender_rate}%`}
                        {' '}
                        (F)
                      </strong>
                    </div>
                  </>
                ) : (
                  <div
                    className="progress-bar bg-dark"
                    role="progressbar"
                    style={{ width: '100%' }}
                  >
                    <strong>Genderless</strong>
                  </div>
                )}
              </div>
            </div>

            <PkmnPhysicalInfo>
              <div id="height">
                <h2>Height</h2>
                <h3>
                  {gql.height / 10}
                  m
                </h3>
              </div>

              <div id="weight">
                <h2>Weight</h2>
                <h3>
                  {gql.weight / 10}
                  kg
                </h3>
              </div>

              <div id="catch-rate">
                <h2>Catch rate</h2>
                <h3>
                  {((pokemon!.capture_rate * 100) / 378).toFixed(1)}
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
                {pokemon!.egg_groups.map((eggGp: EggGroup) => (
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
                {(pokemon!.hatch_counter + 1) * 250}
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
                  {pokemon!.growth_rate.name !== 'slow-then-very-fast' ? (
                    <strong>
                      {growthRate >= 0.4 && pokemon!.growth_rate.name}
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
                  {pokemon!.growth_rate.name !== 'fast-then-very-slow' ? (
                    <strong>
                      {growthRate < 0.4 && pokemon!.growth_rate.name}
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
                  url={pokemon!.evolution_chain.url}
                  pkmnName={gql.name}
                />
              </EvoChartContainer>
            </div>

            <hr />

            <div id="forms">
              <h4>
                <strong>Alternate forms and Regional Variants</strong>
              </h4>
              <PkmnAlternateForms pkmnVarieties={varieties} />
            </div>
          </PokemonInfoII>

          <PokemonStatsContainer xs="12" lg="6">
            <SubTitle>Base Stats</SubTitle>
            <BaseStatsChart pkmnVarieties={varieties} />
          </PokemonStatsContainer>
        </MDBRow>

        <MDBRow>
          <PokemonTypeChart>
            <SubTitle>Type Chart</SubTitle>
            <PkmnTypeCharts
              pkmnVarieties={varieties}
              pkmnName={gql.name.toString()}
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
            <PkmnMovesets pkmnMoves={moves} />
          </MDBContainer>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default DexData;
