import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Select from "react-select";

const ALL_AUTHORS_QUERY = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      books {
        title
        published
      }
    }
  }
`;

const Authors = ({ show, updateBirthYear }) => {
  if (!show) {
    return null;
  }

  const { loading, error, data } = useQuery(ALL_AUTHORS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [birthYear, setBirthYear] = useState("");

  const options = data.allAuthors.map((a) => ({
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
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || "N/A"}</td>
              <td>
                <ul>
                  {a.books.map((book) => (
                    <li key={book.title}>
                      {book.title} ({book.published})
                    </li>
                  ))}
                </ul>
              </td>
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
