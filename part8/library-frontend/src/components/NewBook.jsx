import { useState } from "react";

const NewBook = ({ show, addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genres, setGenres] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      title,
      author,
      published: parseInt(published),
      genres: genres.split(",").map((genre) => genre.trim()),
    };

    addBook(newBook);

    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres("");
  };

  if (!show) return null;

  return (
    <div>
      <h2>Agregar un libro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Año de publicación</label>
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Géneros (separados por coma)</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default NewBook;
