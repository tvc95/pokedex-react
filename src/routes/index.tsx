import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

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

/**
 * Full-page loading spinner shown while a lazy chunk is being downloaded.
 * Uses the same spinner style as the rest of the app for consistency.
 */
const PageLoader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
    }}
  >
    <div
      className="spinner-border text-info"
      role="status"
      style={{ width: '80px', height: '80px' }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const Routes: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/dexlist" component={PokemonListPg} />
      <Route path="/data/pokemon/:pkmnName" component={DexData} />
      <Route path="/search/:searchWord" component={PokemonSearchPg} />
    </Switch>
  </Suspense>
);

export default Routes;
