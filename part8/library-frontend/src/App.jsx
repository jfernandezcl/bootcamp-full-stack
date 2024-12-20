import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const [page, setPage] = useState("authors");
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("")
  const [favoriteGenre, setFavoriteGenre] = useState("");

  const [authors, setAuthors] = useState([
    { name: "Author 1", born: 1960, bookCount: 3 },
    { name: "Author 2", born: null, bookCount: 5 },
    { name: "Author 3", born: 1985, bookCount: 2 },
  ]);

  const [books, setBooks] = useState([
    { title: "Book 1", author: "Author 1", published: 2020, genres: ["Fiction"] },
    { title: "Book 2", author: "Author 2", published: 2019, genres: ["Non-fiction"] },
    { title: "Book 3", author: "Author 1", published: 2018, genres: ["Fiction", "Drama"] },
    { title: "Book 4", author: "Author 3", published: 2021, genres: ["Sci-fi"] },
  ]);


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

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;

  const favoriteBooks = favoriteGenre
    ? books.filter((book) => book.genres.includes(favoriteGenre))
    : [];

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {authenticated && (
          <button onClick={() => setPage("add")}>add book</button>
        )}
        {!authenticated && (
          <button onClick={() => setPage("login")}>Login</button>
        )}
      </div>

      <div>
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Drama">Drama</option>
          <option value="Sci-fi">Sci-fi</option>
        </select>
      </div>

      {authenticated ? (
        <>
          <Authors
            show={page === "authors"}
            authors={authors}
            updateBirthYear={updateBirthYear}
          />

          <Books
            show={page === "books"}
            books={filteredBooks}
            favoriteBooks={favoriteBooks}
            favoriteGenre={favoriteGenre}
          />

          <NewBook show={page === "add"} addBook={addBook} />
        </>
      ) : (
        page === "login" && (
          <LoginForm
            setAuthenticated={setAuthenticated}
            setFavoriteGenre={setFavoriteGenre}
          />
        )
      )}
    </div>
  );
};

export default App;
