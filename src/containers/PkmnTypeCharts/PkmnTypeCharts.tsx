/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  MDBContainer, MDBNavItem, MDBNavLink, MDBTabContent,
} from 'mdbreact';
import { PkmnName, PkmnTabPane, StyledTabs } from './styles';
import PkmnTypeGrid from '../../components/PkmnTypeGrid/PkmnTypeGrid';

interface Ability {
  ability: {
    name: string;
  }
  is_hidden: boolean;
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

const PkmnTypeCharts: React.FC<CompProps> = ({ pkmnVarieties, pkmnName }: CompProps) => {
  /// State hooks
  const [activeItem, setActiveItem] = useState(0);

  /// Creates a copy of the prop pkmnVarieties to be edited locally
  const [varieties] = useState<PokemonVariety[]>(JSON.parse(JSON.stringify(pkmnVarieties)));

  /**
   * Switches tabs in order to check a specific form type chart
   * @param tab
   */
  const toggleState = (tab: number) => {
    if (activeItem !== tab) {
      setActiveItem(tab);
    }
  };

  /**
   * Invert tabs if Pokémon is a regional form
   */
  const sortVarieties = () => {
    if (pkmnName.includes('alola') || pkmnName.includes('galar')) {
      const switchPoke = varieties.splice(1, 1);
      varieties.unshift(switchPoke[0]);
    }
  };

  useEffect(() => {
    sortVarieties();
  }, [varieties]);

  return (
    <MDBContainer fluid>
      <StyledTabs className="nav-tabs mt-3 nav-fill">
        {varieties.map((variety, idx) => {
          const formatVarietyName = variety.name.charAt(0).toUpperCase() + variety.name.slice(1).replace('-', ' ');

          if (variety.name.includes('totem')) return null;

          return (
            <>
              <MDBNavItem key={formatVarietyName}>
                <MDBNavLink
                  link
                  to="#"
                  active={activeItem.toString() === `${idx}`}
                  onClick={(e: Event) => {
                    e.preventDefault();
                    toggleState(idx);
                  }}
                  role="tab"
                >
                  {formatVarietyName}
                </MDBNavLink>
              </MDBNavItem>
            </>
          );
        })}
      </StyledTabs>

      <MDBTabContent activeItem={activeItem.toString()}>
        {varieties.map((variety, idx) => (
          <>
            {!variety.name.includes('totem') ? (
              <PkmnTabPane key={`${variety.name}`} tabId={`${idx}`} role="tabpanel">
                <PkmnName>{variety.name.replace('-', ' ')}</PkmnName>

                <div className="types">
                  {variety.types.map((type, i) => {
                    if (i > 0) {
                      return (
                        <h4 key={type.slot}>
                          {`/${type.type.name}`}
                        </h4>
                      );
                    }
                    return (
                      <h4 key={type.slot}>{type.type.name}</h4>
                    );
                  })}
                </div>
                <hr />

                <PkmnTypeGrid typeList={variety.types} />
              </PkmnTabPane>
            ) : (
              null
            )}
          </>
        ))}
      </MDBTabContent>
    </MDBContainer>
  );
};

export default PkmnTypeCharts;
