import { getUser } from "../script/api.js";
import { getAllGenres } from "../script/api.js";

let bookGenres = document.getElementById("bookGenres");
let addBookBtn = document.getElementById("addBookBtn");



const addBook = async () => {
  let title = document.getElementById("bookTitle").value;
  let author = document.getElementById("bookAuthor").value;
  let pages = document.getElementById("bookPagesAmount").value;
  let rating = document.getElementById("bookRating").value;
  let genres = select.options[select.selectedIndex].value;
  let user = JSON.parse(localStorage.getItem("loginData")).user.id;
  //picture:
  let cover = document.getElementById("bookCover").files;
  let imgData = new FormData();
  imgData.append("files", cover[0]);
if(title.length  === 0 || author.length=== 0 || pages.length < 1|| genres === 0 || rating.length === 0 || cover === undefined){
	alert('Please fill the all fields!');
	return true;
	}
  else{
  await axios
    .post("http://localhost:1337/api/upload", imgData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginData")).jwt}`,
      },
    })
    .then((response) => {
      let imageId = response.data[0].id;
      axios.post(
        "http://localhost:1337/api/books",
        {
          data: {
            title: title,
            author: author,
            numPages: pages,
            rating: rating,
            cover: imageId,
            genres: genres,
            userId: user,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginData")).jwt}`,
          },
        }
      );
    });
	return false;
	
	}
};

addBookBtn.addEventListener("click", async () => {
  let resultBook = await addBook();
  if(resultBook === false){
    window.location.href = "profile.html";
  }
});

let select;

function showGenres(genres) {
  select = document.createElement("select");
  select.innerHTML += '<option value="null" disabled selected>Choose a genre</option>';
  genres.forEach((genre) => {
    select.innerHTML += `
 	<option value="${genre.id}">${genre.attributes.name}</option>
`;
    bookGenres.appendChild(select);
  });
}

async function data() {
  showGenres(await getAllGenres());
}

data();
getUser();
