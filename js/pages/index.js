import { receiptsData } from '../api/ReceiptsData.js';
import { RecipeCardRender } from '../api/RecipeCardRender.js';
import { RecipeList } from '../api/RecipeList.js';



const recipesService = new receiptsData();
console.log(recipesService)

recipesService.init().then((recipes) => {
    // console.table(recipes)
    // Affichage des recettes
    const recipeCardRender = new RecipeCardRender();
    recipeCardRender.render(recipes);
}).catch((error) => {
    console.log(error)
})

// function globalSarch() {
//     const searchInput = document.getElementById('main-index__search-input');
//     searchInput.addEventListener(oninput)
// };

// Ajout écouteur d'événement sur la champ de recherche principal
document.getElementById('main-index__search-input').oninput = function() {
    let recipeList = new RecipeList(recipesService.globalIndex);
    console.log(recipeList)
    const query = this.value;
    console.log(query)
    // const results = recipeList.search(query);
    const results = recipeList.search(query);
    console.log(results)
    // ...rafraîchir l'affichage des recettes avec les résultats...
};

