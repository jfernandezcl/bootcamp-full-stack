const Authors = (show) => {
  if (!show) {
    return null
  }
  const authors = [
    { name: "J.K. Rowling", born: 1965, bookCount: 7 },
    { name: "George R.R. Martin", born: 1948, bookCount: 5 },
    { name: "J.R.R. Tolkien", born: 1892, bookCount: 4 },
  ]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors