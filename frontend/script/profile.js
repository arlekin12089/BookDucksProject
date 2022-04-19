let userInfo = document.getElementById("user-info");
let errorBooks = document.querySelector(".error-books");
let errorAudios = document.querySelector(".error-audio");

let getUser = async () => {
  let loggedInUserToken = JSON.parse(localStorage.getItem("loginData"));
  if (loggedInUserToken === null) {
    window.location.href = "login.html";
    return;
  }
  let response = await axios.get("http://localhost:1337/api/users/me", {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginData")).jwt}`,
    },
  });
  return response.data;
};

function showUser(user) {
  let { username, id, email, createdAt } = user;
  let createDate = new Date(createdAt);
  let updatedDate = createDate.toLocaleString();
  let userArticle = document.createElement("aside");
  userArticle.innerHTML = `
	<ul>
		<li><span>Username</span>: ${username}</li>
		<li><span>Email</span>: ${email}</li>
		<li><span>User Id</span>: ${id}</li>
		<li><span>Registration date</span>: ${updatedDate}</li>
	</ul>
	
	`;
  userInfo.appendChild(userArticle);
}

//Filtered books
let getBooksByUserId = async (userId) => {
  let response = await axios.get(`http://localhost:1337/api/books?filters[userId][$eq]=${userId}&populate=*`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginData")).jwt}`,
    },
  });
  return response.data.data;
};

//Filtered audiobooks
let getAudioBooksByUserId = async (userId) => {
  let response = await axios.get(`http://localhost:1337/api/audio-books?filters[userId][$eq]=${userId}&populate=*`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginData")).jwt}`,
    },
  });
  return response.data.data;
};

let profileBooks = document.getElementById("profile-books");
let profileAudioBooks = document.getElementById("profile-audiobooks");

async function createBooks(books) {
  if (books.length === 0) {
    errorBooks.style.display = "block";
  } else {
    errorBooks.style.display = "none";
    books.forEach(async (book) => {
      let { title, author, numPages, rating, cover, genres } = book.attributes;
      let li = document.createElement("li");
      let { url } = cover.data.attributes;
      let genre = "";
      genres.data.forEach((item, index) => {
        if (index === genres.data.length - 1) {
          genre += item.attributes.name;
        } else {
          genre += item.attributes.name + ",  ";
        }
      });

      li.innerHTML = `
		<div class="book__cover">
			<img src="http://localhost:1337${url}">		
		</div>
		<div class="book__info">
			<h3>${title}</h3>
			<p>Author: ${author}</p>
			<p>Number of pages: ${numPages}</p>
			<p>Rating ${rating}</p>
			<p>Genre: ${genre}</p>
	
		</div>
	`;
      profileBooks.appendChild(li);
    });
  }
}

async function createAudioBooks(audio) {
  if (audio.length === 0) {
    errorAudios.style.display = "block";
  } else {
    errorAudios.style.display = "none";
    audio.forEach(async (audio) => {
      let { title, author, rating, cover, duration, releaseDate, genres } = audio.attributes;
      let li = document.createElement("li");
      let { url } = cover.data.attributes;
      let genre = "";
      genres.data.forEach((item, index) => {
        if (index === genres.data.length - 1) {
          genre += item.attributes.name;
        } else {
          genre += item.attributes.name + ",  ";
        }
      });
      li.innerHTML = `
		<div class="book__cover">
			<img src="http://localhost:1337${url}">			
		</div>
		<div class="book__info">
			<h3>${title}</h3>
			<p>Author: ${author}</p>
			<p>Duration: ${duration}</p>
			<p>Release date: ${releaseDate}</p>
			<p>Rating ${rating}</p>
			<p>Genre: ${genre}</p>
		</div>
	`;
      profileAudioBooks.appendChild(li);
    });
  }
}

async function render() {
  let user = await getUser();
  showUser(user);
  let books = await getBooksByUserId(user.id);
  let audio = await getAudioBooksByUserId(user.id);
  createBooks(books);
  createAudioBooks(audio);
}

render();
