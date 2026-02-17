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

import PkmnEvoChart from '../../containers/PkmnEvoChart';
import PkmnAlternateForms from '../../containers/PkmnAltForms';
import BaseStatsChart from '../../components/BaseStatsChart/BaseStatsChart';
import PkmnTypeCharts from '../../containers/PkmnTypeCharts/PkmnTypeCharts';
import PkmnMovesets from '../../containers/PkmnMovesets/PkmnMovesets';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import usePokemonData from '../../hooks/usePokemonData';
import formatPokemonName from '../../utils/formatPokemonName';

import {
  PkmnDescription,
  PkmnAbilities,
  PkmnGenderRatio,
  PkmnPhysicalStats,
  PkmnEggInfo,
  PkmnLevelingRate,
} from '../../components/DexSections';

/**
 * Page component that displays all dex data for a specific Pokémon.
 *
 * Data fetching is handled by usePokemonData. Each visual section
 * is a dedicated component in DexSections/, making this page a
 * lightweight layout orchestrator.
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
        {/* ── Row 1: Art carousel + primary info ──────────────────── */}
        <MDBRow className="align-items-center">
          <PkmnImageSlides xs="12" lg="6">
            <PkmnArtCarousel pkmnVarieties={varieties} pkmnName={gql.name} />
          </PkmnImageSlides>

          <PokemonInfoI xs="12" lg="6">
            <PkmnDescription
              subTitle={SubTitle}
              flavorTextEntries={pokemon!.flavor_text_entries}
              genName={genName}
            />

            <PkmnAbilities
              subTitle={SubTitle}
              list={List}
              abilities={gql.abilities}
            />

            <PkmnGenderRatio
              subTitle={SubTitle}
              genderRate={pokemon!.gender_rate}
            />

            <PkmnPhysicalStats
              wrapper={PkmnPhysicalInfo}
              height={gql.height}
              weight={gql.weight}
              captureRate={pokemon!.capture_rate}
            />
          </PokemonInfoI>
        </MDBRow>

        {/* ── Row 2: Breeding info + stats ────────────────────────── */}
        <MDBRow className="align-items-center">
          <PokemonInfoII xs="12" lg="6">
            <PkmnEggInfo
              subTitle={SubTitle}
              list={List}
              eggGroups={pokemon!.egg_groups}
              hatchCounter={pokemon!.hatch_counter}
            />

            <PkmnLevelingRate
              subTitle={SubTitle}
              growthRateName={pokemon!.growth_rate.name}
              growthRate={growthRate}
            />

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

        {/* ── Row 3: Type chart ───────────────────────────────────── */}
        <MDBRow>
          <PokemonTypeChart>
            <SubTitle>Type Chart</SubTitle>
            <PkmnTypeCharts
              pkmnVarieties={varieties}
              pkmnName={gql.name.toString()}
            />
          </PokemonTypeChart>
        </MDBRow>

        {/* ── Row 4: Moveset ──────────────────────────────────────── */}
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
