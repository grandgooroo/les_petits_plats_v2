import { DataService } from '../api/dataService.js';
import { Recipe } from '../api/recipe.js';
import { RecipeCardRender } from '../api/recipeCardRender.js';
import { RecipeList } from '../api/recipe.js';
import { indexRecipes } from '../utils/indexation.js';

class receiptsData { 
    constructor() {
      // Initialisation des propriétés 
    this.jsonFile = "data/recipes.json";
    }

    async init() { 
        const dataService = new DataService(this.jsonFile);
        const recipesData = await dataService.fetchData(); // Transforme la reponse json en data et data et décomposé en variables photographers et media
        this.recipes = recipesData.map(recipeData => new Recipe(recipeData));

        // Indexation des recettes et stockage de l'index
        this.globalIndex = indexRecipes(this.recipes);
        // console.log(this.globalIndex)
        return this.recipes;
    }
}
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

