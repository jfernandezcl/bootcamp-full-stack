import { useState } from "react";

const Authors = ({ show, authors, updateBirthYear }) => {
  if (!show) {
    return null;
  }

  // Nuevos estados locales
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBirthYear(selectedAuthor, birthYear); // Función que actualiza el año de nacimiento
    setSelectedAuthor("");
    setBirthYear("");
  };

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || "N/A"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set Birth Year</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Author:
            <select
              value={selectedAuthor}
              onChange={({ target }) => setSelectedAuthor(target.value)}
            >
              <option value="">Select author</option>
              {authors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Birth Year:
            <input
              type="number"
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </label>
        </div>
        <button type="submit">Update Birth Year</button>
      </form>
    </div>
  );
};

export default Authors;
