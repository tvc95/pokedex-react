import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import GlobalStyle from "./styles/global";
import Routes from "./routes/index";

/**
 * Shared QueryClient instance. Configures sensible defaults:
 * - staleTime: 5 minutes (avoid refetching data that was just loaded)
 * - cacheTime: 30 minutes (keep unused data in memory for fast revisits)
 * - retry: 2 (auto-retry failed requests twice before showing an error)
 * - refetchOnWindowFocus: false (Pokémon data doesn't change while tabbed out)
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes />
    </Router>
    <GlobalStyle />
  </QueryClientProvider>
);

export default App;
