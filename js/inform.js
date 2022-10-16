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
  let main = document.querySelector(".main");
  let wrap = document.querySelector(".wrap");
  let main_inner = document.querySelector(".main_inner");
  main.style.display = "block";
  wrap.style.display = "none";
  const main__inner_div = document.createElement("div");
  const main__inner_images = document.createElement("div");
  const main__inner_name = document.createElement("div");
  const main__inner_order = document.createElement("div");
  const main__inner_weight = document.createElement("div");
  const main__inner_base_experience = document.createElement("div");
  const main__inner_img = document.createElement("img");
  const main__inner_back = document.createElement("img");
  const main__inner_back2 = document.createElement("img");
  const main__inner_back3 = document.createElement("img");
  main__inner_back.src = res.sprites.back_default;
  main__inner_img.src = res.sprites.front_default;
  main__inner_back2.src = res.sprites.back_shiny;
  main__inner_back3.src = res.sprites.front_shiny;
  main__inner_name.textContent = "Name : " + res.name.toUpperCase();
  main__inner_order.textContent = "Order : " + res.order;
  main__inner_weight.textContent = "Weight : " + res.weight;
  main__inner_base_experience.textContent =
    "Base experience : " + res.base_experience;
  main__inner_images.append(main__inner_img);
  main__inner_images.append(main__inner_back);
  main__inner_images.append(main__inner_back2);
  main__inner_images.append(main__inner_back3);
  main__inner_div.append(main__inner_name);
  main__inner_div.append(main__inner_order);
  main__inner_div.append(main__inner_weight);
  main__inner_div.append(main__inner_base_experience);
  main_inner.append(main__inner_images);
  main_inner.append(main__inner_div);
  document.querySelector(".main__back").addEventListener("click", function () {
    main.style.display = "none";
    wrap.style.display = "block";
  });
}
if (id > 0) {
  getPokemonInf();
}
