export class RecipeList {
    constructor(recipes) {
        this.recipes = recipes || [];
    }

    addRecipe(recipe) {
        this.recipes.push(recipe);
    }

    getRecipes() {
        return this.recipes;
    }
}