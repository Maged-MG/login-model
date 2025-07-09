// &-----------Vars-----------
let mail = document.getElementById("mail");
let pass = document.getElementById("pass");
let loginBtn = document.getElementById("loginBtn");
let signUpLink = document.getElementById("signUpLink");
let upName = document.getElementById("upName");
let upMail = document.getElementById("upMail");
let upPass = document.getElementById("upPass");
let signUpBtn = document.getElementById("signUpBtn");
let signinLink = document.getElementById("signinLink");
const loginCard = document.querySelector(".loginCard");
const signupCard = document.querySelector(".signupCard");
const logOut = document.querySelector(".btn-outline-danger");

// array of users
let users = [];

// &---------functions---------

// ---------Home Page---------
function goToHome(userName) {
  document.getElementById(
    "transform"
  ).innerHTML = `<div class="card shadow border-0 w-50 mx-auto fs-5 fw-bold p-5 text-center">
            Welcome ${userName} to the Home Page!
        </div>`;
}
// -------Validation Functions-------
function validateEmail(email) {
  const mailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (mailRe.test(upMail.value)) {
    document.getElementById("upMail").classList.add("is-valid");
    document.getElementById("upMail").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("upMail").classList.add("is-invalid");
    document.getElementById("upMail").classList.remove("is-valid");
    return false;
  }
}
function validatepass(password) {
  const passRe =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (passRe.test(upPass.value)) {
    document.getElementById("upPass").classList.add("is-valid");
    document.getElementById("upPass").classList.remove("is-invalid");
    return true;
  } else {
    document.getElementById("upPass").classList.add("is-invalid");
    document.getElementById("upPass").classList.remove("is-valid");
    return false;
  }
}

upMail.addEventListener("change", function () {
  validateEmail(upMail.value);
});
upPass.addEventListener("change", function () {
  validatepass(upPass.value);
});

// &--------Sign Up Page---------
signUpLink.addEventListener("click", function () {
  loginCard.classList.add("d-none");
  signupCard.classList.remove("d-none");
});

// &--------Sign in Page---------
signinLink.addEventListener("click", function () {
  signupCard.classList.add("d-none");
  loginCard.classList.remove("d-none");
});

// &-------signUp submission-------

function signupConferm() {
  let user = {
    name: upName.value,
    mail: upMail.value,
    pass: upPass.value,
  };
  users.push(user);
  console.log(users);

  saveData();
  clearFields();
}
signUpBtn.addEventListener("click", signupConferm);

// &----------clearFields--------
function clearFields() {
  upName.value = "";
  upMail.value = "";
  upPass.value = "";
}
// &-------saveDataToLocalStorage-------

function saveData() {
  if (upName.value !="" && upMail.value && upPass.value) {
    localStorage.setItem("users", JSON.stringify(users));
    window.alert("Sign Up Successfully");
     signupCard.classList.add("d-none");
  loginCard.classList.remove("d-none");
  }
  else {
    window.alert("Please fill all fields");
  }
}

// &-------Get Data from LocalStorage-------
function getData() {
  users = JSON.parse(localStorage.getItem("users"));
}

// &-------Login Function-------
function login() {
  getData();
  let userMail = mail.value;
  let userPass = pass.value;
  let foundUser = users.find(
    (user) => user.mail === userMail && user.pass === userPass
  );

  if (foundUser) {
    window.alert("Login Successfully");
    goToHome(foundUser.name);
    logOut.classList.remove("d-none");
  } else {
    window.alert("Invalid email or password");
  }
}
loginBtn.addEventListener("click", login);



// &-------Logout Function-------
logOut.addEventListener("click", function () {
  logOut.classList.add("d-none");
signupCard.classList.add("d-none");
  loginCard.classList.remove("d-none");
  document.getElementById("transform").innerHTML = ``;
  location.reload();
});
