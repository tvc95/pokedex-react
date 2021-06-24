/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, TypeSpan } from './styles';

interface Ability {
  ability: {
    name: string;
  }
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
    }
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
  pkmnName: string;
}

const PkmnAlternateForms: React.FC<CompProps> = ({ pkmnVarieties, pkmnName }: CompProps) => {
  /// React hooks
  const [pokeForms, setPokeForms] = useState<PokeForm[]>([]);
  const [load, setLoad] = useState(false);

  /**
   * [Callback function]
   * Fetches all pertinent basic data from each Pokémon form
   */
  const fetchFormsData = useCallback(async (pokeVarieties: Array<PokemonVariety>) => {
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
  }, []);

  useEffect(() => {
    const execute = async () => {
      // console.log('varieties: ', pkmnVarieties);
      // console.log('name: ', pkmnName);
      if (!load) {
        await fetchFormsData(pkmnVarieties);
        setLoad(true);
      }
    };

    execute();
  }, [fetchFormsData, load, pkmnVarieties]);

  if (load) {
    return (
      <>
        {pkmnVarieties.map((pkmnVariety, idx) => {
          if (idx > 0) {
            return (
              <Link to={`/data/pokemon/${pkmnName}`} key={pkmnVariety.name}>
                <Container>
                  <img
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pkmnVariety.name}.png`}
                    alt={`${pkmnVariety.name}`}
                  />

                  {pokeForms[idx].form_name && (
                    <p><strong>{pokeForms[idx].form_name.toUpperCase()}</strong></p>
                  )}

                  <TypeSpan>
                    {pkmnVariety.types.map((type) => {
                      if (type.slot < 2) {
                        return (
                          <p>
                            {type.type.name}
                            {}
                            /
                            {' '}
                          </p>
                        );
                      }
                      return (
                        <p>{type.type.name}</p>
                      );
                    })}
                  </TypeSpan>
                </Container>
              </Link>
            );
          }
          return null;
        })}
      </>
    );
  }

  return null;
};

export default PkmnAlternateForms;
