const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const moneyPlus = document.getElementById("in-list");
const moneyMinus = document.getElementById("ex-list");
const form = document.querySelector("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const transactionsInLS = JSON.parse(localStorage.getItem("transactions"));

let transactions = transactionsInLS !== null ? transactionsInLS : [];

// set transactions in local storage
function setTransactionsInLS() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// add transactions to DOM
function addTransactionDOM(transaction) {
  if (transaction.amount > 0) {
    const li = document.createElement("li");
    li.className = "money plus";
    li.innerHTML = `
              <span>${transaction.text}</span>
              <span class="money plus"> ${transaction.amount.toFixed(2)}</span>
              <button class="btn delete-btn" onclick="removeTransaction(${
                transaction.id
              })">X</button>
              `;
    moneyPlus.appendChild(li);
  } else {
    const li = document.createElement("li");
    li.className = "money minus";
    li.innerHTML = `
                <span>${transaction.text}</span>
                <span class="money minus"> ${transaction.amount.toFixed(
                  2
                )}</span>
                <button class="btn delete-btn" onclick="removeTransaction(${
                  transaction.id
                })">X</button>
                `;
    moneyMinus.appendChild(li);
  }
}

function showBalance() {
  const amountArr = transactions.map((item) => item.amount);
  const totalIncome = amountArr
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const totalExpense = Math.abs(
    amountArr.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0)
  ).toFixed(2);

  const total = amountArr.reduce((acc, item) => (acc += item), 0).toFixed(2);

  balance.innerHTML = `$ ${total}`;
  income.innerHTML = `+$ ${totalIncome}`;
  expense.innerHTML = `-$ ${totalExpense}`;
}

// add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value === "" || amount.value === "") {
    alert("Please enter text and amount");
  } else {
    const newTransaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(newTransaction);
    addTransactionDOM(newTransaction);
    showBalance();
    setTransactionsInLS();

    text.value = "";
    amount.value = "";
  }
}

//generate ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// Remove Transaction
function removeTransaction(transactionId) {
  transactions = transactions.filter((item) => item.id !== transactionId);
  setTransactionsInLS();
  init();
}

// initialize

function init() {
  moneyPlus.innerHTML = "";
  moneyMinus.innerHTML = "";
  transactions.forEach(addTransactionDOM);

  showBalance();
}

init();

form.addEventListener("submit", addTransaction);
