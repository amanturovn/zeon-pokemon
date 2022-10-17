const favorites_card = document.querySelector(".main__favorites_card");
const API_F = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0";
async function getValueSelect() {
  let response = await fetch(API_F)
    .then(res => res.json())
    .catch(err => console.log(err));
  let result = response.results;
  function getFavorites(result) {
    let pokemonsLocalStorage = localStorage.getItem("pokemons");
    let a = (pokemonsLocalStorage = JSON.parse(pokemonsLocalStorage));
    console.log(a);
    let asd = [];
    a.forEach(item => {
      asd.push(+item - 1);
    });
    console.log(asd);
    const temp = JSON.parse(JSON.stringify(result));
    temp.forEach((element, id) => {
      if (asd.indexOf(id) !== -1) {
        const favorites_about = document.createElement("div");
        favorites_about.classList.add("favorites_about");
        const favorites_name = document.createElement("div");
        const favorites_link = document.createElement("a");
        const postIcon = document.createElement("img");
        postIcon.style.width = "30px";
        postIcon.style.height = "30px";
        postIcon.classList.add("postIcon");
        postIcon.src = "./css/img/bookmark.png";
        postIcon.id = id + 1;
        favorites_name.textContent = element.name.toUpperCase();
        favorites_link.href = element.url;
        favorites_link.textContent = element.url;
        favorites_about.append(favorites_link);
        favorites_about.append(favorites_name);
        favorites_about.append(favorites_link);
        favorites_about.append(postIcon);
        favorites_card.append(favorites_about);
      }
    });
    let favoriteEmpty = document.createElement("div");
    if (a.length == 0) {
      favorites_card.innerHTML = "";
      favoriteEmpty.textContent = "YOUR CART IS EMPTY";
      favorites_card.append(favoriteEmpty);
    }
  }

  getFavorites(result);
}
let main__favorites = document.querySelector(".main__favorites");
let wrap = document.querySelector(".wrap");
document.querySelector(".fovarites").addEventListener("click", function () {
  favorites_card.innerHTML = "";
  main__favorites.style.display = "block";
  wrap.style.display = "none";
  getValueSelect();
});
document.querySelector(".favorite__bnt").addEventListener("click", function () {
  main__favorites.style.display = "none";
  wrap.style.display = "block";
});

class LocalStorageFavorites {
  constructor() {
    this.keyName = "pokemons";
  }

  getPokemons() {
    const pokemonsLocalStorage = localStorage.getItem(this.keyName);
    if (pokemonsLocalStorage !== null) {
      return JSON.parse(pokemonsLocalStorage);
    }
    return [];
  }

  putPokemons(id) {
    let pokemons = this.getPokemons();
    let pushPokempns = false;
    const index = pokemons.indexOf(id);
    if (index === -1) {
      pokemons.push(id);
      pushPokempns = true;
    } else {
      pokemons.splice(index, 1);
    }
    localStorage.setItem(this.keyName, JSON.stringify(pokemons));
  }
}
const localStorageA = new LocalStorageFavorites();

document
  .querySelector(".main__favorites_card")
  .addEventListener("click", function (e) {
    localStorageA.putPokemons(e.target.id);
    favorites_card.innerHTML = "";
    getValueSelect();
    const icon = document.querySelectorAll(".postIcon");
    icon.forEach(item => {
      if (item.id == e.target.id) {
        item.classList.remove("backColor");
      }
    });
  });
