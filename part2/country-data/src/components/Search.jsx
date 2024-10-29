import { useState } from "react"


const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e) => {
    setSearchValue(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Find a country..."
      />
    </div>
  )
}

export default Search