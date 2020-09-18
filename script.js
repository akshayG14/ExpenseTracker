const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ?
  localStorageTransactions : [];

// Event Listener: Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add both text and amount');
  } else {
    const transaction = {
      id: generateRandomID(),
      text: text.value,
      amount: +amount.value
    }

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateAmounts();

    // Update the local storage
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Remove Transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  initializer();

  // Update the local storage
  updateLocalStorage();
}

// Generate random ID
function generateRandomID() {
  return Math.floor(Math.random() * 100000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(sign === '-' ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);
}

// Update the balance income/expense
function updateAmounts() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = (amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0))
    .toFixed(2);
  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += Math.abs(item)), 0) * -1)
    .toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

form.addEventListener('submit', addTransaction);

// update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function initializer() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateAmounts();
}
initializer();
