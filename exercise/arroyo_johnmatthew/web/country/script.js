function displayCountry () {
    let country = document.querySelector("#country_input").value;
    let countryInfo = document.querySelector("#country_info");
    
    fetch (`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      
    if (!response.ok) {
      countryInfo.innerHTML = "Country not found. Please try again.";
    } 
  
    return response.json();
    }) 
    .then(countryObj => {
      const countryFlag = countryObj[0].flags.png;
      const countryFlagElement = 
        `<img src="${countryFlag}" alt="Country Flag" />`;
      const countryName = countryObj[0].name.common;
      const countryCapital = countryObj[0].capital[0];
      const countryPopulation = countryObj[0].population;
      const countryArea = countryObj[0].area;
      const countryRegion = countryObj[0].region;
      const countryTimezone = countryObj[0].timezones[0];
      const newElement = `<h2>${countryName}</h2>
                          <p>Capital: ${countryCapital}</p>
                          <p>Population: 
                              ${countryPopulation.toLocaleString()}</p>
                          <p>Area: ${countryArea} km²</p>
                          <p>Region: ${countryRegion}</p>
                          <p>Timezone: ${countryTimezone}</p>
                          <p>${countryFlagElement}</p>`;
  
    countryInfo.innerHTML = newElement;
    return fetch(`https://restcountries.com/v3.1/region/${countryRegion}`);
    })
    .then(response => response.json())
    .then(regionData => {
      let relatedCountries = document.querySelector("#related_list");
      let relatedCountriesTitle = 
        document.querySelector("#related_countries_title");
      let relatedCountriesContainer = [];
  
      for (let country in regionData) {
        relatedCountriesContainer.push(regionData[country].name.common);
      }
  
      relatedCountriesContainer.sort();
      relatedCountriesTitle.innerHTML = `Region Country: ${regionData[0].region}`;
      relatedCountries.innerHTML = "";
  
      for (let country in relatedCountriesContainer) {
        const relatedCountry = `<li>${relatedCountriesContainer[country]}</li>`;
        relatedCountries.insertAdjacentHTML("beforeend", relatedCountry);
      };
  
      while(relatedCountriesContainer.length > 0) {
        relatedCountriesContainer.pop();
      }
    })
  }