export class RecipeList {
    constructor(globalIndex) { // <-- Ajout de l'argument globalIndex
        this.recipes = [];
        this.globalIndex = globalIndex;
    }

    addRecipe(recipe) {
        this.recipes.push(recipe);
    }

    findRecipesByKeyword(keyword) {
        return this.recipes.filter(recipe => recipe.containsKeyword(keyword));
    }

    findRecipesByIngredient(ingredient) {
        return this.recipes.filter(recipe => recipe.containsIngredient(ingredient));
    }

    // Ajouter Méthode pour trier les recettes par appareil
    findRecipesByAppliance(appliance) {
        return this.recipes.filter(recipe => recipe.appliance === appliance);
    }

    // Penser à jouter Méthode pour trier les recettes par temps de préparation
    // search(query) {
    //     // Utilisez this.globalIndex pour obtenir les recettes (recherche principale)
    //     let matchingRecipes = this.globalIndex[query];

    //     // Si matchingRecipes est défini, renvoyez le resultat
    //     if (matchingRecipes) {
    //         return matchingRecipes;
    //     }

    //     // Sinon, effectue une recherche normale
        
    //     return this.recipes.filter(recipe => 
    //         recipe.name.toLowerCase().includes(query.toLowerCase()) || 
    //         recipe.description.toLowerCase().includes(query.toLowerCase()) || 
    //         recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()))
    //     );
    // }

    // search(query) {
    //     // Divise la requête en mots individuels
    //     const keywords = query.toLowerCase().split(' ');
    
    //     // Pour chaque mot, effectuez une recherche
    //     const matchingRecipesLists = keywords.map(keyword => this.globalIndex[keyword] || []); // Si la requette n'est pas trouvé alors retourne un tableau vide(valeur par defaut).
    
    //     // Trouvez les recettes qui apparaissent dans chaque liste de recettes correspondantes
    //     const matchingRecipes = matchingRecipesLists.reduce((acc, curr) => acc.filter(recipe => curr.includes(recipe)));
    
    //     // Si matchingRecipes est résolu, renvoyez le resultat
    //     if (matchingRecipes.length > 0) {
    //         return matchingRecipes;
    //     }
    
    //     // Sinon, effectue une recherche normale
    //     return this.recipes.filter(recipe => 
    //         recipe.name.toLowerCase().includes(query.toLowerCase()) || 
    //         recipe.description.toLowerCase().includes(query.toLowerCase()) || 
    //         recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()))
    //     );
    // }

    search(query) {
        // Divise la requête en mots individuels
        const keywords = query.toLowerCase().split(' ');
    
        // Pour chaque mot, effectuez une recherche
        const matchingRecipesLists = keywords.map(keyword => this.globalIndex[keyword] || []); // Si la requette n'est pas trouvé alors retourne un tableau vide(valeur par defaut).
    
        // Trouvez les recettes qui apparaissent dans chaque liste de recettes correspondantes
        const matchingRecipes = matchingRecipesLists.reduce((acc, curr) => acc.filter(recipe => curr.includes(recipe)));
    
        // Si matchingRecipes est résolu, renvoyez le resultat
        if (matchingRecipes.length > 0) {
            return matchingRecipes;
        }
    
        // Sinon, effectue une recherche normale
        return this.recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query.toLowerCase()) || 
            recipe.description.toLowerCase().includes(query.toLowerCase()) || 
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()))
        );
    }

    // searchPonderation() {
    //     let scores = {};

    //     keywords.forEach(keyword => {
    //         let matchingRecipes = this.globalIndex[keyword] || [];
    //         matchingRecipes.forEach(recipe => {
    //             if (!scores[recipe.id]) {
    //                 scores[recipe.id] = 0;
    //             }
    //             scores[recipe.id]++;
    //         });
    //     });
        
    //     let results = Object.keys(scores)
    //         .map(id => this.recipes.find(recipe => recipe.id == id))  // Récupérer la recette correspondante
    //         .sort((a, b) => scores[b.id] - scores[a.id]);  // Tri décroissant par score
        
    //     return results;
    // }
}