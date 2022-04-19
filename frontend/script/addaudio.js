import { getUser } from "../script/api.js";
import { getAllGenres } from "../script/api.js";

let audioGenres = document.getElementById("audioGenres");
let addAudioBtn = document.getElementById("addAudioBtn");

const addAudioBook = async () => {
  let title = document.getElementById("audioTitle").value;
  let author = document.getElementById("audioAuthor").value;
  let duration = document.getElementById("audioDuration").value;
  let releaseDate = document.getElementById("audioRelease").value;
  let rating = document.getElementById("audioRating").value;
  let genres = select.options[select.selectedIndex].value;
  let user = JSON.parse(localStorage.getItem("loginData")).user.id;
  //picture:
  let cover = document.getElementById("audioCover").files;
  let imgData = new FormData();
  imgData.append("files", cover[0]);

	if(title.length  === 0 || author.length=== 0 || duration ===null || genres === 0 || rating.length === 0 || cover === undefined){
	alert('Please fill the all fields!');
	return true;
	} else {
	await axios
    .post("http://localhost:1337/api/upload", imgData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginData")).jwt}`,
      },
    })
    .then((response) => {
      let imageId = response.data[0].id;
      console.log(response);
      axios.post(
        "http://localhost:1337/api/audio-books",
        {
          data: {
            title: title,
            author: author,
            duration: duration,
            releaseDate: releaseDate,
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
let addAudioBookForm = document.querySelector(".addAudioBookForm");
addAudioBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

addAudioBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let resultAudio = await addAudioBook();
  if(resultAudio === false){
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
    audioGenres.appendChild(select);
  });
}

async function data() {
  showGenres(await getAllGenres());
}

data();
getUser();
