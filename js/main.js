const postsEl = document.querySelector(".pokemons__section");
let input = document.querySelector(".input");
let sort__up = document.querySelector(".sort__up");
let sort__down = document.querySelector(".sort__down");
let sort__next = document.querySelector(".sort__next");
let sort__prev = document.querySelector(".sort__prev");
let loader = document.querySelector(".pre-loader");
let pageValue = 1;
let offset;
let responsApi = [];
sort__next.addEventListener("click", function () {
  loadCharactersNext(responsApi);
});
sort__prev.addEventListener("click", function () {
  loadCharactersPrev(responsApi);
});
async function loadCharactersNext() {
  postsEl.innerHTML = "";
  ++pageValue;
  offset = pageValue * 42 - 42;
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=42 "
    );
    let hpCharac = await res.json();
    responsApi = hpCharac.results;
    console.log(responsApi);
    displayCharacters(responsApi);
  } catch (err) {
    console.error(err);
  }
}
async function loadCharactersPrev() {
  postsEl.innerHTML = "";
  --pageValue;
  offset = pageValue * 42 - 42;
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=42"
    );
    let hpCharac = await res.json();
    responsApi = hpCharac.results;
    displayCharacters(responsApi);
  } catch (err) {
    console.error(err);
  }
}
sort__up.addEventListener("click", function () {
  postsEl.innerHTML = "";
  const sortA = responsApi.sort((a, b) => a.name.localeCompare(b.name));
  displayCharacters(sortA);
});
sort__down.addEventListener("click", function () {
  postsEl.innerHTML = "";
  const sortZ = responsApi.sort((a, b) => b.name.localeCompare(a.name));
  displayCharacters(sortZ);
});
input.addEventListener("keyup", e => {
  postsEl.innerHTML = "";
  const searchString = e.target.value.toLowerCase();
  const filterCgaracters = responsApi.filter(character => {
    return character.name.toLowerCase().includes(searchString);
  });
  if (filterCgaracters.length === 0) {
    postsEl.innerHTML = "Not found ...";
    sort__next.classList.add("hide");
    sort__prev.classList.add("hide");
  } else {
    sort__next.classList.remove("hide");
    sort__prev.classList.remove("hide");
  }
  displayCharacters(filterCgaracters);
  loader.style.display = "none";
});

async function loadCharactersPokemons() {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=42&offset=0"
    );

    let hpCharac = await res.json();
    responsApi = hpCharac.results;
    displayCharacters(responsApi);
    loader.style.display = "none";
  } catch (err) {
    console.error(err);
    postsEl.innerHTML = err;
    loader.style.display = "none";
  }
}
loadCharactersPokemons();

function displayCharacters(character) {
  character.forEach(element => {
    async function loadCharacters() {
      let res = await fetch(element.url)
        .then(res => res.json())
        .catch(err => console.log(err));

      const postMain = document.createElement("div");
      postMain.classList.add("main__post");
      const postLi = document.createElement("li");
      postLi.classList.add("post__list");
      const postA = document.createElement("a");
      postA.classList.add("post__link");
      postA.href = "?" + res.id;
      const postIcon = document.createElement("div");
      postIcon.style.width = "26px";
      postIcon.style.height = "26px";
      postIcon.style.border = "1px solid black";
      postIcon.style.borderRadius = "50%";
      postIcon.classList.add("postIcon");
      postIcon.id = res.id;
      const postImg = document.createElement("img");
      postImg.src = res.sprites.front_shiny;
      const postDiv = document.createElement("div");
      postDiv.textContent = res.name.toUpperCase();
      postLi.appendChild(postImg);
      postLi.appendChild(postDiv);
      postA.appendChild(postLi);
      postMain.appendChild(postA);
      postMain.appendChild(postIcon);
      postsEl.appendChild(postMain);
    }
    loadCharacters();
  });
}
