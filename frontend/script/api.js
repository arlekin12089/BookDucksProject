export function getUser() {
  let loggedInUserToken = JSON.parse(localStorage.getItem("loginData"));
  if (loggedInUserToken === null) {
    window.location.href = "login.html";
    return;
  }
}

export async function getAllGenres() {
  let response = await axios.get("http://localhost:1337/api/genres");
  console.log(response.data);
  return response.data.data;
};