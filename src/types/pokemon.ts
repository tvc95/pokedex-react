/**
 * Shared TypeScript interfaces for Pokémon data used across the application.
 * Centralizing these avoids duplication between pages and components.
 */

export interface EggGroup {
  name: string;
  url: string;
}

export interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export interface Varieties {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  id: number;
  order: number;
  base_happiness: number;
  capture_rate: number;
  gender_rate: number;
  hatch_counter: number;
  forms_switchable: boolean;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  egg_groups: Array<EggGroup>;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: Array<FlavorText>;
  form_descriptions: Array<unknown>;
  generation: {
    name: string;
  };
  growth_rate: {
    name: string;
  };
  varieties: Array<Varieties>;
}

export interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonVariety {
  abilities: Array<Ability>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  name: string;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  weight: number;
}

export interface PokemonMove {
  move: {
    url: string;
    name: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }>;
}

export interface MoveListData {
  moveName: string;
  url: string;
  versionDetails: {
    levelLearned: number;
    learningMethod: string;
    versionGroup: string;
  };
}

// ---------------------------------------------------------------------------
// GraphQL query result types
// ---------------------------------------------------------------------------

/**
 * Shape of the "pokemon" field returned by the GraphQL query in
 * usePokemonData. These mirror the exact field names from the
 * graphql-pokeapi schema (which uses snake_case).
 */
export interface PokemonGraphQL {
  is_default: boolean;
  name: string;
  species: { url: string };
  types: Array<{
    slot: number;
    type: { name: string };
  }>;
  id: number;
  order: number;
  height: number;
  weight: number;
  abilities: Ability[];
  stats: Array<{
    stat: { name: string };
    base_stat: number;
  }>;
  base_experience: number;
  forms: Array<{ url: string; name: string }>;
  moves: PokemonMove[];
}

/**
 * Top-level shape of the useQuery data response.
 */
export interface PokemonQueryData {
  pokemon: PokemonGraphQL;
}
