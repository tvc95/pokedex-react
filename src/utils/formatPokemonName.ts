/**
 * Centralized Pokémon name formatting utility.
 *
 * The PokéAPI uses lowercase, hyphenated identifiers (e.g. "mr-mime",
 * "tapu-koko", "type-null") which don't match the display names that
 * players are familiar with. This module converts API names into
 * human-readable display names.
 *
 * STRATEGY:
 * 1. Check the explicit exception map first (covers all known special cases)
 * 2. For names with hyphens that indicate forms/variants (e.g. "deoxys-attack"),
 *    strip the suffix to show just the base species name
 * 3. For names where hyphens are PART of the real name (e.g. "ho-oh"),
 *    a "keep hyphens" set prevents stripping
 * 4. As a final fallback, capitalize the raw API name
 */

/**
 * Explicit mapping from API name → display name for Pokémon whose names
 * can't be derived by simple rules. This covers punctuation (Mr., Jr., '),
 * special characters (♀, ♂, :, é), and names where the hyphen is part
 * of the actual name.
 */
const NAME_EXCEPTIONS: Record<string, string> = {
  // "Mr." family
  'mr-mime': 'Mr. Mime',
  'mr-rime': 'Mr. Rime',
  'mime-jr': 'Mime Jr.',

  // Nidoran gender symbols
  'nidoran-f': 'Nidoran♀',
  'nidoran-m': 'Nidoran♂',

  // Apostrophe names
  farfetchd: "Farfetch'd",
  sirfetchd: "Sirfetch'd",

  // Colon
  'type-null': 'Type: Null',

  // Accented characters
  flabebe: 'Flabébé',

  // Names where hyphen is part of the actual name
  'ho-oh': 'Ho-Oh',
  'porygon-z': 'Porygon-Z',
  'jangmo-o': 'Jangmo-o',
  'hakamo-o': 'Hakamo-o',
  'kommo-o': 'Kommo-o',
  'tapu-koko': 'Tapu Koko',
  'tapu-lele': 'Tapu Lele',
  'tapu-bulu': 'Tapu Bulu',
  'tapu-fini': 'Tapu Fini',
  'chi-yu': 'Chi-Yu',
  'chien-pao': 'Chien-Pao',
  'ting-lu': 'Ting-Lu',
  'wo-chien': 'Wo-Chien',
  'omo-omo': 'Omo-Omo',

  // Gen 9 special names
  'great-tusk': 'Great Tusk',
  'scream-tail': 'Scream Tail',
  'brute-bonnet': 'Brute Bonnet',
  'flutter-mane': 'Flutter Mane',
  'slither-wing': 'Slither Wing',
  'sandy-shocks': 'Sandy Shocks',
  'iron-treads': 'Iron Treads',
  'iron-bundle': 'Iron Bundle',
  'iron-hands': 'Iron Hands',
  'iron-jugulis': 'Iron Jugulis',
  'iron-moth': 'Iron Moth',
  'iron-thorns': 'Iron Thorns',
  'iron-valiant': 'Iron Valiant',
  'iron-leaves': 'Iron Leaves',
  'iron-boulder': 'Iron Boulder',
  'iron-crown': 'Iron Crown',
  'roaring-moon': 'Roaring Moon',
  'walking-wake': 'Walking Wake',
  'gouging-fire': 'Gouging Fire',
  'raging-bolt': 'Raging Bolt',

  // Default forms that the API appends a suffix to
  'deoxys-normal': 'Deoxys',
  'wormadam-plant': 'Wormadam',
  'giratina-altered': 'Giratina',
  'shaymin-land': 'Shaymin',
  'basculin-red-striped': 'Basculin',
  'darmanitan-standard': 'Darmanitan',
  'tornadus-incarnate': 'Tornadus',
  'thundurus-incarnate': 'Thundurus',
  'landorus-incarnate': 'Landorus',
  'keldeo-ordinary': 'Keldeo',
  'meloetta-aria': 'Meloetta',
  'meowstic-male': 'Meowstic',
  'aegislash-shield': 'Aegislash',
  'pumpkaboo-average': 'Pumpkaboo',
  'gourgeist-average': 'Gourgeist',
  'zygarde-50': 'Zygarde',
  'oricorio-baile': 'Oricorio',
  'lycanroc-midday': 'Lycanroc',
  'wishiwashi-solo': 'Wishiwashi',
  'minior-red-meteor': 'Minior',
  'mimikyu-disguised': 'Mimikyu',
  'toxtricity-amped': 'Toxtricity',
  'eiscue-ice': 'Eiscue',
  'indeedee-male': 'Indeedee',
  'morpeko-full-belly': 'Morpeko',
  'urshifu-single-strike': 'Urshifu',
  'basculegion-male': 'Basculegion',
  'enamorus-incarnate': 'Enamorus',
  'oinkologne-male': 'Oinkologne',
  'palafin-zero': 'Palafin',
  'dudunsparce-two-segment': 'Dudunsparce',
  'squawkabilly-green-plumage': 'Squawkabilly',
  'tatsugiri-curly': 'Tatsugiri',
  'maushold-family-of-four': 'Maushold',
};

/**
 * Set of API names where the hyphen is part of the real name and
 * should NOT be stripped by the fallback logic. If it's already
 * in NAME_EXCEPTIONS the exception takes priority, but this set
 * acts as a safety net for the fallback.
 */
const KEEP_HYPHEN_NAMES = new Set([
  'ho-oh',
  'porygon-z',
  'jangmo-o',
  'hakamo-o',
  'kommo-o',
  'chi-yu',
  'chien-pao',
  'ting-lu',
  'wo-chien',
]);

/**
 * Capitalizes the first letter of each word in a string.
 * "tapu koko" → "Tapu Koko"
 */
const capitalizeWords = (str: string): string => str
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

/**
 * Converts a PokéAPI identifier into a human-readable display name.
 *
 * @param apiName - The raw name from the API (e.g. "mr-mime", "tapu-koko")
 * @returns The formatted display name (e.g. "Mr. Mime", "Tapu Koko")
 *
 * @example
 * formatPokemonName('pikachu')      // "Pikachu"
 * formatPokemonName('mr-mime')      // "Mr. Mime"
 * formatPokemonName('tapu-koko')    // "Tapu Koko"
 * formatPokemonName('type-null')    // "Type: Null"
 * formatPokemonName('ho-oh')        // "Ho-Oh"
 * formatPokemonName('nidoran-f')    // "Nidoran♀"
 * formatPokemonName('iron-hands')   // "Iron Hands"
 * formatPokemonName('deoxys-normal') // "Deoxys"
 */
const formatPokemonName = (apiName: string): string => {
  const lower = apiName.toLowerCase();

  // 1. Check explicit exceptions first
  if (NAME_EXCEPTIONS[lower]) {
    return NAME_EXCEPTIONS[lower];
  }

  // 2. If the name has no hyphens, just capitalize it
  if (!lower.includes('-')) {
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  // 3. If the hyphen is part of the real name, capitalize with hyphens
  if (KEEP_HYPHEN_NAMES.has(lower)) {
    return lower
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('-');
  }

  // 4. Fallback: replace hyphens with spaces and capitalize each word.
  //    This handles the majority of two-word names correctly
  //    (e.g. "great-tusk" → "Great Tusk" if not in the exceptions map).
  return capitalizeWords(lower.replace(/-/g, ' '));
};

export default formatPokemonName;
