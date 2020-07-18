import React from 'react'
import BookList from './BookList'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import AddBook from './AddBook'


//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})


const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  )
}

export default App
