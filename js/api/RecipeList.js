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

    // Méthodes pour manipuler les recettes
    // Si l'utilisateur selectionne un ingrédient dans la liste alors filter avec les méthodes suivante
    filterRecipesByIngredient(ingredient) {
        const filteredRecipes = this.recipes.filter(recipe => recipe.hasIngredient(ingredient));
        return new RecipeList(filteredRecipes);
    }

    findRecipesByKeyword(keyword) { // "contientMotClé" Pour rechercher des mots clés dans la description de la recette.
        return this.description.includes(keyword);
    }

    // Ajouter Méthode pour trier les recettes par appareil
    findRecipesByAppliance(appliance) {
        return this.recipes.filter(recipe => recipe.appliance === appliance);
    }
}