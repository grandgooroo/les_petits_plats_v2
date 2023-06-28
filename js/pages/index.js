import { receiptsData } from '../api/ReceiptsData.js';
import { Recipe } from '../api/Recipe.js';
// import { RecipeCardRender } from '../api/RecipeCardRender.js';
import { RecipeList } from '../api/RecipeList.js';

const recipesService = new receiptsData();

recipesService.init().then((recipes) => {
    // Affichage des recettes
    const cardsContainer = document.querySelector('.cards-container');

    recipes.forEach(recipe => {
        const recipeInstance = new Recipe(recipe);
        cardsContainer.append(recipeInstance.render());  // Ajoute les cartes à l'élement parent du DOM
    });

}).catch((error) => {
    console.log(error)
})

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

