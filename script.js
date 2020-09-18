const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [
  { id: 1, text: 'Salary', amount: 300 },
  { id: 2, text: 'Rent', amount: -50 }
];

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(sign === '-' ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn">x</button>`;

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

// Init app
(function () {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateAmounts();
})();
