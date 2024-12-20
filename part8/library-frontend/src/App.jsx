import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const [page, setPage] = useState("authors");

  const [authors, setAuthors] = useState([
    { name: "Author 1", born: 1960, bookCount: 3 },
    { name: "Author 2", born: null, bookCount: 5 },
    { name: "Author 3", born: 1985, bookCount: 2 },
  ]);
  const [books, setBooks] = useState([]);

  const updateBirthYear = (name, year) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((a) =>
        a.name === name ? { ...a, born: Number(year) } : a
      )
    )
  }

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={authors}
        updateBirthYear={updateBirthYear}
      />

      <Books show={page === "books"} books={books} />

      <NewBook show={page === "add"} addBook={addBook} />
    </div>
  );
};

export default App;
