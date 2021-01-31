const handleRates = (ratesData) => {
  const currencyList = document.querySelector('#currency-list');

  const entries = Object.entries(ratesData.rates);

  let counter = 0;

  entries.forEach((array) => {
    // setTimeout(() => {
      const [ currency, rate ] = array;

      const formattedRate = Math.round(rate * 100) / 100;

      const li = document.createElement('li');
      li.innerHTML = `<strong>${currency}:</strong> ${formattedRate}`

      currencyList.appendChild(li);
    // }, counter);
    // counter += 250;
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

const fetchCurrencyAsyncAwait = async (currency) => {
  // SE eu vou usar await dentro de uma função, então
  // a assinatura da função TEM QUE TER a palavra async

  const endpoint = `https://api.ratesapi.io/api/latest?base=${currency}`;

  try {
    loading();
    const response = await fetch(endpoint);
    const object = await response.json();

    if (object.error) {
      throw new Error(object.error);
    }

    // setTimeout(() => {
      removeLoading();
      handleRates(object);
    // }, 2000)
  } catch (error) {
    window.alert(error);
  }
}

const loading = () => {
  const currencyList = document.querySelector('#currency-list');
  const load = document.createElement('h2');
  load.innerText = 'Carregando...';
  currencyList.appendChild(load);
}

const removeLoading = () => {
  const currencyList = document.querySelector('#currency-list');
  currencyList.innerHTML = '';
}

const hendleBTC = (object) => {
  let counter = 0;

  const btcRates = Object.values(object.bpi);
  btcRates.forEach(({ code, rate_float }) => {
    // setTimeout(() => {
      const ul = document.querySelector('#currency-list');
      const li = document.createElement('li');
      const rateFormated = Math.round(rate_float * 100) / 100;
      li.innerHTML = `<strong>${code}:</strong> ${rateFormated}`;
      ul.appendChild(li);
    // },
    //  counter);
    // counter += 500;
  });
}

const fetchBTCAsyncAwait = async () => {
  const linkBTC = `https://api.coindesk.com/v1/bpi/currentprice.json`;

  try {
    loading();
    const promise = await fetch(linkBTC);
    const object = await promise.json();

    setTimeout(() => {
      removeLoading();
      hendleBTC(object);
    }, 2000)
  } catch (error) {
    alert(error);
  }
}

const clearList = () => {
  const currencyList = document.querySelector('#currency-list');
  currencyList.innerHTML = '';
}

const handleSearchEvent = () => {
  const searchInput = document.querySelector('#currency-input');
  const currency = searchInput.value.toUpperCase();

  clearList();

  if (currency === 'BTC') fetchBTCAsyncAwait();
  else fetchCurrencyAsyncAwait(currency);
}

const setupEvents = () => {
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', handleSearchEvent);
}

window.onload = () => {
  setupEvents();
}