const Books = (show) => {
  if (!show) {
    return null
  }

  const books = [
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", published: 1997 },
    { title: "A Game of Thrones", author: "George R.R. Martin", published: 1996 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", published: 1937 },
  ]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books