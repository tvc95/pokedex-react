import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import { Text, Tr } from './styles';

interface MoveListData {
  moveName: string;
  url: string;
  versionDetails: {
    levelLearned: number;
    learningMethod: string;
    versionGroup: string;
  }
}

interface TableProps {
  moveList: Array<MoveListData>;
  tableType: number;
}

interface MoveData {
  accuracy: number;
  category: string; // 'physical' or 'special'
  name: string; // names[i] => name (language === 'en')
  power: number;
  pp: number;
  type: string;
  levelLearned: number;
}

interface Data {
  language: {
    name: string;
    url: string;
  }
  name: string;
}

const MovesetTable: React.FC<TableProps> = ({ moveList, tableType }: TableProps) => {
  const [moveData, setMoveData] = useState<MoveData[]>([]);

  const fetchMoveData = async () => {
    const movesPromises = moveList.map(async (move) => {
      const response = await axios.get(move.url);

      // const moveName = response.data.moves.filter((data: Data) => data.language.name === 'en');

      return {
        accuracy: response.data.accuracy,
        category: response.data.damage_class.name,
        name: move.moveName,
        power: response.data.power,
        pp: response.data.pp,
        type: response.data.type.name,
        levelLearned: move.versionDetails.levelLearned,
      };
    });

    const fetchedData = await Promise.all(movesPromises);

    setMoveData(fetchedData.sort((a, b) => a.levelLearned - b.levelLearned));
  };

  useEffect(() => {
    fetchMoveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {moveData.length > 0 ? (
        <MDBTable small hover borderless>
          <MDBTableHead color="red lighten-2" textWhite>
            <Tr>
              {tableType === 0 && <th>Lv.</th>}
              <th>Move</th>
              <th>Type</th>
              <th>Cat.</th>
              <th>Pwr.</th>
              <th>Acc.</th>
              <th>PP</th>
            </Tr>
          </MDBTableHead>
          <MDBTableBody color="red lighten-3">
            {moveData.map((move) => (
              <Tr key={move.name}>
                {tableType === 0 && <td>{move.levelLearned}</td>}
                <td>{move.name}</td>
                <td>{move.type}</td>
                <td>{move.category}</td>
                <td>{move.power}</td>
                <td>{move.accuracy}</td>
                <td>{move.pp}</td>
              </Tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      ) : (
        <>
          <Text>This Pokémon learns no moves by this category</Text>
        </>
      )}

    </>
  );
};

export default MovesetTable;
