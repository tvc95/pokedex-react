import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/index';
import DexData from '../pages/DexData/index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/data" component={DexData} />
  </Switch>
);

export default Routes;
