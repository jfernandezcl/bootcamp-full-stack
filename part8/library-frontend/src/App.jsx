import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  const [books, setBooks] = useState([
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", published: 1997 },
    { title: "A Game of Thrones", author: "George R.R. Martin", published: 1996 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", published: 1937 },
  ])

  const addBook = (newBook) => {
    setBooks([...books, setBooks])
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} books={books} />

      <Books show={page === "books"} books={books} />

      <NewBook show={page === "add"} books={addBook} />
    </div>
  );
};

export default App;
