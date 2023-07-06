// * Sert à stocker les résultats de recherche principale et ensuite appliquer des filtres(par tags) supplémentaires directement sur cette liste.
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