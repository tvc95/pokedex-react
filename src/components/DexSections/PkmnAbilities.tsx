import React from 'react';
import { Ability } from '../../types/pokemon';

interface PkmnAbilitiesProps {
  subTitle: React.FC<{ children: React.ReactNode }>;
  list: React.FC<{ children: React.ReactNode }>;
  abilities: Ability[];
}

/**
 * Renders the list of Pokémon abilities, marking hidden ones.
 */
const PkmnAbilities: React.FC<PkmnAbilitiesProps> = ({
  subTitle: SubTitle,
  list: List,
  abilities,
}: PkmnAbilitiesProps) => (
  <div id="abilities">
    <SubTitle>Abilities</SubTitle>
    <List>
      {abilities.map((ability: Ability) => (
        <li key={ability.ability.name}>
          <div className={`is-hidden-${ability.is_hidden.toString()}`}>
            <span>{ability.ability.name}</span>
            {ability.is_hidden && <em>(Hidden)</em>}
          </div>
        </li>
      ))}
    </List>
  </div>
);

export default PkmnAbilities;
