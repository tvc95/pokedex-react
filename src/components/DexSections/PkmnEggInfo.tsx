import React from 'react';
import { EggGroup } from '../../types/pokemon';

interface PkmnEggInfoProps {
  subTitle: React.FC<{ children: React.ReactNode }>;
  list: React.FC<{ children: React.ReactNode }>;
  eggGroups: EggGroup[];
  /** Hatch counter from the API (base cycles) */
  hatchCounter: number;
}

/**
 * Renders egg groups and estimated hatching time (in steps).
 */
const PkmnEggInfo: React.FC<PkmnEggInfoProps> = ({
  subTitle: SubTitle,
  list: List,
  eggGroups,
  hatchCounter,
}: PkmnEggInfoProps) => (
  <>
    <div id="egg-gps">
      <SubTitle>Egg Groups</SubTitle>
      <List>
        {eggGroups.map((eggGp: EggGroup) => (
          <li key={eggGp.name}>
            <div className="egg-gp">
              <span>{eggGp.name}</span>
            </div>
          </li>
        ))}
      </List>
    </div>

    <div id="hatching-time">
      <SubTitle>Hatching time</SubTitle>
      <p>
        {(hatchCounter + 1) * 250}
        {' '}
        steps (approximately)
      </p>
    </div>
  </>
);

export default PkmnEggInfo;
