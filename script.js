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

// Init app
(function () {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
})();
