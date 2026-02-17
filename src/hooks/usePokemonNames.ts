import { useEffect, useState } from 'react';
import axios from 'axios';

interface PokemonNameEntry {
  name: string;
  id: number;
  image: string;
}

/**
 * Module-level cache so the full list is only fetched once per session.
 */
let cachedList: PokemonNameEntry[] | null = null;

/**
 * Custom hook that loads the complete list of Pokémon names from the
 * PokéAPI (via the GraphQL wrapper) and provides a local filter function
 * for instant autocomplete. The full list is fetched once and cached in
 * memory.
 *
 * Using the REST endpoint pokemon-species?limit=<count> would also work,
 * but the GraphQL wrapper already returns image URLs which are useful
 * for showing sprites in the suggestions dropdown.
 */
const usePokemonNames = () => {
  const [pokemonList, setPokemonList] = useState<PokemonNameEntry[]>(
    cachedList ?? [],
  );
  const [loading, setLoading] = useState(cachedList === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedList !== null) {
      setPokemonList(cachedList);
      setLoading(false);
      return;
    }

    const fetchList = async () => {
      try {
        // First get the total species count
        const countRes = await axios.get(
          'https://pokeapi.co/api/v2/pokemon-species?limit=1',
        );
        const totalSpecies = countRes.data.count;

        // Fetch all names via GraphQL (single request)
        const response = await axios.post(
          'https://graphql-pokeapi.vercel.app/api/graphql',
          {
            query: `
              query pokemons($limit: Int) {
                pokemons(limit: $limit, offset: 0) {
                  results {
                    name
                    id
                    image
                  }
                }
              }
            `,
            variables: { limit: totalSpecies },
          },
        );

        const results: PokemonNameEntry[] = response.data.data.pokemons.results.filter(
          (p: PokemonNameEntry) => p.id <= totalSpecies,
        );

        cachedList = results;
        setPokemonList(results);
      } catch (err) {
        setError('Could not load Pokémon list for search.');
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  /**
   * Filters the cached list by a search term. Matches against the
   * beginning of the name first (prefix match), then includes
   * substring matches, sorted so prefix matches appear first.
   */
  const filterByName = (term: string): PokemonNameEntry[] => {
    if (!term || term.length < 2) return [];

    const lower = term.toLowerCase();

    const prefixMatches: PokemonNameEntry[] = [];
    const substringMatches: PokemonNameEntry[] = [];

    pokemonList.forEach((pokemon) => {
      if (pokemon.name.startsWith(lower)) {
        prefixMatches.push(pokemon);
      } else if (pokemon.name.includes(lower)) {
        substringMatches.push(pokemon);
      }
    });

    // Show prefix matches first, then substring matches, cap at 8
    return [...prefixMatches, ...substringMatches].slice(0, 8);
  };

  return {
    pokemonList,
    loading,
    error,
    filterByName,
  };
};

export default usePokemonNames;
