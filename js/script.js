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
  postsEl.innerHTML = "";
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
  postsEl.innerHTML = "";
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
  // var count = filterCgaracters.length; //всего записей
  // var cnt = 9; //сколько отображаем сначала
  // var cnt_page = Math.ceil(count / cnt); //кол-во страниц
  // //выводим список страниц
  // var paginator = document.querySelector(".pagination");
  // var page = "";
  // for (var i = 0; i < cnt_page; i++) {
  //   page +=
  //     "<span data-page=" +
  //     i * cnt +
  //     '  id="page' +
  //     (i + 1) +
  //     '">' +
  //     (i + 1) +
  //     "</span>";
  // }
  // paginator.innerHTML = page;

  // let div_page = document.querySelector(".pokemons__section");
  // div_page.innerHTML = "";
  // for (let i = 0; i < filterCgaracters.length; i++) {
  //   if (i < cnt) {
  //     let div_num = document.createElement("div");
  //     div_num.textContent += filterCgaracters[i].name;
  //     // div_page.append(div_num);
  //   }
  // }

  displayCharacters(filterCgaracters);
});
async function loadCharactersPokemons() {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
    );
    let hpCharac = await res.json();
    responsApi = hpCharac.results;
    // loadPok(responsApi);
    displayCharacters(responsApi);
  } catch (err) {
    console.error(err);
  }
}
loadCharactersPokemons();

function displayCharacters(character) {
  // console.log(character);
  var count = character.length; //всего записей
  var cnt = 40; //сколько отображаем сначала
  var cnt_page = Math.ceil(count / cnt); //кол-во страниц
  //выводим список страниц
  var paginator = document.querySelector(".pagination");
  var page = "";
  for (var i = 0; i < cnt_page; i++) {
    page +=
      "<span data-page=" +
      i * cnt +
      '  id="page' +
      (i + 1) +
      '">' +
      (i + 1) +
      "</span>";
  }
  paginator.innerHTML = page;

  let div_page = document.querySelector(".pokemons__section");
  // div_page.innerHTML = "";
  // let newArray = [];
  // character.forEach(element => {
  //   async function loadCharacters() {
  //     let res = await fetch(element.url)
  //       .then(res => res.json())
  //       .catch(err => console.log(err));
  // console.log(res);
  // newArray.push(res);
  // const postMain = document.createElement("div");
  // const postLi = document.createElement("li");
  // const postA = document.createElement("a");
  // postA.href = "?" + res.id;
  // const postImg = document.createElement("img");
  // postImg.src = res.sprites.front_default;
  // const postDiv = document.createElement("div");
  // postDiv.textContent = res.name;
  // postLi.appendChild(postImg);
  // postLi.appendChild(postDiv);
  // postA.appendChild(postLi);
  // postMain.appendChild(postA);
  // postsEl.appendChild(postMain);
  // }
  // loadCharacters();
  // });
  // newArray.forEach(item => {
  //   console.log(item.name);
  // });
  // console.log(res);
  //! ========================
  for (let i = 0; i < 1000; i++) {
    // console.log(character.id);
    if (i < cnt) {
      let div_a = document.createElement("a");
      div_a.href = "?" + (i + 1);
      let div_li = document.createElement("li");
      let div_img = document.createElement("img");
      // div_img.src = "./css/img/pokemon.jpg";
      div_img.src = "./css/img/pokemon.jpg";
      div_img.style.width = "150px";
      let div_icon = document.createElement("img");
      div_icon.src = "./css/img/bookmark.png";
      div_icon.style.width = "40px";
      let div_name = document.createElement("div");
      div_name.textContent = character[i].name;
      // div_li.
      div_a.append(div_img);
      div_a.append(div_name);
      div_li.append(div_a);
      div_li.append(div_icon);
      div_page.append(div_li);
      //!===========================
      // console.log(character);
      // character.forEach(element => {
      //   async function loadCharacters() {
      //     let res = await fetch(element.url)
      //       .then(res => res.json())
      //       .catch(err => console.log(err));
      //     console.log(res);
      //     const postMain = document.createElement("div");
      //     const postLi = document.createElement("li");
      //     const postA = document.createElement("a");
      //     postA.href = "?" + res.id;
      //     const postImg = document.createElement("img");
      //     postImg.src = res.sprites.front_default;
      //     const postDiv = document.createElement("div");
      //     postDiv.textContent = res.name;
      //     postLi.appendChild(postImg);
      //     postLi.appendChild(postDiv);
      //     postA.appendChild(postLi);
      //     postMain.appendChild(postA);
      //     postsEl.appendChild(postMain);
      //   }
      //   loadCharacters();
      // });
    }
  }
  // character.forEach(element => {
  //   async function loadCharacters() {
  //     let res = await fetch(element.url)
  //       .then(res => res.json())
  //       .catch(err => console.log(err));
  // console.log(res);
  // const postMain = document.createElement("div");
  // const postLi = document.createElement("li");
  // const postA = document.createElement("a");
  // postA.href = "?" + res.id;
  // const postImg = document.createElement("img");
  // postImg.src = res.sprites.front_default;
  // const postDiv = document.createElement("div");
  // postDiv.textContent = res.name;
  // postLi.appendChild(postImg);
  // postLi.appendChild(postDiv);
  // postA.appendChild(postLi);
  // postMain.appendChild(postA);
  // postsEl.appendChild(postMain);
  //   }
  //   loadCharacters();
  // });
}
