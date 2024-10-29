const CountryList = ({ countries, selectedCountry, setSelectedCountry }) => {

  if (countries.length > 10) {
    return <p>Too many results</p>
  }

  if (selectedCountry) {
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
        <p>Capital: {selectedCountry.capital}</p>
        <p>Area: {selectedCountry.area} km</p>
        <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
        <button onClick={() => setSelectedCountry(null)}>Back to the list</button>
      </div>
    )
  }

  if (countries.length === 1) {
    const singleCountry = countries[0]
    return (
      <div>
        <h2>{singleCountry.name.common}</h2>
        <img src={singleCountry.flags.png} alt={`Flag of ${singleCountry.name.common}`} />
        <p>Capital: {singleCountry.capital}</p>
        <p>Area: {singleCountry.area} km</p>
        <p>Languages: {Object.values(singleCountry.languages).join(', ')}</p>
      </div>
    )
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList