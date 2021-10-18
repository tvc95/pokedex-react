import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/index';
import DexData from '../pages/DexData/index';
import PokemonListPg from '../pages/PokemonList';
import PokemonSearchPg from '../pages/PokemonSearch';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/dexlist" component={PokemonListPg} />
    <Route path="/data/pokemon/:pkmnName" component={DexData} />
    <Route path="/search/:searchWord" component={PokemonSearchPg} />
  </Switch>
);

export default Routes;
