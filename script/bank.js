const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");
const totalDeposit = document.getElementById("total-deposit");
const totalWithdrawal = document.getElementById("total-withdrawal");
const totalBalance = document.getElementById("total-balance");
const transactionHistory = document.getElementById("transaction-lists");

function dateFormat() {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  return `${day}-${month}-${year}`;
}
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

if (currentUser) {
  document.getElementsByTagName(
    "h1"
  )[0].textContent = `Welcome back ${currentUser.firstName} ${currentUser.lastName}`;
  let user = users.find(user => user.id === currentUser.id);
  totalDeposit.textContent = `$${user.totalDeposit}`;
  totalBalance.textContent = `$${user.totalBalance}`;
  user.Transactions.forEach(transact => {
    transactionHistory.innerHTML += `
        <div class="flex justify-between items-center text-xl mb-6">
                <p>${transact.deposit}</p>
                <p>${transact.Amount}</p>
                <p>${transact.date}</p>
            </div>
            `;
  });

  // const history = document.createElement('div')

  // history.className = "history"
  // const deposit = document.createElement('p')
  // const amount = document.createElement('p')
  // const date = document.createElement('p')
  // deposit.textContent = user.Transactions.deposit
  // amount.textContent = user.Transactions.Amount
  // date.textContent = user.Transactions.date
  // history.appendChild(deposit)
  // history.appendChild(amount)
  // history.appendChild(date)
  // transactionHistory.innerHTML(history)
}

depositBtn.addEventListener("click", depositMoney);
withdrawBtn.addEventListener("click", withdraw);

function depositMoney() {
  const depositAmount = Number(document.getElementById("deposit-amount").value);

  let user = users.find(user => user.id === currentUser.id);
  if (user) {
    user.totalDeposit += depositAmount;
    user.totalBalance += depositAmount;

    let depositHistory = {
      deposit: "deposit",
      Amount: depositAmount,
      date: dateFormat(),
    };
    user.Transactions.push(depositHistory);
    localStorage.setItem("users", JSON.stringify(users));

    totalDeposit.textContent = `$${user.totalDeposit}`;
    totalBalance.textContent = `$${user.totalBalance}`;

    transactionHistory.innerHTML += `
        <div class="flex justify-between items-center text-xl mb-6">
                <p>${depositHistory.deposit}</p>
                <p>${depositHistory.Amount}</p>
                <p>${depositHistory.date}</p>
            </div>
          `;
  }
}
