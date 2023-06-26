import { DataService } from '../api/DataService.js';
import { Recipe } from '../api/Recipe.js';
import { indexRecipes } from '../utils/Indexation.js';

export class receiptsData { 
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