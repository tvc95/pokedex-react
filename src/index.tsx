import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient, HttpLink, InMemoryCache, ApolloProvider,
} from '@apollo/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
