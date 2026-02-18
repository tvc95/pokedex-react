/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect, useState, useCallback, KeyboardEvent,
} from 'react';
import {
  MDBContainer,
  MDBNavItem,
  MDBNavLink,
  MDBTabContent,
  MDBTabPane,
} from 'mdbreact';
import { StyledTabs } from './styles';
import MovesetTable from '../../components/Tables/MovesetTable/MovesetTable';
import { PokemonMove, MoveListData } from '../../types/pokemon';

interface CompProps {
  pkmnMoves: Array<PokemonMove>;
}

/** Tab configuration — single source of truth for labels and IDs */
const TABS = [
  { id: 0, label: 'By leveling up', panelId: 'moveset-panel-0' },
  { id: 1, label: 'By TM/TR', panelId: 'moveset-panel-1' },
  { id: 2, label: 'By Tutoring', panelId: 'moveset-panel-2' },
  { id: 3, label: 'By Breeding', panelId: 'moveset-panel-3' },
] as const;

const PkmnMovesets: React.FC<CompProps> = ({ pkmnMoves }: CompProps) => {
  const [activeItem, setActiveItem] = useState(0);
  const [levelUpMoveList, setLevelUpMoveList] = useState<MoveListData[]>([]);
  const [machineMoveList, setMachineMoveList] = useState<MoveListData[]>([]);
  const [breedingMoveList, setBreedingMoveList] = useState<MoveListData[]>([]);
  const [tutoringMoveList, setTutoringMoveList] = useState<MoveListData[]>([]);
  const [load, setLoad] = useState(false);

  const toggleState = (tab: number) => {
    if (activeItem !== tab) {
      setActiveItem(tab);
    }
  };

  /**
   * Keyboard handler following the WAI-ARIA Tabs pattern:
   * - ArrowRight / ArrowLeft: move between tabs
   * - Home: jump to first tab
   * - End: jump to last tab
   */
  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      let newIndex: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
          newIndex = (activeItem + 1) % TABS.length;
          break;
        case 'ArrowLeft':
          newIndex = (activeItem - 1 + TABS.length) % TABS.length;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = TABS.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      setActiveItem(newIndex);

      // Move focus to the newly active tab
      const tabEl = document.getElementById(`moveset-tab-${newIndex}`);
      if (tabEl) tabEl.focus();
    },
    [activeItem],
  );

  const setMoveLists = async () => {
    const formattedMoveData = pkmnMoves.map((move) => {
      const lastDetail = move.version_group_details[move.version_group_details.length - 1];

      return {
        moveName: move.move.name,
        url: move.move.url,
        versionDetails: {
          levelLearned: lastDetail.level_learned_at,
          learningMethod: lastDetail.move_learn_method.name,
          versionGroup: lastDetail.version_group.name,
        },
      };
    });

    setLevelUpMoveList(
      formattedMoveData.filter(
        (m) => m.versionDetails.learningMethod === 'level-up',
      ),
    );
    setMachineMoveList(
      formattedMoveData.filter(
        (m) => m.versionDetails.learningMethod === 'machine',
      ),
    );
    setTutoringMoveList(
      formattedMoveData.filter(
        (m) => m.versionDetails.learningMethod === 'tutor',
      ),
    );
    setBreedingMoveList(
      formattedMoveData.filter(
        (m) => m.versionDetails.learningMethod === 'egg',
      ),
    );
    setLoad(true);
  };

  useEffect(() => {
    setMoveLists();
  }, []);

  if (!load) return null;

  const moveLists = [
    levelUpMoveList,
    machineMoveList,
    tutoringMoveList,
    breedingMoveList,
  ];

  return (
    <MDBContainer fluid>
      {/* Tab list with proper ARIA roles and keyboard navigation */}
      <StyledTabs
        className="nav-tabs mt-3 nav-fill"
        role="tablist"
        aria-label="Moveset categories"
        onKeyDown={handleTabKeyDown}
      >
        {TABS.map((tab) => (
          <MDBNavItem key={tab.id} role="presentation">
            <MDBNavLink
              id={`moveset-tab-${tab.id}`}
              link
              to="#"
              active={activeItem === tab.id}
              onClick={(e: Event) => {
                e.preventDefault();
                toggleState(tab.id);
              }}
              role="tab"
              aria-selected={activeItem === tab.id}
              aria-controls={tab.panelId}
              tabIndex={activeItem === tab.id ? 0 : -1}
            >
              {tab.label}
            </MDBNavLink>
          </MDBNavItem>
        ))}
      </StyledTabs>

      {/* Tab panels */}
      <MDBTabContent activeItem={activeItem.toString()}>
        {TABS.map((tab, idx) => (
          <MDBTabPane
            key={tab.id}
            tabId={tab.id.toString()}
            role="tabpanel"
            id={tab.panelId}
            aria-labelledby={`moveset-tab-${tab.id}`}
          >
            <MovesetTable moveList={moveLists[idx]} tableType={tab.id} />
          </MDBTabPane>
        ))}
      </MDBTabContent>
    </MDBContainer>
  );
};

export default PkmnMovesets;
