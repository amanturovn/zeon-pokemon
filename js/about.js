const postsEl = document.querySelector(".pokemons__section");
let input = document.querySelector(".input");
let sort__up = document.querySelector(".sort__up");
let sort__down = document.querySelector(".sort__down");
let sort__next = document.querySelector(".sort__next");
let sort__prev = document.querySelector(".sort__prev");
let responsApi = [];
// console.log(responsApi);
sort__next.addEventListener("click", function () {
  loadCharactersNext(responsApi);
});
sort__prev.addEventListener("click", function () {
  loadCharactersPrev(responsApi);
});
async function loadCharactersNext() {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/ability/?limit=20&offset=20"
    );
    let hpCharac = await res.json();
    responsApi = hpCharac.results;
    // loadPok(responsApi);
    // loadCharactersPokemons();
    displayCharacters(responsApi);
  } catch (err) {
    console.error(err);
  }
}
async function loadCharactersPrev() {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
    );
    let hpCharac = await res.json();
    responsApi = hpCharac.results;
    // loadPok(responsApi);
    // loadCharactersPokemons();
    displayCharacters(responsApi);
  } catch (err) {
    console.error(err);
  }
}
sort__up.addEventListener("click", function () {
  postsEl.innerHTML = "";
  const sortA = responsApi.sort((a, b) => a.name.localeCompare(b.name));
  console.log(sortA);
  displayCharacters(sortA);
});
sort__down.addEventListener("click", function () {
  postsEl.innerHTML = "";
  const sortZ = responsApi.sort((a, b) => b.name.localeCompare(a.name));
  console.log(sortZ);
  displayCharacters(sortZ);
});
input.addEventListener("keyup", e => {
  postsEl.innerHTML = "";
  const searchString = e.target.value.toLowerCase();
  const filterCgaracters = responsApi.filter(character => {
    return character.name.toLowerCase().includes(searchString);
  });
  // console.log(filterCgaracters);
  displayCharacters(filterCgaracters);
  displayPagination(filterCgaracters);
});
async function loadCharactersPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
    let hpCharac = await res.json();
    responsApi = hpCharac.results;
    // loadPok(responsApi);
    displayCharacters(responsApi);
    displayPagination(responsApi);
  } catch (err) {
    console.error(err);
  }
}
loadCharactersPokemons();

let currentPage = 1;
let rows = 7;
function displayCharacters(arrData, rowPerPage, page) {
  const postsEl = document.querySelector(".main__ul");
  // console.log(arrData);
  // postsEl.innerHTML = "";
  page--;
  const start = rowPerPage * page;
  const end = start + rowPerPage;
  const paginatedData = arrData.slice(start, end);

  console.log(page);
  paginatedData.forEach(element => {
    async function getData() {
      // e.preventDefault();
      let res = await fetch(element.url)
        .then(res => res.json())
        .catch(err => console.log(err));
      // console.log(element);
      const main__basic_div = document.createElement("div");
      main__basic_div.classList.add("postLi");
      const postLi = document.createElement("li");
      const postEl = document.createElement("div");
      postEl.innerText = `${res.name}`;
      postEl.classList.add("post");
      const postImg = document.createElement("img");
      postImg.src = res.sprites.front_default;
      const main__link = document.createElement("a");
      main__link.href = "?" + res.id;
      const postImgIcon = document.createElement("img");
      postImgIcon.src = "./img/bookmark.png";
      postImgIcon.style.width = "24px";
      postLi.appendChild(postImg);
      main__basic_div.appendChild(postEl);
      main__link.appendChild(postLi);
      main__basic_div.appendChild(postImgIcon);
      main__basic_div.append(main__link);
      postsEl.appendChild(main__basic_div);
    }
    getData();
    // sotrPokemons(paginatedData);
  });
}

function displayPagination(arrData, rowPerPage) {
  const paginationEl = document.querySelector(".pagination");
  const pagesCount = Math.ceil(arrData.length / rowPerPage);
  const ulEl = document.createElement("ul");
  // console.log(arrData);
  for (let i = 0; i < pagesCount; i++) {
    const liEl = displayPaginationBtn(i + 1);
    ulEl.appendChild(liEl);
  }
  paginationEl.appendChild(ulEl);
}

function displayPaginationBtn(page) {
  const liEl = document.createElement("li");
  liEl.classList.add("pagination__li");
  liEl.innerText = page;

  liEl.addEventListener("click", () => {
    currentPage = page;
    displayCharacters(postsData, rows, currentPage);
  });

  return liEl;
}

displayCharacters(responsApi, rows, currentPage);
displayPagination(responsApi, rows);
