import React from 'react';
import { PokemonBtnLink, PokemonIcon } from './styles';

interface PokemonBtnProps {
  pkmnIconPath: string;
  pkmnName: string;
  pkmnNumber: number;
}

const PokemonBtn: React.FC<PokemonBtnProps> = (
  { pkmnIconPath, pkmnName, pkmnNumber }: PokemonBtnProps,
) => (
  <PokemonBtnLink to={`/data/pokemon/${pkmnName}`}>
    <PokemonIcon src={`${pkmnIconPath}`} alt={`${pkmnNumber}_${pkmnName}`} />
    <br />
    {pkmnName}
  </PokemonBtnLink>
);

export default PokemonBtn;
