/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TypeGridProps {
  typeList: Array<{
    slot: number;
    type: {
        name: string;
        url: string;
    };
  }>;
  pkmnName: string;
}

const PkmnTypeGrid: React.FC<TypeGridProps> = ({ typeList, pkmnName }: TypeGridProps) => {
  const types = [
    'normal',
    'fire',
    'fighting',
    'water',
    'flying',
    'grass',
    'poison',
    'electric',
    'ground',
    'psychic',
    'rock',
    'ice',
    'bug',
    'dragon',
    'ghost',
    'dark',
    'steel',
    'fairy',
  ];
  const [typeInfo, setTypeInfo] = useState([]);

  /**
   * This function will receive an array of types of a specific Pokémon,
   * mapping through the array, in order to get all type relations from
   * each type.
   *
   * Having these type relations sorted out, these relations need to be
   * re-calculated in order to identify whether the Pokémon has weakness /
   * resistance / immunity to a specific type and how strong is this
   * relation
   */
  const calculateTypeRelations = () => {
    const typesData = typeList.map(async (type, idx) => {
      console.log(`Checking type relations from ${type.type.name}`);

      // Make a copy of 'types'
      const normalDamage = types;

      const fullTypeRelations = [];
      const typeRes = await axios.get(`${type.type.url}`);

      // Get damage relations
      const doubleDamage = typeRes.data.damage_relations.double_damage_from;
      const halfDamage = typeRes.data.damage_relations.half_damage_from;
      const immune = typeRes.data.damage_relations.no_damage_from;

      // Maps through these arrays in order to remove duplicates
      console.log(doubleDamage);
    });
  };

  useEffect(() => {
    calculateTypeRelations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
};

export default PkmnTypeGrid;
