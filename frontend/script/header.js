function loadUser() {
  let loginUser = JSON.parse(localStorage.getItem("loginData"));
  let logoutLink = document.querySelector(".logout-link");
  let registerLink = document.querySelector(".register-link");
  let logInLink = document.querySelector(".login-link");
  let userProfile = document.getElementById("userProfile");
  let addAudioBookLink = document.getElementById("addAudioBookPage");
  let addBookLink = document.getElementById("addBookPage");
  if (loginUser === null) {
    logoutLink.style.display = "none";
    userProfile.addEventListener("click", () => {
      window.location.href = "login.html";
    });
    addAudioBookLink.addEventListener("click", () => {
      window.location.href = "login.html";
    });
    addBookLink.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  } else {
    let userName = loginUser.user.username;
    let userNameHTML = document.querySelector(".userName");
    userNameHTML.innerHTML = userName;
    logoutLink.style.display = "block";
    registerLink.style.display = "none";
    logInLink.style.display = "none";
    userProfile.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
    addAudioBookLink.addEventListener("click", () => {
      window.location.href = "addaudio.html";
    });
    addBookLink.addEventListener("click", () => {
      window.location.href = "addbook.html";
    });
  }
}

loadUser();

let logoutLink = document.querySelector(".logout-link");

function logOut() {
  localStorage.removeItem("loginData");
  window.location.href = "index.html";
}

logoutLink.addEventListener("click", () => {
  logOut();
});
