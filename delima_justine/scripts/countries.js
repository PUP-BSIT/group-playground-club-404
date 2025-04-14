function getData() {
  let country = document.getElementById('country_input').value;
  let countrySection = document.querySelector('.country-info');
  let relatedCountriesSection = document.querySelector('.related-countries'); 

	fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      
      if (!response.ok) {
        countrySection.innerHTML = 'No results found.';
        relatedCountriesSection.innerHTML = '';
      }

      relatedCountriesSection.innerHTML = `<h2 id="related_countries_title">
                                              </h2>
                                            <ol class="country-list"></ol>`
      return response.json();
    })
    .then(countryObj => {
      const countryName = countryObj[0].name['common'];
      const countryCapital = countryObj[0].capital[0];
      const countryRegion = countryObj[0].region
      const populationCount = countryObj[0].population;
      const languageList = [];
      const alternativeNames = [];

      for (let key in countryObj[0].languages) {
        languageList.push(countryObj[0].languages[key]);
      }

      for (let key in countryObj[0].altSpellings) {
        alternativeNames.push(countryObj[0].altSpellings[key])
      }

      const NewDetail = `<h2>${countryName}</h2>
                        <p><span>Capital</span>: ${countryCapital}</p>
                        <p><span>Region</span>: ${countryRegion}</p>
                        <p><span>Language</span>: ${languageList.join(', ')}</p>
                        <p><span>Alternative Name(s)</span>: 
                          ${alternativeNames.join(', ')}</p>
                        <p><span>Population</span>: 
                          ${populationCount.toLocaleString()}</p>`

      countrySection.innerHTML = NewDetail;

      return fetch(`https://restcountries.com/v3.1/region/${countryRegion}`);
    })
    .then((response) => response.json())
    .then(regionObj => {
      let countryList = document.querySelector('.country-list');
      let relatedCountriesTitle = 
        document.querySelector('#related_countries_title');
      let relatedCountries = [];

      // Add countries to the array.
      for (let country in regionObj) {
        relatedCountries.push(regionObj[country].name['common']);
      }

      // Sort the name of the countries
      relatedCountries.sort();

      // Set the title for header title of div 3.
      relatedCountriesTitle.innerHTML = `Other countries in 
                                        ${regionObj[0].region}`;

      // Clear the UI Country Lists
      countryList.innerHTML = "";

      // Add the countries to the UI
      for (let country in relatedCountries) {
        const relatedCountry = `<li>${relatedCountries[country]}</li>`;
        countryList.insertAdjacentHTML("beforeend", relatedCountry);
      };

      // Clear the array
      while(relatedCountries.length > 0) {
        relatedCountries.pop();
      }
    })
}
