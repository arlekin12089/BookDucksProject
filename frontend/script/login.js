let nameLogin = document.getElementById("login_email");
let passwordLogin = document.getElementById("login_password");
let loginBtn = document.getElementById("login_btn");
let login_form = document.querySelector(".login_form");

// Login function
login_form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let login = async () => {
  let response = await axios.post("http://localhost:1337/api/auth/local", {
    identifier: nameLogin.value,
    password: passwordLogin.value,
  });
  console.log(response);
  let loginData = response.data;
  localStorage.setItem("loginData", JSON.stringify(loginData));
};

loginBtn.addEventListener("click", async () => {
  await login();
  window.location.href = "profile.html";
});
