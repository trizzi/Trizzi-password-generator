const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const numberEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunction = () => {
  return {
    lower: getRandomLowercaseLetters,
    upper: getRandomUppercaseLetters,
    number: getRandomNumber,
    symbol: getRandomSymbols,
  };
};

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  textarea.value = '';
  alert('Your password has been copied to the clipboard');
});

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

const generatePassword = (
  lower,
  upper,
  number,
  symbol,
  length
) => {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;

  const typesArr = [
    { lower },
    { upper },
    { number },
    { symbol },
  ].filter((item) => Object.values(item)[0]);

  if (typesCount == 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunction()[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
};

const getRandomLowercaseLetters = () => {
  return String.fromCharCode(
    Math.floor(Math.random() * 26) + 97
  );
};

const getRandomUppercaseLetters = () => {
  return String.fromCharCode(
    Math.floor(Math.random() * 26) + 65
  );
};

const getRandomNumber = () => {
  return String.fromCharCode(
    Math.floor(Math.random() * 10) + 48
  );
};

const getRandomSymbols = () => {
  const symbols = '!@#$%^&*(){}[]-_=<>?/|,.';
  return symbols[
    Math.floor(Math.random() * symbols.length)
  ];
};
