/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  PkmnName,
  PkmnNumber,
  PkmnPrimaryInfo,
  PkmnSecondaryInfo,
  PkmnSpecies,
  PkmnTypesUL,
  PokemonHeaderContainer,
} from './styles';

/** Interface definitions */
interface Species {
  genus: string;
  language: {
    name: string;
    url: string;
  }
}

interface Types {
  slot: number;
  type: {
    name: string;
  }
}

interface PokemonData {
  name: string;
  url: string;
  types: Array<Types>;
  number: number;
}

/**
 * Pokemon Header Data component
 */
const PokemonHeader: React.FC<PokemonData> = ({
  name, url, types, number,
}: PokemonData) => {
  const generaState = {
    genus: '',
    language: {
      name: '',
      url: '',
    },
  };

  const [genera, setGenera] = useState(generaState);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.data;
        }
        throw Error(response.data.message);
      })
      .then((pkmnFullData) => {
        const species = pkmnFullData.genera.filter(
          (sp: Species) => sp.language.name === 'en',
        );
        setGenera(species[0]);
      });
  }, [url]);

  return (
    <>
      <PokemonHeaderContainer fluid>
        <PkmnPrimaryInfo>
          <PkmnName>{name}</PkmnName>
          <PkmnNumber>#{number}</PkmnNumber>
        </PkmnPrimaryInfo>
        <PkmnSecondaryInfo>
          <PkmnSpecies>{genera.genus}</PkmnSpecies>
          <PkmnTypesUL>
            {types.map((type) => (
              <li key={type.slot}>
                <a href="/">
                  <img
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${type.type.name}.png`}
                    alt={type.type.name}
                  />
                </a>
              </li>
            ))}
          </PkmnTypesUL>
        </PkmnSecondaryInfo>
      </PokemonHeaderContainer>
    </>
  );
};

export default PokemonHeader;
