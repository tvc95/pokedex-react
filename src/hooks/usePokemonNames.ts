import { useQuery } from "react-query";
import axios from "axios";

interface PokemonNameEntry {
  name: string;
  id: number;
  image: string;
}

/**
 * Fetches the complete list of Pokémon names, IDs, and sprite URLs.
 * First gets the total count, then fetches all in a single GraphQL call.
 */
const fetchPokemonNames = async (): Promise<PokemonNameEntry[]> => {
  // Get total species count
  const countRes = await axios.get(
    "https://pokeapi.co/api/v2/pokemon-species?limit=1",
  );
  const totalSpecies: number = countRes.data.count;

  // Fetch all names via GraphQL (single request)
  const response = await axios.post(
    "https://graphql-pokeapi.vercel.app/api/graphql",
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

  return response.data.data.pokemons.results.filter(
    (p: PokemonNameEntry) => p.id <= totalSpecies,
  );
};

/**
 * Custom hook that provides the full Pokémon name list and a local
 * filter function for instant autocomplete.
 *
 * React Query handles caching, deduplication, and retry. The name list
 * is fetched once and cached indefinitely (staleTime: Infinity) since
 * the Pokémon list only changes with new game releases.
 */
const usePokemonNames = () => {
  const {
    data: pokemonList,
    isLoading,
    error,
  } = useQuery("pokemonNamesList", fetchPokemonNames, {
    staleTime: Infinity,
  });

  const list = pokemonList ?? [];

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

    list.forEach((pokemon) => {
      if (pokemon.name.startsWith(lower)) {
        prefixMatches.push(pokemon);
      } else if (pokemon.name.includes(lower)) {
        substringMatches.push(pokemon);
      }
    });

    return [...prefixMatches, ...substringMatches].slice(0, 8);
  };

  return {
    pokemonList: list,
    loading: isLoading,
    error: error ? "Could not load Pokémon list for search." : null,
    filterByName,
  };
};

export default usePokemonNames;
