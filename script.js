const $ = (selector) => document.querySelector(selector);

const included = (valueToCheck, valueFromArray) => {
    return valueFromArray.toLowerCase().includes(valueToCheck.toLowerCase());
};

let searchTerm = '';

const showCountries = () =>
    fetch('http://restcountries.eu/rest/v2/all?field:population;name;flag')
        .then((countriesData) => countriesData.json())
        .then((countries) => {
            $('#results').innerHTML = countries
                .filter((country) => included(searchTerm, country.name))
                .map(
                    (country) =>
                        `
                <li class="country-item">
                    <img src="${country.flag}" alt="" class="country-flag" />
                    <h3 class="country-name">${country.name}</h3>
                    <div class="country-info">
                        <h2 class="country-population">
                            ${parseInt(country.population).toLocaleString('fr-FR')}
                        </h2>
                        <h5 class="country-population">Habitants</h5>
                    </div>
                </li>`,
                )
                .join();
        });
showCountries();

$('#search').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    showCountries();
});
