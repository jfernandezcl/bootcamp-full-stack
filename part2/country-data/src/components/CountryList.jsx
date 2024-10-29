const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many results</p>
  }

  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
      </div>
    )
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>{country.name.common}</li>
      ))}
    </ul>
  )
}

export default CountryList