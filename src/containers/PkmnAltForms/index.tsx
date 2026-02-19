/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  AltForms, Container, Linkk, RegionVariant, TypeSpan,
} from './styles';

const REGIONAL_FORMS = ['alola', 'galar', 'hisui', 'paldea'];

const EXCLUDED_PREFIXES = ['mega'];

const EXCLUDED_FORMS = ['gmax', 'origin'];

/**
 * Maps region names (as returned by the PokéAPI) to their adjective form
 * (as used in the remokon/gen-9-sprites repository filenames).
 *
 * API variety name:  arcanine-hisui   →  Sprite filename: arcanine-hisuian
 * API variety name:  vulpix-alola     →  Sprite filename: vulpix-alolan
 * API variety name:  meowth-galar     →  Sprite filename: meowth-galarian
 * API variety name:  wooper-paldea    →  Sprite filename: wooper-paldean
 */
const REGION_TO_ADJECTIVE: Record<string, string> = {
  alola: 'alolan',
  galar: 'galarian',
  hisui: 'hisuian',
  paldea: 'paldean',
};

/**
 * Reverse map: normalizes adjective forms back to region names.
 * Used when the API returns form_name as "hisuian" instead of "hisui".
 */
const ADJECTIVE_TO_REGION: Record<string, string> = {
  alolan: 'alola',
  galarian: 'galar',
  hisuian: 'hisui',
  paldean: 'paldea',
};

const normalizeFormName = (name: string): string => ADJECTIVE_TO_REGION[name] ?? name;

/**
 * Converts a variety name from API format to the sprite repository format
 * by replacing the region suffix with its adjective form.
 *
 * e.g. "arcanine-hisui"  → "arcanine-hisuian"
 *      "meowth-galar"    → "meowth-galarian"
 *      "vulpix-alola"    → "vulpix-alolan"
 *      "wooper-paldea"   → "wooper-paldean"
 *
 * If the suffix is not a known region, returns the name unchanged.
 */
const toSpriteVarietyName = (varietyName: string): string => {
  const lastDash = varietyName.lastIndexOf('-');
  if (lastDash === -1) return varietyName;

  const baseName = varietyName.substring(0, lastDash);
  const suffix = varietyName.substring(lastDash + 1);
  const adjective = REGION_TO_ADJECTIVE[suffix];

  return adjective ? `${baseName}-${adjective}` : varietyName;
};

interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface PokeForm {
  form_name: string;
  is_battle_only: boolean;
  is_mega: boolean;
  name: string;
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
}

interface PokemonVariety {
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

interface CompProps {
  pkmnVarieties: Array<PokemonVariety>;
}

const PkmnAlternateForms: React.FC<CompProps> = ({
  pkmnVarieties,
}: CompProps) => {
  /// React hooks
  const [pokeForms, setPokeForms] = useState<PokeForm[]>([]);
  const [load, setLoad] = useState(false);

  /**
   * [Callback function]
   * Fetches all pertinent basic data from each Pokémon form
   */
  const fetchFormsData = useCallback(
    async (pokeVarieties: Array<PokemonVariety>) => {
      const urls = pokeVarieties.map((form) => form.forms[0].url);

      const formsData = urls.map(async (url) => {
        const response = await axios.get(url);

        const formData: PokeForm = {
          form_name: response.data.form_name,
          is_battle_only: response.data.is_battle_only,
          is_mega: response.data.is_mega,
          name: response.data.name,
          names: response.data.names,
        };

        return formData;
      });

      const pkForms = await Promise.all<PokeForm>(formsData);
      setPokeForms(pkForms);
    },
    [],
  );

  useEffect(() => {
    const execute = async () => {
      if (!load) {
        await fetchFormsData(pkmnVarieties);
        setLoad(true);
      }
    };

    if (pkmnVarieties.length > 1) {
      execute();
    }
  }, [fetchFormsData, load, pkmnVarieties]);

  if (load) {
    return (
      <AltForms>
        {pkmnVarieties.map((pkmnVariety, idx) => {
          if (idx > 0) {
            const formName = normalizeFormName(pokeForms[idx].form_name);

            // If form name is an unconventional form, dismiss it
            if (
              (pokeForms[idx].name.slice(0, 12) !== 'pikachu-gmax'
                && pokeForms[idx].name.slice(0, 7) === 'pikachu')
              || pokeForms[idx].form_name === 'totem-alola'
              || pokeForms[idx].form_name === 'totem'
            ) {
              return null;
            }

            // Regional variant — use remokon sprite repo with adjective names
            const isRegional = REGIONAL_FORMS.includes(formName)
              && !EXCLUDED_PREFIXES.some((prefix) => formName.startsWith(prefix))
              && !EXCLUDED_FORMS.includes(formName);

            // If form name is not a mega/gmax/altered form, displays this form
            // as a regional variant and introduces links to these specific forms
            if (isRegional) {
              let spriteName = toSpriteVarietyName(pkmnVariety.name);

              if (spriteName === 'wooper-paldean') {
                spriteName = 'wooper-paldea';
              }

              return (
                <Linkk
                  to="#"
                  key={pkmnVariety.name}
                  onClick={() => window.location.assign(`/data/pokemon/${pkmnVariety.name}`)}
                >
                  <RegionVariant>
                    <img
                      src={`https://raw.githubusercontent.com/remokon/gen-9-sprites/refs/heads/main/gen-5-style/${spriteName}.png`}
                      alt={`${pkmnVariety.name}`}
                    />

                    {pokeForms[idx].form_name && (
                      <p>
                        <strong>
                          {pokeForms[idx].form_name.toUpperCase()}
                        </strong>
                      </p>
                    )}

                    <TypeSpan>
                      {pkmnVariety.types.map((type) => {
                        if (pkmnVariety.types.length === 1) {
                          return <p key={type.slot}>{type.type.name}</p>;
                        }

                        if (type.slot < 2) {
                          return (
                            <p key={type.slot}>
                              {type.type.name}
                              {}
                              /
                              {' '}
                            </p>
                          );
                        }
                        return <p key={type.slot}>{type.type.name}</p>;
                      })}
                    </TypeSpan>
                  </RegionVariant>
                </Linkk>
              );
            }

            // Renders mega/gmax/altered forms as a normal pokemon
            return (
              <Container key={pkmnVariety.name}>
                <img
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pkmnVariety.name}.png`}
                  alt={`${pkmnVariety.name}`}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null; // previne loop infinito se o fallback também falhar
                    img.src = 'https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown.png';
                  }}
                />

                {pokeForms[idx].form_name && (
                  <p>
                    <strong>{pokeForms[idx].form_name.toUpperCase()}</strong>
                  </p>
                )}

                <TypeSpan>
                  {pkmnVariety.types.map((type) => {
                    if (pkmnVariety.types.length === 1) {
                      return <p key={type.slot}>{type.type.name}</p>;
                    }

                    if (type.slot < 2) {
                      return (
                        <p key={type.slot}>
                          {type.type.name}
                          {}
                          /
                          {' '}
                        </p>
                      );
                    }
                    return <p key={type.slot}>{type.type.name}</p>;
                  })}
                </TypeSpan>
              </Container>
            );
          }
          return null;
        })}
      </AltForms>
    );
  }

  return (
    <>
      <p>
        <strong>
          This Pokémon doesn't have alternate forms or regional variants in this
          stage.
        </strong>
      </p>
    </>
  );
};

export default PkmnAlternateForms;
