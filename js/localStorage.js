class LocalStorageUtil {
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
      // alert("added to cart");
    } else {
      pokemons.splice(index, 1);
      // alert("removed from cart");
    }
    localStorage.setItem(this.keyName, JSON.stringify(pokemons));
  }
}

const localStorageUtil = new LocalStorageUtil();

document
  .querySelector(".pokemons__section")
  .addEventListener("click", function (e) {
    // let localId = e.target.id;
    localStorageUtil.putPokemons(e.target.id);
    // const icon = document.querySelector(".pokemons__section");
    // icon.style.backroundColor = "red";
  });
