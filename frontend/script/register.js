let registerName = document.getElementById("usernameRegister");
let registerEmail = document.getElementById("emailRegister");
let registerPassword = document.getElementById("passwordRegister");
let registerBtnSend = document.getElementById("registerBtn");
let passwordRegisterRepeat = document.getElementById("passwordRegisterRepeat");
let registrationForm = document.getElementById("registration-form");
// register

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
}, false);

let register = async () => {

	let response = await axios.post("http://localhost:1337/api/auth/local/register", {
    username: registerName.value,
    password: registerPassword.value,
    email: registerEmail.value,
  });
  let loginData = response.data;
  localStorage.setItem("loginData", JSON.stringify(loginData));
};
registerBtnSend.addEventListener("click", async () => {
if (registerPassword.value !== passwordRegisterRepeat.value) {
    let errorMessage = document.createElement("div");
    errorMessage.innerHTML = "Password should be the same!";
	let registerForm = document.getElementById('registration-form');
    registerForm.appendChild(errorMessage);
    return;
  }
  await register();
  window.location.href = "index.html";
});
