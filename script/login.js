const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", login);

function login(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "") {
    document.getElementById("email-error").textContent = "required";
  }
  if (password === "") {
    document.getElementById("password-error").textContent = "required";
  }

  if (email && password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => {
      return (
        user.email === email && bcrypt.compareSync(password, user.password)
      );
    });
    

    if (!user) {
      alert("details not found, sign up");
    }
    if (user) {
      user.isLoggedIn = true
      localStorage.setItem("currentUser", JSON.stringify(user)) 

      window.location.href = "bank.html"

    }
  }
}

function clearField(selector) {
  document.getElementById(selector).textContent = "";
}
