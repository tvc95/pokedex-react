import React from 'react';
import { FlavorText } from '../../types/pokemon';

interface PkmnDescriptionProps {
  /** SubTitle styled component passed from parent to keep styling consistent */
  subTitle: React.FC<{ children: React.ReactNode }>;
  flavorTextEntries: FlavorText[];
  genName: string;
}

/**
 * Renders the Pokémon's Pokédex description text and generation info.
 * Filters English entries from specific game versions and shows up to 2.
 */
const PkmnDescription: React.FC<PkmnDescriptionProps> = ({
  subTitle: SubTitle,
  flavorTextEntries,
  genName,
}: PkmnDescriptionProps) => (
  <div id="description">
    <SubTitle>Description</SubTitle>
    <p id="flavor-txt">
      {flavorTextEntries
        .filter(
          (entry) => entry.language.name === 'en'
            && (entry.version.name === 'x'
              || entry.version.name === 'ultra-sun'
              || entry.version.name === 'sword'
              || entry.version.name === 'scarlet'),
        )
        .slice(0, 2)
        .map((entry) => (
          <span key={entry.version.name}>{`${entry.flavor_text} `}</span>
        ))}
    </p>
    <p>
      <small>
        <em>
          First introduced in
          {genName}
        </em>
      </small>
    </p>
  </div>
);

export default PkmnDescription;
