// const API_KEY='9df7d84bac4fd36c42c3801f'
// const API = "https://v6.exchangerate-api.com/v6/9df7d84bac4fd36c42c3801f/";

const API_TARGET = (target) =>
  `https://v6.exchangerate-api.com/v6/9df7d84bac4fd36c42c3801f/enriched/GBP/JPY`;
const API_WITH_BASE_CURRENCY = (baseCurrency) =>
  `https://v6.exchangerate-api.com/v6/9df7d84bac4fd36c42c3801f/latest/${baseCurrency}`;

const API_CALCULATE = (from, to, amount) =>
  `https://v6.exchangerate-api.com/v6/9df7d84bac4fd36c42c3801f/pair/${from}/${to}/${amount}`;

let baseCurrency = "KGS";

const ALL_CURRENCIES = ["KGS", "USD", "EUR", "KZT", "RUB"];

async function handleChangeBaseCurrency(event) {
  baseCurrency = event.target.value;
  getRates(event.target.value);
}

getRates(baseCurrency);

async function getRates(base) {
  const response = await fetch(API_WITH_BASE_CURRENCY(base));
  const data = await response.json();
  console.log("data: ", data);

  ALL_CURRENCIES.forEach((item) => {
    const currentLI = document.getElementById(item.toLowerCase());
    currentLI.innerHTML = `${item}: ${data.conversion_rates[item]}`;
    currentLI.style.fontWeight = item === base ? "bolder" : 500;
  });
}

async function calculate(type) {
  const firstAmount = document.getElementById("firstAmount");
  const secondAmount = document.getElementById("secondAmount");
  const firstCurrency = document.getElementById("firstCurrency");
  const secondCurrency = document.getElementById("secondCurrency");

  if (type === "first") {
    const response = await fetch(
      API_CALCULATE(
        firstCurrency.value,
        secondCurrency.value,
        firstAmount.value
      )
    );
    const data = await response.json();

    secondAmount.value = data.conversion_result;
  } else {
    const response = await fetch(
      API_CALCULATE(
        secondCurrency.value,
        firstCurrency.value,
        secondAmount.value
      )
    );
    const data = await response.json();
    firstAmount.value = data.conversion_result;
  }
}

async function displayTargetCurrencyInfo(targetCurrencyInfo) {
  const response = await fetch(API_TARGET(target));
  const data = response.json();
  console.log("data: ", data);
  const targetCurrencyInfoElement =
    document.getElementById("targetCurrencyInfo");
  targetCurrencyInfoElement.innerHTML = ` 
          <p>Локаль: ${targetCurrencyInfo.locale}</p> 
          <p>Двухбуквенный код: ${targetCurrencyInfo.two_letter_code}</p> 
          <p>Название валюты: ${targetCurrencyInfo.currency_name}</p> 
          <p>Сокращенное название валюты: ${targetCurrencyInfo.currency_name_short}</p> 
          <p>Символ: ${targetCurrencyInfo.display_symbol}</p> 
          <img src="${targetCurrencyInfo.flag_url}" alt="Флаг Японии" /> 
        `;
}

async function displayExchangeRate() {
  await getRates(baseCurrency);
}
displayExchangeRate();
