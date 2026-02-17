import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import axios from 'axios';
import {
  Pokemon,
  PokemonVariety,
  PokemonMove,
  PokemonQueryData,
  PokemonGraphQL,
} from '../types/pokemon';

// ---------------------------------------------------------------------------
// Helper functions (pure, no side effects — easy to unit test)
// ---------------------------------------------------------------------------

/**
 * Formats a generation identifier from the API into a human-readable string.
 *
 * @param text - e.g. "generation-iv"
 * @returns e.g. "Generation IV"
 */
export const formatGenText = (text: string): string => {
  const [gen, number] = text.split('-');
  return `${gen.charAt(0).toUpperCase() + gen.substr(1)} ${number.toUpperCase()}`;
};

/**
 * Converts a growth rate name into a decimal proportion (0–1) for
 * the leveling rate progress bar.
 *
 * @param rate - e.g. "medium", "fast", "slow-then-very-fast"
 * @returns A number between 0 and 1
 */
export const getGrowthRate = (rate: string): number => {
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

// ---------------------------------------------------------------------------
// GraphQL query
// ---------------------------------------------------------------------------

const POKEMON_QUERY = gql`
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

// ---------------------------------------------------------------------------
// Return type
// ---------------------------------------------------------------------------

interface UsePokemonDataResult {
  /** Typed GraphQL pokemon data (types, stats, abilities, moves, etc.) */
  graphqlPokemon: PokemonGraphQL | null;
  /** Species-level data from the REST API (dex entries, gender, eggs, etc.) */
  pokemon: Pokemon | null;
  /** All varieties / forms of this Pokémon */
  varieties: PokemonVariety[];
  /** Move list from the GraphQL query */
  moves: PokemonMove[];
  /** Human-readable generation string, e.g. "Generation IV" */
  genName: string;
  /** Decimal proportion for the growth rate progress bar */
  growthRate: number;
  /** True while any data is still being fetched */
  loading: boolean;
  /** True once ALL data has been fetched and is ready to render */
  ready: boolean;
  /** Error message if any fetch failed, or null */
  error: string | null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Custom hook that encapsulates all data fetching and transformation
 * for the Pokémon detail page (DexData).
 *
 * It orchestrates:
 * 1. A GraphQL query for core Pokémon data (types, stats, abilities, moves)
 * 2. A REST call to the species endpoint (dex entries, gender, generation, etc.)
 * 3. Individual REST calls for each variety/form (mega, regional, gigantamax)
 *
 * All state, effects, and error handling live here so the page component
 * only needs to focus on rendering.
 */
const usePokemonData = (): UsePokemonDataResult => {
  const location = useLocation();
  const [pathName] = useState(location.pathname);

  // Derived data states
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [varieties, setVarieties] = useState<PokemonVariety[]>([]);
  const [moves, setMoves] = useState<PokemonMove[]>([]);
  const [genName, setGenName] = useState('');
  const [growthRateValue, setGrowthRateValue] = useState(0);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // GraphQL query — typed with PokemonQueryData
  const {
    loading: gqlLoading,
    data: gqlData,
    error: gqlError,
  } = useQuery<PokemonQueryData>(POKEMON_QUERY, {
    variables: { name: pathName.slice(13) },
  });

  /**
   * Once the GraphQL query resolves, fetch species data and varieties
   * from the REST API.
   */
  const fetchSpeciesData = useCallback(
    async (queryResult: PokemonQueryData) => {
      try {
        const speciesResponse = await axios.get(
          queryResult.pokemon.species.url,
        );
        const speciesData: Pokemon = speciesResponse.data;

        setPokemon(speciesData);

        // Fetch all varieties in parallel
        const varietyPromises = speciesData.varieties.map(async (variety) => {
          const varResponse = await axios.get(variety.pokemon.url);
          const v: PokemonVariety = {
            abilities: varResponse.data.abilities,
            forms: varResponse.data.forms,
            name: varResponse.data.name,
            stats: varResponse.data.stats,
            types: varResponse.data.types,
            weight: varResponse.data.weight,
          };
          return v;
        });

        const resolvedVarieties = await Promise.all<PokemonVariety>(varietyPromises);
        setVarieties(resolvedVarieties);

        setMoves(queryResult.pokemon.moves);
        setGenName(formatGenText(speciesData.generation.name));
        setGrowthRateValue(getGrowthRate(speciesData.growth_rate.name));
      } catch (err) {
        setFetchError('Failed to load Pokémon data. Please try again later.');
      }
    },
    [],
  );

  useEffect(() => {
    if (gqlData) {
      fetchSpeciesData(gqlData);
    }
  }, [gqlData, fetchSpeciesData]);

  // Determine composite loading / ready / error states
  const isLoading = gqlLoading || (pokemon === null && !fetchError && !gqlError);
  const isReady = pokemon !== null && varieties.length > 0;

  let errorMessage: string | null = null;
  if (gqlError) {
    errorMessage = 'Could not load Pokémon data from the server.';
  } else if (fetchError) {
    errorMessage = fetchError;
  }

  return {
    graphqlPokemon: gqlData?.pokemon ?? null,
    pokemon,
    varieties,
    moves,
    genName,
    growthRate: growthRateValue,
    loading: isLoading,
    ready: isReady,
    error: errorMessage,
  };
};

export default usePokemonData;
