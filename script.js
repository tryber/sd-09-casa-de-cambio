const handleRates = (ratesData) => {
  const currencyList = document.querySelector('#currency-list');

  const entries = Object.entries(ratesData.rates);
  
  entries.forEach((array) => {
    const [ currency, rate ] = array;
    
    const li = document.createElement('li');
    li.innerHTML = `<strong>${currency}:</strong> ${rate}`

    currencyList.appendChild(li);
  });
}

const fetchCurrency = (currency) => {
  const endpoint = `https://api.ratesapi.io/api/latest?base=${currency}`;
  
  fetch(endpoint)
    .then((response) => response.json())
    .then((object) => { 
      if (object.error) {
        throw new Error(object.error);
      }

      handleRates(object);
    })
    .catch((error) => {
      window.alert(error);
    });
}

const handleSearchEvent = () => {
  const searchInput = document.querySelector('#currency-input');
  const currency = searchInput.value.toUpperCase();

  fetchCurrency(currency);
}

const setupEvents = () => {
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', handleSearchEvent);
}

window.onload = () => {
  setupEvents();
}
