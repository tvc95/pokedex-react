import { useQuery } from 'react-query';
import axios from 'axios';

/**
 * Fetches the total number of Pokémon species from the PokéAPI.
 * Uses limit=1 to get just the count metadata without downloading
 * the entire species list.
 */
const fetchSpeciesCount = async (): Promise<number> => {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon-species?limit=1',
  );
  return response.data.count;
};

/**
 * Custom hook that returns the total number of Pokémon species.
 *
 * Powered by React Query, which provides:
 * - Automatic caching (fetched once, reused everywhere)
 * - Deduplication (multiple components calling this hook = 1 request)
 * - Automatic retry on failure
 * - staleTime: Infinity because the species count rarely changes
 *
 * This replaces the previous manual useState + useEffect + module-level
 * cache approach with a single useQuery call.
 */
const usePokemonCount = () => {
  const {
    data: totalSpecies,
    isLoading,
    error,
  } = useQuery('pokemonSpeciesCount', fetchSpeciesCount, {
    staleTime: Infinity,
  });

  return {
    totalSpecies: totalSpecies ?? null,
    loading: isLoading,
    error: error ? 'Could not fetch Pokémon count.' : null,
  };
};

export default usePokemonCount;
