import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_BOOKS, ADD_BOOK } from './queries';

const Books = ({ show, setGenre, favoriteGenre, favoriteBooks }) => {

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS);

  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, { data: { addBook } }) => {
      const existingData = cache.readQuery({ query: ALL_BOOKS });
      cache.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: [...existingData.allBooks, addBook],
        },
      });
    },
  });

  const [selectedGenre, setSelectedGenre] = useState(null);

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
    refetch({ genre });
  };

  const addNewBook = async () => {
    try {
      await addBook({
        variables: {
          title: "New Book Title",
          author: "Author Name",
          published: 2024,
          genres: ["fiction"],
        },
      });
    } catch (err) {
      console.error("Error adding book:", err.message);
    }
  };
  useEffect(() => {
    if (data && data.bookAdded) {
      setBooks((prevBooks) => [...prevBooks, data.bookAdded]);
    }
  }, [data]);

  if (!show) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const books = data ? data.allBooks : [];

  return (
    <div>
      <h2>Books</h2>
      <div>
        <button onClick={addNewBook}>Add Book</button>
        <button onClick={() => selectGenre(null)}>Show All Books</button>
        <button onClick={() => selectGenre("fiction")}>Filter Fiction</button>
      </div>

      {favoriteGenre && (
        <div>
          <h3>Books in your favorite genre: {favoriteGenre}</h3>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
              {favoriteBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h3>All Books</h3>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
