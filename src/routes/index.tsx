import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/index';
import DexData from '../pages/DexData/index';
import PokemonListPg from '../pages/PokemonList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/dexlist" component={PokemonListPg} />
    <Route path="/data" component={DexData} />
  </Switch>
);

export default Routes;
