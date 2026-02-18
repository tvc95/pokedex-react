import { useQuery as useReactQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { gql, useQuery as useApolloQuery } from '@apollo/client';
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
// GraphQL query (still managed by Apollo Client for cache consistency)
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
// REST data fetcher (species + varieties)
// ---------------------------------------------------------------------------

interface SpeciesDataResult {
  pokemon: Pokemon;
  varieties: PokemonVariety[];
  genName: string;
  growthRate: number;
}

/**
 * Fetches species data and all varieties for a Pokémon.
 * This is the expensive call that benefits most from React Query caching:
 * if a user visits Pikachu, navigates away, and comes back, this data
 * is served instantly from cache.
 */
const fetchSpeciesData = async (
  speciesUrl: string,
): Promise<SpeciesDataResult> => {
  const speciesResponse = await axios.get(speciesUrl);
  const speciesData: Pokemon = speciesResponse.data;

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

  const varieties = await Promise.all<PokemonVariety>(varietyPromises);

  return {
    pokemon: speciesData,
    varieties,
    genName: formatGenText(speciesData.generation.name),
    growthRate: getGrowthRate(speciesData.growth_rate.name),
  };
};

// ---------------------------------------------------------------------------
// Return type
// ---------------------------------------------------------------------------

interface UsePokemonDataResult {
  graphqlPokemon: PokemonGraphQL | null;
  pokemon: Pokemon | null;
  varieties: PokemonVariety[];
  moves: PokemonMove[];
  genName: string;
  growthRate: number;
  loading: boolean;
  ready: boolean;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Custom hook that encapsulates all data fetching for the Pokémon
 * detail page.
 *
 * Architecture:
 * - Apollo Client handles the GraphQL query (maintains its own cache)
 * - React Query handles the REST calls (species + varieties) with:
 *   · Automatic caching keyed by species URL
 *   · Deduplication if the same Pokémon is requested twice
 *   · Automatic retry (configured globally in QueryClient)
 *   · stale-while-revalidate: instant revisits, background refresh
 *
 * The REST query is "dependent" — it only fires once the GraphQL
 * query has resolved and provided the species URL.
 */
const usePokemonData = (): UsePokemonDataResult => {
  const location = useLocation();
  const pokemonName = location.pathname.slice(13);

  // Step 1: GraphQL query for core data
  const {
    loading: gqlLoading,
    data: gqlData,
    error: gqlError,
  } = useApolloQuery<PokemonQueryData>(POKEMON_QUERY, {
    variables: { name: pokemonName },
  });

  const speciesUrl = gqlData?.pokemon?.species?.url;

  // Step 2: Dependent React Query for species + varieties
  // Only fires when speciesUrl is available (enabled: !!speciesUrl)
  const {
    data: speciesData,
    isLoading: speciesLoading,
    error: speciesError,
  } = useReactQuery(
    ['pokemonSpecies', speciesUrl],
    () => fetchSpeciesData(speciesUrl!),
    {
      enabled: !!speciesUrl,
      staleTime: 10 * 60 * 1000, // 10 min — species data rarely changes
    },
  );

  // Derive composite states
  const isLoading = gqlLoading || speciesLoading;
  const isReady = !!gqlData?.pokemon && !!speciesData;

  let errorMessage: string | null = null;
  if (gqlError) {
    errorMessage = 'Could not load Pokémon data from the server.';
  } else if (speciesError) {
    errorMessage = 'Failed to load Pokémon species data. Please try again later.';
  }

  return {
    graphqlPokemon: gqlData?.pokemon ?? null,
    pokemon: speciesData?.pokemon ?? null,
    varieties: speciesData?.varieties ?? [],
    moves: gqlData?.pokemon?.moves ?? [],
    genName: speciesData?.genName ?? '',
    growthRate: speciesData?.growthRate ?? 0,
    loading: isLoading,
    ready: isReady,
    error: errorMessage,
  };
};

export default usePokemonData;
