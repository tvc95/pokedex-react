/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, Linkk } from './styles';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import formatPokemonName from '../../utils/formatPokemonName';

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
    name: string;
    url: string;
  };
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
  stage: number;
  pkmnName: string;
  history: ReturnType<typeof useHistory>;
}

/**
 * Recursive function component that displays subsequent Pokémon evolution stages
 * https://stackoverflow.com/questions/45286713/render-recursively-a-nested-data-in-react
 * @param param0
 * @returns
 */
const Evolution: React.FC<ChainProps> = ({
  chain,
  stage,
  pkmnName,
  history,
}: ChainProps) => (
  <>
    {chain.evolves_to.map((evolution) => (
      <>
        <Linkk
          to="#"
          key={evolution.species.name}
          onClick={() => history.push(`/data/pokemon/${evolution.species.name}`)}
          aria-label={`View ${formatPokemonName(evolution.species.name)} details`}
        >
          <Container
            pokeName={pkmnName}
            speciesName={`${evolution.species.name}`}
          >
            <img
              src={`https://raw.githubusercontent.com/remokon/gen-9-sprites/refs/heads/main/gen-5-style/${evolution.species.name}.png`}
              alt={`${formatPokemonName(evolution.species.name)} sprite, evolution stage ${stage}`}
            />
            <p>
              <strong>
                Stage
                {stage}
              </strong>
            </p>
            <p>{evolution.evolution_details[0].trigger.name}</p>
          </Container>
        </Linkk>

        {evolution.evolves_to && (
          <Evolution
            chain={evolution}
            stage={2}
            pkmnName={pkmnName}
            history={history}
            key={evolution.species.url}
          />
        )}
      </>
    ))}
  </>
);

/**
 * Function component for evolution charts
 * @returns JSX.Element
 */
const PkmnEvoChart: React.FC<EvoChainProps> = ({
  url,
  pkmnName,
}: EvoChainProps) => {
  const [evoChain, setEvoChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let cancelled = false;

    async function fetchEvoChain(pokeurl: string): Promise<void> {
      setLoading(true);
      const response = await axios.get(pokeurl);
      if (!cancelled) {
        setEvoChain(response.data);
        setLoading(false);
      }
    }

    fetchEvoChain(url);

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading) {
    return <LoadingSpinner size="sm" fullPage={false} />;
  }

  return (
    <>
      <Linkk
        to="#"
        onClick={() => history.push(`/data/pokemon/${evoChain?.chain.species.name}`)}
        aria-label={`View ${formatPokemonName(evoChain?.chain.species.name ?? '')} details`}
      >
        <Container
          pokeName={pkmnName}
          speciesName={`${evoChain?.chain.species.name}`}
        >
          <img
            src={`https://raw.githubusercontent.com/remokon/gen-9-sprites/refs/heads/main/gen-5-style/${evoChain?.chain.species.name}.png`}
            alt={`${formatPokemonName(evoChain?.chain.species.name ?? '')} sprite, base form`}
          />

          <p>
            <strong>Basic</strong>
          </p>

          {evoChain?.chain.is_baby ? <p>Baby</p> : <p>Lv. 1</p>}
        </Container>
      </Linkk>

      {evoChain?.chain.evolves_to && (
        <Evolution
          chain={evoChain.chain}
          stage={1}
          pkmnName={pkmnName}
          history={history}
        />
      )}
    </>
  );
};

export default PkmnEvoChart;
