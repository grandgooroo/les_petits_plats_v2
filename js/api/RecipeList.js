// * Sert à stocker les résultats de recherche principale et ensuite appliquer des filtres(par tags) supplémentaires directement sur cette liste.
export class RecipeList {
    constructor(recipes) {
        this.recipes = recipes || [];
    }

    addRecipe(recipe) {
        this.recipes[recipe.id] = recipe;
    }

    getRecipesById() {
        return this.recipes;
    }

    getUniqueIngredients() {
        let ingredients = [];
        for (let recipeId in this.recipes) {
            let recipeIngredients = this.recipes[recipeId].ingredients.map(ingredientObj => ingredientObj.ingredient);
            ingredients = [...ingredients, ...recipeIngredients];
        }
        return [...new Set(ingredients)];
    }

    search(query) {
        const lowerCaseQuery = query.toLowerCase();
        const results = {};

        for (const [recipeId, recipe] of Object.entries(this.recipes)) {
            if (
                recipe.description.toLowerCase().includes(lowerCaseQuery) ||
                recipe.name.toLowerCase().includes(lowerCaseQuery)
            ) {
                results[recipeId] = recipe;
            }
        }

        return new RecipeList(results);
    }

    display(container) {
        container.innerHTML = '';
        for(let recipeId in this.recipes) {
            let recipeElement = this.recipes[recipeId].render();
            container.appendChild(recipeElement);
        }
    }

    clone() {
        return new RecipeList({...this.recipes});
    }
}