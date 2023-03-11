import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css'

export default function CurrencyConverter() {
  const [rates, setRates] = useState({ USD: 0, EUR: 0 });
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch latest currency rates from an API
  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/UAH')
      .then((response) => response.json())
      .then((data) => {
        setRates({ USD: data.rates.USD, EUR: data.rates.EUR });
      })
      .catch((error) => console.log(error));
  }, []);

  // Handle conversion on amount, fromCurrency, or toCurrency changes
  useEffect(() => {
    if (fromCurrency !== toCurrency) {
      if (fromCurrency === 'UAH') {
        setConvertedAmount(amount / rates[toCurrency]);
      } else if (toCurrency === 'UAH') {
        setConvertedAmount(amount * rates[fromCurrency]);
      } else {
        setConvertedAmount((amount * rates[fromCurrency]) / rates[toCurrency]);
      }
    } else {
      setConvertedAmount(amount);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  // Handle input and select changes for the "from" currency
  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleFromAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // Handle input and select changes for the "to" currency
  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  return (
    <div className="currency-converter">
      <h2>Конвертація валют</h2>
      <p>1 UAH еквівалентна:</p>
      <ul>
        <li>{`$${rates.USD.toFixed(2)} USD`}</li>
        <li>{`€${rates.EUR.toFixed(2)} EUR`}</li>
      </ul>
      <div>
        <label>Конвертуємо з:</label>
        <input type="number" value={amount} onChange={handleFromAmountChange} />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div>
        <label>Конвертуємо до:</label>
        <input type="number" value={convertedAmount.toFixed(2)} readOnly />
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </div>
  );
}