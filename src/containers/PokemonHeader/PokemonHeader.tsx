import React from 'react';
import {
  PkmnName,
  PkmnNumber,
  PkmnPrimaryInfo,
  PkmnSecondaryInfo,
  PkmnSpecies,
  PkmnTypesUL,
  PokemonHeaderContainer,
} from './styles';

const PokemonHeader: React.FC = () => (
  <>
    <PokemonHeaderContainer fluid>
      <PkmnPrimaryInfo>
        <PkmnName>Blaziken</PkmnName>
        <PkmnNumber>#000</PkmnNumber>
      </PkmnPrimaryInfo>
      <PkmnSecondaryInfo>
        <PkmnSpecies>Blaze Pokémon</PkmnSpecies>
        <PkmnTypesUL>
          <li>
            <a href="/">
              <img src="https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/fire.png" alt="fire" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/fire.png" alt="fire" />
            </a>
          </li>
        </PkmnTypesUL>
      </PkmnSecondaryInfo>
    </PokemonHeaderContainer>
  </>
);

export default PokemonHeader;
