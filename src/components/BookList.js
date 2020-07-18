import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

// const getBooksQuery = gql`
// {
//   books{
//     name
//     id
//   }
// }
// `

const BookList = () => {
  const { error, loading, data } = useQuery(getBooksQuery)
  //console.log(data)
  const [selected, setSelected] = useState("")

const displayBooks = () => {
  if (loading) return <h1>'Loading...'</h1>;
  if (error) return `Error! ${error.message}`;
  return data.books.map(book => {
    return <li key={book.id} onClick={() => setSelected(book.id)} >{book.name}</li>
  })
  }

  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  )
}

export default BookList
