import { useState } from 'react'
import Select from 'react-select'

const BirthYearForm = ({ authors, updateBirthYear }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(mull)
  const [year, setYear] = useState('')

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  const hanbleSubmit = (event) => {
    event.preventDefault()
    if (selectedAuthor && year) {
      updateBirthYear(selectedAuthor.value, year)
      setSelectedAuthor(null)
      setYear('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Author</label>
        <Select
          options={options}
          value={selectedAuthor}
          onChange={setSelectedAuthor}
          placeholder="Choose an author..."
        />
      </div>
      <div>
        <label>Year of Birth</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year"
        />
      </div>
      <button type="submit">Update Birth Year</button>
    </form>
  )
}

export default BirthYearForm;