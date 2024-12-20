const Books = ({ show, books, favoriteBooks, favoriteGenre }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      {favoriteGenre && (
        <div>
          <h3>Books in your favorite genre: {favoriteGenre}</h3>
          <table>
            <tbody>
              <tr>
                <th>title</th>
                <th>author</th>
                <th>published</th>
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

      <h3>All books</h3>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
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
