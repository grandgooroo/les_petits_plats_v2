import { DataService } from './DataService.js';
import { Recipe } from './Recipe.js';

export class DataManager {
    static async getRecipes(url) {
        const recipesData = await DataService.fetchJson(url);
        const recipes = {};
        recipesData.forEach(recipeData => {
            const recipe = new Recipe(recipeData);
            recipes[recipe.id] = recipe;
        });
        return recipes;
    }
}