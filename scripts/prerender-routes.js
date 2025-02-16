const TOTAL_PAGES = 5;
const TOTAL_POKEMON = 151;

(async () => {
  const fs = require("fs");
  const pokemonIds = Array.from({ length: TOTAL_POKEMON }, (_, i) => i + 1);
  const pageIds = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  const pagesFileContent = pageIds.map((page) => `/pokedex/page/${page}`);
  const pokemonFileContent = pokemonIds.map((id) => `/pokemon/${id}`);
  let fileContent = [...pagesFileContent, ...pokemonFileContent].join("\n");

  const pokemonNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`
  ).then((res) => res.json());

  fileContent += "\n";
  fileContent += pokemonNameList.results
    .map((pokemon) => `/pokemon/${pokemon.name}`)
    .join("\n");

  fs.writeFileSync("routes.txt", fileContent, "utf8");

  console.log("routes.txt Generated!");
})();
