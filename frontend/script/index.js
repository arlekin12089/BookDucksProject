let booksList = document.getElementById("books");
let audiobooksList = document.getElementById("audiobooks");

let getAllBooks = async () => {
  let { data } = await axios.get("http://localhost:1337/api/books?populate=*");
  showBooks(data.data);
};

let getAllAudioBooks = async () => {
  let { data } = await axios.get("http://localhost:1337/api/audio-books?populate=*");
  showAudioBooks(data.data);
};

let getUserById = async (userId) => {
  let response = await axios.get(`http://localhost:1337/api/users/${userId}`);
  let { email, username } = response.data;
  return {
    username: username,
    email: email,
  };
};

async function showBooks(books) {
  books.forEach(async (book) => {
    let { title, author, numPages, rating, cover, userId, genres } = book.attributes;
    let url;
    if (cover.data === null) {
      url = "/uploads/default_cover.png";
    } else {
      url = cover.data.attributes.url;
    }
    let li = document.createElement("li");
    let genre = "";
    genres.data.forEach((item, index) => {
      if (index === genres.data.length - 1) {
        genre += item.attributes.name;
      } else {
        genre += item.attributes.name + ",  ";
      }
    });
    let user = await getUserById(userId);

    li.innerHTML = `
		<div class="book__cover">
			<img src="http://localhost:1337${url}">
		</div>
		<div class="book__info">
			<h3>${title}</h3>
			<p><span>Author</span>: ${author}</p>
			<p><span>Number of pages</span>: ${numPages}</p>
			<p><span>Rating</span> ${rating} of 10</p>
			<p><span>Genre</span>: ${genre}</p>
			<p>Given By <b>${user.username}</b> (<a href="${user.email}">${user.email}</a> )</p>
		</div>
	`;
    booksList.appendChild(li);
  });
}

async function showAudioBooks(audio) {
  audio.forEach(async (audio) => {
    let { title, author, rating, cover, duration, releaseDate, userId, genres } = audio.attributes;
    let li = document.createElement("li");
    let url;
    if (cover.data === null) {
      url = "frontend/img/default_cover.png";
    } else {
      url = cover.data.attributes.url;
    }
    let user = await getUserById(userId);
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
			<p><span>Author</span>: ${author}</p>
			<p><span>Duration</span>: ${duration}</p>
			<p><span>Release date</span>: ${releaseDate}</p>
			<p><span>Rating</span> ${rating} of 10</p>
			<p><span>Genre</span>: ${genre}</p>
			<p>Given By <b>${user.username}</b> (<a href="${user.email}">${user.email}</a> )</p>
		</div>
	`;
    audiobooksList.appendChild(li);
  });
}
getAllBooks();
getAllAudioBooks();
