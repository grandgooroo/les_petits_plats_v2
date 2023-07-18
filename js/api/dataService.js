import { Recipe } from './Recipe.js';

export class DataService {
    static async fetchJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    }
}

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
