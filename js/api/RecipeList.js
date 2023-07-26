// * Sert à stocker les résultats de recherche principale et ensuite appliquer des filtres(par tags) supplémentaires directement sur cette liste.
export class RecipeList {
    constructor(recipes) {
        this.recipes = recipes || {}; //* Tableau ou OBJ ?
    }

    addRecipe(recipe) {
        this.recipes[recipe.id] = recipe;
    }

    find(recipeId) {
        return this.recipes[recipeId];
    }

    getRecipes() {
        // console.log(this.recipes)
        return this.recipes;
    }

    get entries() {
        return Object.entries(this.recipes);
    }

    getUniqueTags(tagType) { // Récupère les tags et les "fusionnent" en supprimant les doublons
        let tags = [];
        console.log(this.recipes)
        for (let recipeId in this.recipes) {
            let recipeTags;
            switch(tagType) {
                case "ingredients":
                    recipeTags = this.recipes[recipeId].ingredients.map(ingredientObj => ingredientObj.ingredient);
                    break;
                case "appliance":
                    recipeTags = [this.recipes[recipeId].appliance];
                    break;
                case "ustensils":
                    recipeTags = this.recipes[recipeId].ustensils;
                    break;
                default:
                    return [];
            }
            tags = [...tags, ...recipeTags];
            // console.log(tags);
        }
        console.log([...new Set(tags)]);
        return [...new Set(tags)];
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

        return new RecipeList(results); // * Utiliser le résultat de ça pour filtrer !?
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