import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

/**
 * Lazy-loaded page components. Each page (and its dependencies like
 * Chart.js, Apollo queries, styled-components, etc.) is split into
 * its own chunk and only downloaded when the user navigates to that
 * route. This significantly reduces the initial bundle size.
 *
 * webpack (via CRA) automatically creates separate chunks for each
 * lazy() call — no extra configuration needed.
 */
const HomePage = lazy(() => import('../pages/HomePage/index'));
const DexData = lazy(() => import('../pages/DexData/index'));
const PokemonListPg = lazy(() => import('../pages/PokemonList'));
const PokemonSearchPg = lazy(() => import('../pages/PokemonSearch'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Routes: React.FC = () => (
  <Suspense fallback={<LoadingSpinner size="md" fullPage />}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/dexlist" component={PokemonListPg} />
      <Route path="/data/pokemon/:pkmnName" component={DexData} />
      <Route path="/search/:searchWord" component={PokemonSearchPg} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
