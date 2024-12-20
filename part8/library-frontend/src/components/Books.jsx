import React from "react";
import { useQuery, gql } from "@apollo/client"

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

const Books = ({ show, books }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (!show) {
    return null
  }

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books