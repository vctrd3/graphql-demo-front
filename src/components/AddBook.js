import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

// const getAuthorsQuery = gql`
// {
//   authors{
//     name
//     id
//   }
// }
// `
const AddBook = () => {
  const [addBook, { dataMut }] = useMutation(addBookMutation)
  const { error, loading, data } = useQuery(getAuthorsQuery)
  const [name, setName] = useState("")
  const [genre, setGenre] = useState("")
  const [authorId, setAuthorId] = useState("")


  const displayAuthors = () => {
    if (loading) return <option>'Loading...'</option>;
    if (error) return <option>`Error! ${error.message}`</option>;
    return data.authors.map(author =>{
      return <option key={author.id} value={author.id} >{author.name}</option>
    })
  }

  const submitForm = e => {
    e.preventDefault()
    //console.log(name, genre, authorId)
    addBook({ 
      variables: { 
        name, 
        genre, 
        authorId 
      },
      refetchQueries:[{query: getBooksQuery}]
    })
  }

  return (
     <form id="add-book" onSubmit={submitForm}>
      <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => setName(e.target.value)} />
      </div>
      <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => setGenre(e.target.value)}/>
      </div>
      <div className="field">
          <label>Author:</label>
          <select onChange={e => setAuthorId(e.target.value)}>
              <option>Select author</option>
              { displayAuthors() }
          </select>
      </div>
      <button>+</button>

    </form>
  )
}

export default AddBook
