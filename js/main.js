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
  console.log(searchString);
  const filterCgaracters = responsApi.filter(character => {
    return character.name.toLowerCase().includes(searchString);
  });
  displayCharacters(filterCgaracters);
});
async function loadCharactersPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
    let hpCharac = await res.json();
    responsApi = hpCharac.results;
    // loadPok(responsApi);
    displayCharacters(responsApi);
  } catch (err) {
    console.error(err);
  }
}
loadCharactersPokemons();
// function loadPok(responsApi) {
//   responsApi.forEach(element => {
//     async function loadCharacters() {
//       try {
//         const resApi = await fetch(element.url);
//         let hpCharacters = await resApi.json();
//         // console.log(hpCharacters);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     loadCharacters();
//   });
// }

// jkghj==========================================
// function displayCharacters(character) {
//   console.log(character);
//   const postDiv = character
//     .map((character, index) => {
//       // console.log(index);
//       return `<a  href="${"?" + (index + 1)}"><li><div>${character.name}</div>
//       <div>${index + 1}</div>
//       <img class="pokemon-img" src="./css/img/pokemon.jpg" /></li></a>
//       `;
//     })
//     .join("");
//   postsEl.innerHTML = postDiv;
// }
// hjkl==================================================
function displayCharacters(character) {
  character.forEach(element => {
    async function loadCharacters() {
      let res = await fetch(element.url)
        .then(res => res.json())
        .catch(err => console.log(err));
      // console.log(res);
      const postMain = document.createElement("div");
      const postLi = document.createElement("li");
      const postA = document.createElement("a");
      postA.href = "?" + res.id;
      const postImg = document.createElement("img");
      postImg.src = res.sprites.front_default;
      const postDiv = document.createElement("div");
      postDiv.textContent = res.name;
      postLi.appendChild(postImg);
      postLi.appendChild(postDiv);
      postA.appendChild(postLi);
      postMain.appendChild(postA);
      postsEl.appendChild(postMain);
    }
    loadCharacters();
  });

  // console.log(character);
  // const postDiv = character
  //   .map((character, index) => {
  //     // console.log(index);
  //     return `<a  href="${"?" + (index + 1)}"><li><div>${character.name}</div>
  //     <div>${index + 1}</div>
  //     <img class="pokemon-img" src="./css/img/pokemon.jpg" /></li></a>
  //     `;
  //   })
  //   .join("");
  // postsEl.innerHTML = postDiv;
}
