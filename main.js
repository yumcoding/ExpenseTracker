const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const moneyPlus = document.getElementById("in-list");
const moneyMinus = document.getElementById("ex-list");
const form = document.querySelector("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];

let transactions = dummyTransactions;

function addTransactionDOM() {
  transactions.forEach((item) => {
    if (item.amount > 0) {
      const li = document.createElement("li");
      li.className = "money plus";
      li.innerHTML = `
            <span>${item.text}</span>
            <span class="money plus">$ ${item.amount}</span>
            `;
      moneyPlus.appendChild(li);
    } else {
      const li = document.createElement("li");
      li.className = "money minus";
      li.innerHTML = `
              <span>${item.text}</span>
              <span class="money minus">$ ${item.amount}</span>
              `;
      moneyMinus.appendChild(li);
    }
  });
}

function init() {
  addTransactionDOM();
}

init();
