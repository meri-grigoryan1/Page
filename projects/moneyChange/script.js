const currencyList = [
    { name: "Argentine Peso", code: "ARS" },
    { name: "Armenian Dram", code: "AMD" },
    { name: "Brazilian Real", code: "BRL" },
    { name: "Burundian Franc", code: "BIF" },
    { name: "Canadian Dollar", code: "CAD" },
    { name: "Chinese Yuan", code: "CNY" },
    { name: "Dominican Peso", code: "DOP" },
    { name: "Egyptian Pound", code: "EGP" },
    { name: "Euro", code: "EUR" },
    { name: "Georgian Lari", code: "GEL" },
    { name: "Indonesian Rupiah", code: "IDR" },
    { name: "Russian Ruble", code: "RUB" },
    { name: "Ugandan Shilling", code: "UGX" },
    { name: "Ukrainian Hryvnia", code: "UAH" },
    { name: "United Arab Emirates Dirham", code: "AED" },
    { name: "Uruguayan Peso", code: "UYU" },
    { name: "US Dollar", code: "USD" },
];

function populateSelectOptions(selectId, options) {
    const select = document.getElementById(selectId);

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.code;
        optionElement.textContent = option.name;
        select.appendChild(optionElement);
    });
}

populateSelectOptions('convertFrom', currencyList);
populateSelectOptions('convertTo', currencyList);


const apiKey = '69799d05ab0c71fcd792539c';


async function convertCurrency() {
    const amountFrom = document.getElementById('amountFrom').value;
    const convertFrom = document.getElementById('convertFrom').value;
    const convertTo = document.getElementById('convertTo').value;


    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${convertFrom}/${convertTo}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const exchangeRate = data.conversion_rate;
        const amountTo = (amountFrom * exchangeRate).toFixed(2);
        document.getElementById('amountTo').value = amountTo;
        document.getElementById('exchangeRate').textContent = `1 ${convertFrom} = ${exchangeRate} ${convertTo}`;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
    }
}

document.getElementById('convertFrom').addEventListener('change', convertCurrency);
document.getElementById('convertTo').addEventListener('change', convertCurrency);
document.getElementById('amountFrom').addEventListener('input', convertCurrency);

document.querySelector('.swap-currency').addEventListener('click', function() {
    const convertFrom = document.getElementById('convertFrom');
    const convertTo = document.getElementById('convertTo');
    const temp = convertFrom.value;
    convertFrom.value = convertTo.value;
    convertTo.value = temp;
    convertCurrency();
});