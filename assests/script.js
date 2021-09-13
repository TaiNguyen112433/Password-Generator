
////////// ---------------My Code------------------ ///////////

//// This section will select all relevant HTML elements that will be referred to when generating a password

// Slider Selector (length of password)
const slider = document.querySelector(".length-slider");

// Text that'll show the length property of the password
const sliderLength = document.querySelector(".length-title");

// Retrieving the number for later application to "Length:" when the slider is moved
slider.querySelector("input").addEventListener("input", event => {
  sliderLength.setAttribute("data-length", event.target.value);
   showValue(event.target);
});

// Passing the range input to the showValue function
showValue(slider.querySelector("input"));

// Apply number to "Length"
function showValue(slider) {
  sliderLength.setAttribute("data-length", slider.value);
}


// This is my object I've defined to hold all relevant functions to ensure randomized passwords based on the user's selected rules

const randomFunc = {
  uppercase: randomizeUppercase,
  lowercase: randomizeLowercase,
  number: randomizeNumber,
  symbols: randomizeSymbol
}

// Generator Functions for randomizing respective password rules
  // Math.floor() = round whatever number that's inside of it
  // Math.random() = random number
function randomizeUppercase(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  // 65 is the starting capitalized letter in the unicode order
  // we have + 65 because we want to start at "A" and extend the range
  // to "Z" 
  // This will also apply below and for numbers but within a smaller range
}

function randomizeLowercase(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomizeNumber(){
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function randomizeSymbol(){
  const symbols = "!@#$%^&()*,./<=>?@[]^_`{}~"
  return symbols[Math.floor(Math.random() * symbols.length)]
}

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const passwordEl = document.getElementById("password");
const sliderLengthEl = document.getElementById("slider");
const generateBtn = document.getElementById("generate");


// This function is embedded with parameters required to generate a password along with a for loop that will iterate
// until the length is met.
function generateRandomPassword(uppercase, lowercase, number, symbols, length) {
  let generatedPassword = "";
  // We want to account for checkboxes being checked by counting each individual required input
  const typesCount = uppercase + lowercase + number + symbols;
  // We want to filter the individual required inputs if they have a value or have been checked
  const typesArray = [{uppercase}, {lowercase}, {number}, {symbols}].filter(item => Object.values(item)[0]);
  // If the typesCount === 0, this means that the user did not check any of the inputs required therefore no password (blank)
  // should be generated
  if (typesCount === 0){
    return '';
  }
  else {
  // The first position in this loop initiates where it starts its first iteration
  // The second position tells us how many times it should iterate ie if the length is 114, it'll iterate its functions up until the 114th time
  // The third position will define how the loop will iterate; in this case, it'll increment based on the typesCount
  for (let i = 0; i < length; i+=typesCount){
    // for each item in the array, we want to retrieve its key to ensure we perform the specific randomization function
    // ie. if the key is 1, functionTypeName should equal lowercase in which case, randomFunc will access its object and look for "lowercase" and perform a lowercase randomization
    // This function will continue to run for this key until it reaches the length defined by the user
    typesArray.forEach(type => {
      const functionTypeName = Object.keys(type)[0];
      generatedPassword += randomFunc[functionTypeName]();
    });
  }
  console.log(generatedPassword)
  return generatedPassword.slice(0, length)

  }
// After the loop, the "generatedPassword" has now been changed from "(blank)" to a new randomized password based on the requirement
// We return a sliced generated password which will "slice" from its first character position to the end of the specified length (ie 114)
}


// When the button is clicked, we want to attach a event listener to it so that way it'll:
// 1: check to see if the uppercase box is checked
// 2: if the lowercase box is checked
// 3: if number is checked
// 4: if symbols is checked
// 5: input value for the slider
// Once the relevant elements are declared as variables, pass them through the generateRandomPassword and change the inner text to the password container (textarea)
generateBtn.addEventListener('click', () => {
  const hasUpperCase = uppercaseEl.checked;
  const hasLowerCase = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;
  const length = sliderLengthEl.value;
  passwordEl.innerText = generateRandomPassword(hasUpperCase, hasLowerCase, hasNumber, hasSymbols, length);
});


