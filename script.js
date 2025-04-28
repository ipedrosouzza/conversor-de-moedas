// script.js

const API_KEY = '4053a528ea6f457d048f27f4' ;

async function convertCurrency() {
  const amountInput = document.getElementById('amount');
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const resultField = document.getElementById('result');

  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultField.innerText = "Por favor, insira um valor válido.";
    return;
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency.value}/${toCurrency.value}/${amount}`;
    console.log("URL da API:", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("Resposta da API:", data);

    if (data && data.conversion_result !== undefined) {
      const convertedAmount = data.conversion_result.toFixed(2);
      resultField.innerText = `${amount} ${fromCurrency.value} = ${convertedAmount} ${toCurrency.value}`;
    } else {
      resultField.innerText = "Erro ao buscar a conversão.";
    }
  } catch (error) {
    console.error("Erro na conversão:", error);
    resultField.innerText = "Erro de conexão. Tente novamente.";
  }
}
