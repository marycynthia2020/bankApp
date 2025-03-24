const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");
const totalDeposit = document.getElementById("total-deposit");
const totalWithdrawal = document.getElementById("total-withdrawal");
const totalBalance = document.getElementById("total-balance");
const transactionHistory = document.getElementById("transaction-lists");
const depositInput = document.getElementById("deposit-amount");
const withdrawInput = document.getElementById("withdraw-amount");
const emailInput = document.getElementById("transfer-email");
const transferInput = document.getElementById("transfer-amount");
const transferBtn = document.getElementById("transfer");
const logoutBtn = document.getElementById("logout");

const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

if (currentUser) {
  document.getElementsByTagName(
    "h1"
  )[0].textContent = `Welcome back ${currentUser.firstName} ${currentUser.lastName}`;

  let user = users.find(user => user.id === currentUser.id);
  displayAmount(user);
}

depositBtn.addEventListener("click", depositMoney);

function depositMoney() {
  const depositAmount = Number(depositInput.value);
  depositInput.value = "";
  if (depositAmount < 1 || depositAmount === "") {
    alert("deposit a  valid amount");
    return;
  }
  let user = users.find(user => user.id === currentUser.id);
  user.totalDeposit += depositAmount;
  user.totalBalance += depositAmount;

  let depositHistory = {
    deposit: "deposit",
    Amount: `$${depositAmount}`,
    timestamp: new Date().getTime(),
  };
  user.Transactions.push(depositHistory);
  localStorage.setItem("users", JSON.stringify(users));
  displayAmount(user);
}

withdrawBtn.addEventListener("click", withdrawMoney);

function withdrawMoney() {
  const withdrawalAmount = Number(withdrawInput.value);
  withdrawInput.value = "";
  let user = users.find(user => user.id === currentUser.id);

  if (withdrawalAmount < 1 || withdrawalAmount === "") {
    alert("invalid withdrawal amount");
    return;
  }
  if (user.totalBalance < withdrawalAmount) {
    alert("please deposit more funds");
    return;
  }
  if (user) {
    user.totalWithdrawal += withdrawalAmount;
    user.totalBalance -= withdrawalAmount;

    const withdrawalHistory = {
      withdraw: "withdraw",
      Amount: `$${withdrawalAmount}`,
      timestamp: new Date().getTime(),
    };
    user.Transactions.push(withdrawalHistory);
    localStorage.setItem("users", JSON.stringify(users));
    displayAmount(user);
  }
}

transferBtn.addEventListener("click", transferMoney);
function transferMoney() {
  const transferAmount = Number(transferInput.value);
  const recipientEmail = emailInput.value;
  transferInput.value = "";
  emailInput.value = "";

  const selectedUser = users.find(user => user.email === recipientEmail);
  const current = users.find(user => user.email === currentUser.email);
  console.log(current);
  if (recipientEmail === "" || transferAmount === "" || transferAmount <= 0) {
    alert("Fill in transfer details correctly");
    return;
  }
  if (!selectedUser) {
    alert("No such user found");
    return;
  }
  if (transferAmount > current.totalBalance) {
    alert("Insufficient Funds");
    return;
  }
  if (selectedUser && transferAmount <= current.totalBalance) {
    selectedUser.totalBalance += transferAmount;
    selectedUser.totalDeposit += transferAmount;

    receiverTransferHistory = {
      Transfer: "From " + current.email,
      Amount: `$${transferAmount}`,
      timestamp: new Date().getTime(),
    };
    selectedUser.Transactions.push(receiverTransferHistory);

    current.totalWithdrawal += transferAmount;
    current.totalBalance -= transferAmount;
    senderTransferHistory = {
      Transfer: "To " + selectedUser.email,
      Amount: `$${transferAmount}`,
      timestamp: new Date().getTime(),
    };
    current.Transactions.push(senderTransferHistory);
    localStorage.setItem("users", JSON.stringify(users));

    displayAmount(current);
  }
}

function displayAmount(user) {
  totalDeposit.textContent = `$${user.totalDeposit}`;
  totalBalance.textContent = `$${user.totalBalance}`;

  totalWithdrawal.textContent = `$${user.totalWithdrawal}`;
  totalBalance.textContent = `$${user.totalBalance}`;

  transactionHistory.innerHTML = "";
  user.Transactions.forEach(transact => {
    if (transact.deposit === "deposit") {
      transactionHistory.innerHTML += `
       <div class="flex justify-between items-center text-xl mb-6">
               <p>${transact.deposit}</p>
               <p>${transact.Amount}</p>
               <p>${formatsDate(transact.timestamp)}</p>
           </div>
         `;
    }
    if (transact.withdraw === "withdraw") {
      transactionHistory.innerHTML += `
       <div class="flex justify-between items-center text-xl mb-6">
               <p>${transact.withdraw}</p>
               <p>${transact.Amount}</p>
               <p>${formatsDate(transact.timestamp)}</p>
           </div>
         `;
    } else {
      transactionHistory.innerHTML += `
      <div class="flex justify-between items-center text-xl mb-6">
              <p>${transact.Transfer}</p>
              <p>${transact.Amount}</p>
              <p>${formatsDate(transact.timestamp)}</p>
          </div>
        `;
    }
  });
}

function formatsDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

logoutBtn.addEventListener("click", logout);
function logout() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  if (currentUser) {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
}
