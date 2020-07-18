import React from 'react'
import { useQuery } from '@apollo/client'
import { getBookQuery } from '../queries/queries'

const BookDetails = (props) => {

  const displayBookDetails = () => {
    const { book } = data
    
    if(book){
      return(
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {
              book.author.books.map(item => {
                return <li key={item.id}>{item.name}</li> 
              })
            }
          </ul>
        </div>
      )
    }else{
      return <div>Not book selected</div>
    }
  }


  const { error, loading, data } = useQuery(getBookQuery,{
    variables:{
          id: props.bookId
        } 
  })
  if (loading) return <h1>'Loading...'</h1>;
  if (error) return `book details`;
  console.log(data)
 
  return (
    <div id="book-details">
       {displayBookDetails()}
    </div>
  )
}

export default BookDetails
