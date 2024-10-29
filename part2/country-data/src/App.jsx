import axios from "axios";
import { useState } from "react";
import Search from "./components/Search";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = async (input) => {
    setSearchTerm(input)
    if (input) {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${input}`)
        setCountries(response.data)
      } catch (error) {
        setCountries([])
      }
    } else {
      setCountries([])
    }
  }

  return (
    <div>
      <h1>Country Finder</h1>
      <Search onSearch={handleSearch} />
      <CountryList countries={countries} />
    </div>
  )
}

export default App