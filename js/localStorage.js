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
    } else {
      pokemons.splice(index, 1);
    }
    localStorage.setItem(this.keyName, JSON.stringify(pokemons));
  }
}
const localStorageUtil = new LocalStorageUtil();

document
  .querySelector(".pokemons__section")
  .addEventListener("click", function (e) {
    localStorageUtil.putPokemons(e.target.id);
    const icon = document.querySelectorAll(".postIcon");
    icon.forEach(item => {
      if (item.id == e.target.id) {
        item.classList.toggle("backColor");
      }
    });
  });
