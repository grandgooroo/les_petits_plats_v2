import { Ingredient } from '../api/Ingredient.js';

export class Recipe {
    constructor(recipeData) {
        this.id = recipeData.id;
        this.image = recipeData.image;
        this.name = recipeData.name;
        this.servings = recipeData.servings; // Portion

        this.ingredients = recipeData.ingredients.map(ingredientData => // Nouvelle instance de la class Ingredient pour créer un tableau (d'objets) des ingredients
            new Ingredient(ingredientData.ingredient, ingredientData.quantity, ingredientData.unit)
        );

        this.time = recipeData.time;
        this.description = recipeData.description;
        this.appliance = recipeData.appliance; // Electroménager
        this.ustensils = recipeData.ustensils;
    }

    // Méthodes pour manipuler les recettes
    containsIngredient(ingredientName) { // "contientIngredient" Pour rechercher des recettes en fonction des ingrédients doublons avec this.ingredients (ingredientData)
        return this.ingredients.some(ingredient => ingredient.name === ingredientName);
    }

    containsKeyword(keyword) { // "contientMotClé" Pour rechercher des mots clés dans la description de la recette.
        return this.description.includes(keyword);
    }
}



