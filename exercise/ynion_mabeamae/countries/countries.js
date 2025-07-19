function searchCountry() {
  const countryName = document.getElementById("input_country").value;
  if (!countryName) {
    alert("Please enter a country name");
    return;
  }

  const countryDetails = document.getElementById("country_details");
  const regionDiv = document.getElementById("region");

  countryDetails.innerHTML = `
                    <div class="loading">Loading country information...</div>`;
  regionDiv.innerHTML = `<div class="loading">Loading regional data...</div>`;

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then((data) => {
      const country = data[0];
      if (!country) throw new Error("Country not found");

      const region = country.region;
      const countryInfo = {
        name: country.name.common,
        capital: country.capital?.[0] || "N/A",
        population: country.population?.toLocaleString(),
        area: country.area?.toLocaleString(),
        languages: country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A",
        currencies: country.currencies
          ? Object.values(country.currencies)
              .map((c) => c.name)
              .join(", ")
          : "N/A",
        flag: country.flags?.png,
      };

      countryDetails.innerHTML = `
        <div class="country-card main-country">
          <h2>${countryInfo.name}</h2>
          ${
            countryInfo.flag
              ? `<img src="${countryInfo.flag}"
                      alt="Flag of ${countryInfo.name}" />`
              : ""
          }
          <p><strong>Capital:</strong> ${countryInfo.capital}</p>
          <p><strong>Population:</strong> ${countryInfo.population}</p>
          <p><strong>Area:</strong> ${countryInfo.area} km²</p>
          <p><strong>Languages:</strong> ${countryInfo.languages}</p>
          <p><strong>Currencies:</strong> ${countryInfo.currencies}</p>
        </div>`;

      return fetch(`https://restcountries.com/v3.1/region/${region}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error("Could not fetch region data");
      return response.json();
    })
    .then((regionData) => {
      const regionCountries = regionData.filter(
        (country) => country.name.common
      );

      regionDiv.innerHTML = `
          <h3 class="region-title">Countries in the Same Region</h3>
          <div class="countries-grid">
            ${regionCountries
              .map(
                (country) => `
                    <div class="country-card">
                      <h3>${country.name.common}</h3>
                      ${
                        country.flags?.png
                          ? `<img src="${country.flags.png}"
                                alt="Flag of ${country.name.common}" />`
                          : ""
                      }
                      <p><strong>Capital:</strong> ${country.capital?.[0]}</p>
                      <p><strong>Population:</strong>
                        ${country.population?.toLocaleString()}</p>
                    </div>`
              )
              .join("")}
          </div>`;
    })
    .catch((error) => {
      const errorHTML = `<div class="error">${error.message}</div>`;
      countryDetails.innerHTML = errorHTML;
      regionDiv.innerHTML = errorHTML;
      console.error("Error:", error);
    });
}