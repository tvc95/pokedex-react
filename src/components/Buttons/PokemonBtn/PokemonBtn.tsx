import React from 'react';
import { PokemonBtnLink, PokemonIcon } from './styles';

interface PokemonBtnProps {
  pkmnIconPath: string;
  pkmnName: string;
  trueName: string;
  pkmnNumber: number;
}

const PokemonBtn: React.FC<PokemonBtnProps> = (
  {
    pkmnIconPath, pkmnName, pkmnNumber, trueName,
  }: PokemonBtnProps,
) => (
  <PokemonBtnLink to={`/data/pokemon/${pkmnName}`}>
    <PokemonIcon src={`${pkmnIconPath}`} alt={`${pkmnNumber}-${trueName}`} />
    <br />
    {trueName.charAt(0).toUpperCase() + trueName.slice(1)}
  </PokemonBtnLink>
);

export default PokemonBtn;
