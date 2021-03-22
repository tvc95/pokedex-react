/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from './styles';

interface EvoDetails {
  gender: unknown;
  held_item: unknown;
  item: unknown;
  known_move: unknown;
  known_move_type: unknown;
  location: unknown;
  min_affection: unknown;
  min_beauty: unknown;
  min_happiness: unknown;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: unknown;
  party_type: unknown;
  relative_physical_stats: unknown;
  time_of_day: string;
  trade_species: unknown;
  trigger: {
    name: string,
    url: string,
  },
  turn_upside_down: boolean;
}

interface EvolutionChain {
  id: number;
  baby_trigger_item: Record<string, unknown> | null;
  chain: Chain;
}

interface PokemonEvo {
  evolution_details: Array<EvoDetails>;
  evolves_to: Array<PokemonEvo>;
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}

interface EvoChainProps {
  url: string;
  pkmnName: string;
}

interface Chain {
  species: {
    name: string;
    url: string;
  };
  is_baby: boolean;
  evolution_details: Array<EvoDetails>;
  evolves_to: Array<PokemonEvo>;
}

interface ChainProps {
  chain: Chain;
  loadEvoChains: boolean;
  setLoadEvoChains: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderEvos: React.FC<ChainProps> = ({ chain, loadEvoChains, setLoadEvoChains }) => {
  const [stage, setStage] = useState(0);

  const getEvos = useCallback((evoChain) => {
    if (evoChain.evolves_to !== []) {
      setStage(stage + 1);
      evoChain.evolves_to.map((evolution: Chain) => (
        <>
          <Link to={`/data/pokemon/${evolution.species.name}`} key={evolution.species.name}>
            <Container>
              <img
                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${evolution.species.name}.png`}
                alt={`${evolution.species.name}`}
              />

              <p>
                <strong>
                  Stage
                  {' '}
                  {stage}
                </strong>
              </p>
              <p>{evolution.evolution_details[0].trigger.name}</p>
            </Container>
          </Link>
          <RenderEvos chain={evolution} loadEvoChains={loadEvoChains} setLoadEvoChains={setLoadEvoChains} />
        </>
      ));
    }
    return null;
  }, [loadEvoChains, setLoadEvoChains, stage]);

  if (!loadEvoChains) {
    setLoadEvoChains(true);
    return getEvos(chain);
  }

  return null;
};

/**
 * Function component for evolution charts
 * @returns JSX.Element
 */
const PkmnEvoChart: React.FC<EvoChainProps> = ({ url, pkmnName }: EvoChainProps) => {
  const [evoChain, setEvoChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadEvoChains, setLoadEvoChains] = useState(false);

  useEffect(() => {
    async function fetchEvoChain(pokeurl: string): Promise<void> {
      const response = await axios.get(pokeurl);
      setEvoChain(response.data);
      setLoading(false);
    }

    if (evoChain === null) {
      fetchEvoChain(url);
    }
  }, [evoChain, url, pkmnName]);

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
      <Link to={`/data/pokemon/${evoChain?.chain.species.name}`}>
        <Container>
          <img
            src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${evoChain?.chain.species.name}.png`}
            alt={`${evoChain?.chain.species.name}`}
          />

          <p><strong>Basic</strong></p>

          {evoChain?.chain.is_baby ? (
            <p>Baby</p>
          ) : (
            <p>Lv. 1</p>
          )}
        </Container>
      </Link>
      {evoChain?.chain !== undefined ? (
        <RenderEvos
          chain={evoChain.chain}
          loadEvoChains={loadEvoChains}
          setLoadEvoChains={setLoadEvoChains}
        />
      ) : null}
    </>
  );
};

export default PkmnEvoChart;
