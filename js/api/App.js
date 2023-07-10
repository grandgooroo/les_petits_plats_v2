import { DataManager } from './DataManager.js';
import { RecipeList } from '../api/RecipeList.js';
import { indexRecipes } from '../utils/indexation.js';
import { DropdownMenu } from '../utils/DropdownMenu.js';

const dataUrl = 'data/recipes.json';
// Gére l'interaction l'utilisateur avec l'interface.

export class App {
    constructor() {
            DataManager.getRecipes(dataUrl)
                .then(this.onRecipesLoaded.bind(this));
        }

    onRecipesLoaded(recipes) {

        this.allRecipes = new RecipeList(recipes);
        this.globalIndex = indexRecipes(Object.values(recipes));
        this.displayedRecipes = this.allRecipes.clone();
        this.searchResults = this.allRecipes.clone();

        const tags = this.allRecipes.getUniqueIngredients();
        this.dropdownMenu = new DropdownMenu(tags, '.main-index__sort-inputs-container');

        document.getElementById('main-index__search-input').addEventListener('input', this.onInputSearch.bind(this));

        this.refreshRecipeDisplay();
    }

    onInputSearch(event) {
        const query = event.target.value;
        this.searchResults = this.search(query);
        this.displayedRecipes = this.searchResults.clone();
        this.refreshRecipeDisplay();
    };

    search(query) {
        return this.allRecipes.search(query);
    }

    refreshRecipeDisplay() {
        const container = document.querySelector('.cards-container');
        this.displayedRecipes.display(container);
    }

    filterRecipesByIngredient(ingredient) {
        this.displayedRecipes = Object.values(this.allRecipes.getRecipes()).filter(recipe => recipe.containsIngredient(ingredient));
        this.refreshRecipeDisplay();
    }

    findRecipesByKeyword(keyword) {
        return this.allRecipes.findRecipesByKeyword(keyword);
    }
}

