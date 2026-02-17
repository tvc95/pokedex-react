/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBPopper } from 'mdbreact';
import { TypeContainer, TypeGrid } from './styles';

interface TypeGridProps {
  typeList: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}

interface TypeData {
  typeName: string;
  normal: string[];
  weakness: string[];
  resistance: string[];
  immunity: string[];
}

interface DualTypeRelationsData {
  immunity: string[];
  normal: string[];
  resist1x: string[];
  weak1x: string[];
  resist2x: string[];
  weak2x: string[];
}

const PkmnTypeGrid: React.FC<TypeGridProps> = ({ typeList }: TypeGridProps) => {
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

  const [typeInfo, setTypeInfo] = useState<DualTypeRelationsData>();
  const [typeError, setTypeError] = useState(false);

  /**
   * This function defines all type chart relations according to the
   * Pokémon typing (mono or dual-type). If it's a dual-type Pokémon,
   * it will compare each category of the primary type with its secondary
   * type, in order to check immunities, weakness and resistance from the
   * dual-type configuration
   * @param typesData an array of types of a specific Pokémon
   * @returns DualTypeRelationsData - an object displaying all Pokémon type
   * relations (mono or dual type)
   */
  const calculateTypeRelations = (typesData: TypeData[]) => {
    if (typesData.length > 1) {
      const dualTypeRelations: DualTypeRelationsData = {
        immunity: [],
        normal: [],
        resist1x: [],
        weak1x: [],
        resist2x: [],
        weak2x: [],
      };

      const primaryType = typesData[0];
      const secondaryType = typesData[1];

      // Comparing immunity types
      if (primaryType.immunity.length > 0) {
        primaryType.immunity.forEach((typeName: string) => dualTypeRelations.immunity.push(typeName));
      }

      // Comparing normal damage types
      if (primaryType.normal.length > 0) {
        primaryType.normal.forEach((typeName: string) => {
          // 1 x 0 = 0
          if (secondaryType.immunity.includes(typeName)) {
            return dualTypeRelations.immunity.push(typeName);
          }

          // 1 x 0.5 = 0.5
          if (secondaryType.resistance.includes(typeName)) {
            return dualTypeRelations.resist1x.push(typeName);
          }

          // 1 x 1 = 1
          if (secondaryType.normal.includes(typeName)) {
            return dualTypeRelations.normal.push(typeName);
          }

          // 1 x 2 = 2
          if (secondaryType.weakness.includes(typeName)) {
            return dualTypeRelations.weak1x.push(typeName);
          }
          return null;
        });
      }

      // Comparing resistant types
      if (primaryType.resistance.length > 0) {
        primaryType.resistance.forEach((typeName: string) => {
          // 0.5 x 0 = 0
          if (secondaryType.immunity.includes(typeName)) {
            return dualTypeRelations.immunity.push(typeName);
          }

          // 0.5 x 0.5 = 0.25
          if (secondaryType.resistance.includes(typeName)) {
            return dualTypeRelations.resist2x.push(typeName);
          }

          // 0.5 x 1 = 0.5
          if (secondaryType.normal.includes(typeName)) {
            return dualTypeRelations.resist1x.push(typeName);
          }

          // 0.5 x 2 = 1.0
          if (secondaryType.weakness.includes(typeName)) {
            return dualTypeRelations.normal.push(typeName);
          }

          return null;
        });
      }

      // Comparing weaknesses
      if (primaryType.weakness.length > 0) {
        primaryType.weakness.forEach((typeName: string) => {
          // 2 x 0 = 0
          if (secondaryType.immunity.includes(typeName)) {
            return dualTypeRelations.immunity.push(typeName);
          }

          // 2 x 0.5 = 1
          if (secondaryType.resistance.includes(typeName)) {
            return dualTypeRelations.normal.push(typeName);
          }

          // 2 x 1 = 2
          if (secondaryType.normal.includes(typeName)) {
            return dualTypeRelations.weak1x.push(typeName);
          }

          // 2 x 2 = 4
          if (secondaryType.weakness.includes(typeName)) {
            return dualTypeRelations.weak2x.push(typeName);
          }

          return null;
        });
      }

      return dualTypeRelations;
    }

    return {
      immunity: typesData[0].immunity,
      normal: typesData[0].normal,
      resist1x: typesData[0].resistance,
      weak1x: typesData[0].weakness,
      resist2x: [],
      weak2x: [],
    };
  };

  /**
   * This function fetches data from each type present in the list, in
   * order to get all damage relations separately (normal damage, weakness,
   * resistance and immunity). With all damage relations fetched, calculate
   * the final type chart relations.
   */
  const getTypeRelations = async () => {
    try {
      const typesPromises = typeList.map(async (type) => {
        const normalDamage = types;

        // GET request to fetch type data
        const typeRes = await axios.get(`${type.type.url}`);

        // Get damage relations (full object)
        const doubleDamage = typeRes.data.damage_relations.double_damage_from;
        const halfDamage = typeRes.data.damage_relations.half_damage_from;
        const immune = typeRes.data.damage_relations.no_damage_from;

        // Maps through each array of damage relations in order to get the string values
        const mapDoubles = doubleDamage.map(
          (typeDmg: { name: string; url: string }) => typeDmg.name,
        );
        const mapHalf = halfDamage.map(
          (typeDmg: { name: string; url: string }) => typeDmg.name,
        );
        const mapImmune = immune.map(
          (typeDmg: { name: string; url: string }) => typeDmg.name,
        );

        // Filters full types array in order to remove weaknesses/resistances/immunity, leaving only normal damage.
        const filterNormalDmg = normalDamage.filter(
          (pokeType) => !mapDoubles.includes(pokeType)
            && !mapHalf.includes(pokeType)
            && !mapImmune.includes(pokeType),
        );

        return {
          typeName: type.type.name,
          normal: filterNormalDmg,
          weakness: mapDoubles,
          resistance: mapHalf,
          immunity: mapImmune,
        };
      });

      const typesData = await Promise.all(typesPromises);

      // Calculate type relations and get the final result
      const typeRelations = calculateTypeRelations(typesData);
      setTypeInfo(typeRelations);
    } catch (err) {
      setTypeError(true);
    }
  };

  useEffect(() => {
    getTypeRelations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeError) {
    return <p>Could not load type chart data.</p>;
  }

  return (
    <TypeGrid>
      {typeInfo?.immunity && typeInfo.immunity.length > 0 && (
        <>
          {typeInfo?.immunity.map((name) => (
            <TypeContainer key={name}>
              <MDBPopper placement="top" material domElement>
                <img
                  className="null"
                  src={
                    require(`../../assets/svg/type-icons/${name}.svg`).default
                  }
                  alt={name}
                />
                <span>
                  {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  {' '}
                  || Immune
                  (x0.0)
                </span>
              </MDBPopper>
            </TypeContainer>
          ))}
        </>
      )}
      {typeInfo?.resist1x && typeInfo.resist1x.length > 0 && (
        <>
          {typeInfo?.resist2x.map((name) => (
            <TypeContainer key={name}>
              <MDBPopper placement="top" material domElement>
                <img
                  className="rs-2"
                  src={
                    require(`../../assets/svg/type-icons/${name}.svg`).default
                  }
                  alt={name}
                />
                <span>
                  {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  {' '}
                  ||
                  Resistant (x0.25)
                </span>
              </MDBPopper>
            </TypeContainer>
          ))}
          {typeInfo?.resist1x.map((name) => (
            <TypeContainer key={name}>
              <MDBPopper placement="top" material domElement>
                <img
                  className="rs-1"
                  src={
                    require(`../../assets/svg/type-icons/${name}.svg`).default
                  }
                  alt={name}
                />
                <span>
                  {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  {' '}
                  ||
                  Resistant (x0.5)
                </span>
              </MDBPopper>
            </TypeContainer>
          ))}
        </>
      )}
      {typeInfo?.normal && typeInfo.normal.length > 0 && (
        <>
          {typeInfo?.normal.map((name) => (
            <TypeContainer key={name}>
              <MDBPopper placement="top" material domElement>
                <img
                  src={
                    require(`../../assets/svg/type-icons/${name}.svg`).default
                  }
                  alt={name}
                />
                <span>
                  {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  {' '}
                  || Normal
                  damage
                </span>
              </MDBPopper>
            </TypeContainer>
          ))}
        </>
      )}
      {typeInfo?.weak1x && typeInfo.weak1x.length > 0 && (
        <>
          {typeInfo?.weak1x.map((name) => (
            <TypeContainer key={name}>
              <MDBPopper placement="top" material domElement>
                <img
                  className="wk-1"
                  src={
                    require(`../../assets/svg/type-icons/${name}.svg`).default
                  }
                  alt={name}
                />
                <span>
                  {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  {' '}
                  || Weak
                  (x2.0)
                </span>
              </MDBPopper>
            </TypeContainer>
          ))}
          {typeInfo?.weak2x.map((name) => (
            <TypeContainer key={name}>
              <MDBPopper placement="top" material domElement>
                <img
                  className="wk-2"
                  src={
                    require(`../../assets/svg/type-icons/${name}.svg`).default
                  }
                  alt={name}
                />
                <span>
                  {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  {' '}
                  || Weak
                  (x4.0)
                </span>
              </MDBPopper>
            </TypeContainer>
          ))}
        </>
      )}
    </TypeGrid>
  );
};

export default PkmnTypeGrid;
