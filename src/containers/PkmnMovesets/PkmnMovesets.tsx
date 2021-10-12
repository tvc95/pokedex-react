/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  MDBContainer, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane,
} from 'mdbreact';
import { StyledTabs } from './styles';
import MovesetTable from '../../components/Tables/MovesetTable/MovesetTable';

interface PokemonMove {
  move: {
    url: string;
    name: string;
  }
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
    }
    version_group: {
      name: string;
    }
  }>
}

interface CompProps {
  pkmnMoves: Array<PokemonMove>;
}

interface MoveListData {
  moveName: string;
  url: string;
  versionDetails: {
    levelLearned: number;
    learningMethod: string;
    versionGroup: string;
  }
}

const PkmnMovesets: React.FC<CompProps> = ({ pkmnMoves }: CompProps) => {
  const [activeItem, setActiveItem] = useState(0);
  const [levelUpMoveList, setLevelUpMoveList] = useState<MoveListData[]>([]);
  const [machineMoveList, setMachineMoveList] = useState<MoveListData[]>([]);
  const [breedingMoveList, setBreedingMoveList] = useState<MoveListData[]>([]);
  const [tutoringMoveList, setTutoringMoveList] = useState<MoveListData[]>([]);

  /**
   * Handles tab change
   */
  const toggleState = (tab: number) => {
    if (activeItem !== tab) {
      setActiveItem(tab);
    }
  };

  /**
   * Formats full move data and splits them into categories of move
   * lists (level up, machine, breeding and tutoring)
   */
  const setMoveLists = () => {
    const formattedMoveData = pkmnMoves.map((move) => {
      const levelLearned = move.version_group_details[move.version_group_details.length - 1].level_learned_at;
      const learningMethod = move.version_group_details[move.version_group_details.length - 1].move_learn_method.name;
      const versionGroup = move.version_group_details[move.version_group_details.length - 1].version_group.name;

      return {
        moveName: move.move.name,
        url: move.move.url,
        versionDetails: {
          levelLearned,
          learningMethod,
          versionGroup,
        },
      };
    });

    // Filters formatted data to split moveset into categories
    setLevelUpMoveList(formattedMoveData.filter((move) => move.versionDetails.learningMethod === 'level-up'));

    setMachineMoveList(formattedMoveData.filter((move) => move.versionDetails.learningMethod === 'machine'));

    setTutoringMoveList(formattedMoveData.filter((move) => move.versionDetails.learningMethod === 'tutor'));

    setBreedingMoveList(formattedMoveData.filter((move) => move.versionDetails.learningMethod === 'egg'));
  };

  useEffect(() => {
    setMoveLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MDBContainer fluid>
      <StyledTabs className="nav-tabs mt-3">
        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeItem.toString() === '0'}
            onClick={() => toggleState(0)}
            role="tab"
          >
            By leveling up
          </MDBNavLink>
        </MDBNavItem>

        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeItem.toString() === '1'}
            onClick={() => toggleState(1)}
            role="tab"
          >
            By TM/TR
          </MDBNavLink>
        </MDBNavItem>

        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeItem.toString() === '2'}
            onClick={() => toggleState(2)}
            role="tab"
          >
            By Tutoring
          </MDBNavLink>
        </MDBNavItem>

        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeItem.toString() === '3'}
            onClick={() => toggleState(3)}
            role="tab"
          >
            By Breeding
          </MDBNavLink>
        </MDBNavItem>
      </StyledTabs>

      <MDBTabContent activeItem={activeItem.toString()}>
        <MDBTabPane tabId="0" role="tabpanel">
          <MovesetTable
            moveList={levelUpMoveList}
            tableType={activeItem}
          />
        </MDBTabPane>
        <MDBTabPane tabId="1" role="tabpanel">
          <MovesetTable
            moveList={machineMoveList}
            tableType={activeItem}
          />
        </MDBTabPane>
        <MDBTabPane tabId="2" role="tabpanel">
          <MovesetTable
            moveList={tutoringMoveList}
            tableType={activeItem}
          />
        </MDBTabPane>
        <MDBTabPane tabId="3" role="tabpanel">
          <MovesetTable
            moveList={breedingMoveList}
            tableType={activeItem}
          />
        </MDBTabPane>
      </MDBTabContent>
    </MDBContainer>
  );
};

export default PkmnMovesets;