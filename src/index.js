import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const cacheOptions = {
  typePolicies: {
    Produto: {
      fields: {
        estaNoCarrinho: { 
          read(cachedValue = false) {
            return cachedValue;
          }
        }
      }
    }
  }
}

const cache = new InMemoryCache(cacheOptions);

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);