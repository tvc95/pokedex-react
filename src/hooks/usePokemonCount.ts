import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Cache the species count at module level so it persists across
 * component mounts without needing a global state library.
 */
let cachedCount: number | null = null;

/**
 * Custom hook that fetches the total number of Pokémon species
 * from the PokéAPI. The count is fetched once and cached in memory
 * so subsequent calls return instantly.
 *
 * This replaces all hardcoded Pokémon limits (893, 898, 840, etc.)
 * and ensures the app stays up-to-date as new generations are released.
 *
 * @returns {{ totalSpecies: number | null, loading: boolean, error: string | null }}
 */
const usePokemonCount = () => {
  const [totalSpecies, setTotalSpecies] = useState<number | null>(cachedCount);
  const [loading, setLoading] = useState(cachedCount === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we already have the count cached, skip the fetch
    if (cachedCount !== null) {
      setTotalSpecies(cachedCount);
      setLoading(false);
      return;
    }

    const fetchCount = async () => {
      try {
        // Fetch with limit=1 to get just the count without downloading
        // the entire species list. The API returns a "count" field
        // with the total number of Pokémon species.
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon-species?limit=1',
        );

        const { count } = response.data;
        cachedCount = count;
        setTotalSpecies(count);
      } catch (err) {
        setError('Could not fetch Pokémon count.');
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { totalSpecies, loading, error };
};

export default usePokemonCount;
