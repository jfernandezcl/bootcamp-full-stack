import { useState } from "react";

const Authors = ({ show, authors, updateBirthYear }) => {
  if (!show) {
    return null;
  }


  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [birthYear, setBirthYear] = useState("");

  const options = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBirthYear(selectedAuthor, birthYear);
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
          <label>Author:</label>
          <Select
            options={options}
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            placeholder="Select an author"
          />
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
