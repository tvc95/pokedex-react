/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from './styles';

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
  const [pokeForms, setPokeForms] = useState<PokeForm[]>([]);
  const [loading, setLoading] = useState(true);

  function getPokeForms(pokeVarieties: PokemonVariety[]) {
    pokeVarieties.map(async (form) => {
      const response = await axios.get(`${form.forms[0].url}`);

      const data = {
        form_name: response.data.form_name,
        is_battle_only: response.data.is_battle_only,
        is_mega: response.data.is_mega,
        name: response.data.name,
        names: response.data.names,
      };
      setPokeForms([...pokeForms, data]);
    });
  }

  useEffect(() => {
    if (pokeForms.length !== pkmnVarieties.length) {
      getPokeForms(pkmnVarieties);
      setLoading(false);
    }
  }, [getPokeForms, pkmnVarieties, pokeForms]);

  if (loading) {
    return (
      <div>
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // return (
  //   <div>
  //     <p><strong>This Pokémon doesn't have any alternate forms.</strong></p>
  //   </div>
  // );

  return (
    <>
      {pkmnVarieties.map((pkmnVariety, idx) => (
        <Link to={`/data/pokemon/${pkmnName}`} key={pkmnVariety.name}>
          <Container>
            <img
              src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${pkmnVariety.name}.png`}
              alt={`${pkmnVariety.name}`}
            />
            <p>{idx}</p>

            <p><strong>{pokeForms[idx].form_name.toUpperCase()}</strong></p>

            {pkmnVariety.types.map((type) => (
              <p>{type.type.name}</p>
            ))}
          </Container>
        </Link>
      ))}
    </>
  );
};

export default PkmnAlternateForms;
