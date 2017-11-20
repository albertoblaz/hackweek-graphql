import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql/',
  }),
  cache: new InMemoryCache(),
})

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      div
    )
  })
})
