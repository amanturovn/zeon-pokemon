let id = location.search.substring(1);
// document
//   .querySelector(".pokemons__section")
//   .addEventListener("click", function () {
//     // e.preventDefault();

//     getPokemonInf();
//   });
// console.log(asd);
const API2 =
  "https://pokeapi.co/api/v2/pokemon/" + location.search.substring(1);
async function getPokemonInf() {
  let res = await fetch(API2)
    .then(res => res.json())
    .catch(err => console.log(err));
  console.log(res);
  let main_inner = document.querySelector(".main_inner");
  let main = document.querySelector(".main");
  main_inner.style.display = "block";
  main.style.display = "none";

  document.querySelector(".main__back").addEventListener("click", function () {
    main_inner.style.display = "none";
    main.style.display = "block";
  });
}
if (id > 0) {
  getPokemonInf();
}
