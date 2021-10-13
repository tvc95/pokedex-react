/* eslint-disable camelcase */
import React, { useState } from 'react';
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
}

const PkmnTypeCharts: React.FC<CompProps> = ({ pkmnVarieties }: CompProps) => {
  /// State hooks
  const [activeItem, setActiveItem] = useState(0);

  const toggleState = (tab: number) => {
    if (activeItem !== tab) {
      setActiveItem(tab);
    }
  };

  return (
    <MDBContainer fluid>
      <StyledTabs className="nav-tabs mt-3 nav-fill">
        {pkmnVarieties.map((variety, idx) => {
          const formatVarietyName = variety.name.charAt(0).toUpperCase() + variety.name.slice(1).replace('-', ' ');

          return (
            <>
              <MDBNavItem key={formatVarietyName}>
                <MDBNavLink
                  link
                  to="#"
                  active={activeItem.toString() === `${idx}`}
                  onClick={() => toggleState(idx)}
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
        {pkmnVarieties.map((variety, idx) => (
          <>
            <PkmnTabPane key={`${variety.name}`} tabId={`${idx}`} role="tabpanel">
              <PkmnName>{variety.name.replace('-', ' ')}</PkmnName>

              <div className="types">
                {variety.types.map((type, i) => {
                  if (i > 0) {
                    return (
                      <h4>
                        {`/${type.type.name}`}
                      </h4>
                    );
                  }
                  return (
                    <h4>{type.type.name}</h4>
                  );
                })}
              </div>
              <hr />

              <PkmnTypeGrid typeList={variety.types} pkmnName={variety.name} />
            </PkmnTabPane>
          </>
        ))}
      </MDBTabContent>
    </MDBContainer>
  );
};

export default PkmnTypeCharts;
