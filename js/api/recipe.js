export class Recipe {
    constructor(recipeData) {
        // console.log(`Creating a recipe with data:`, recipeData);
        Object.assign(this, recipeData); // Remplace la déclaration "this.X"
        // console.log(`Created recipe with ID:`, this.id);
        this.cardElement = document.createElement("article");
    }

    render() {
        this.cardElement.innerHTML = `
        <div class="card">
            <h2>${this.name}</h2>
            <h3>Déscription</h3>
                <p>${this.description}</p>
            <h3>Ingrédients:</h3>
            <p>
            ${this.ingredients.map(ingredient => `${ingredient.ingredient}`).join(', ')}
            </p>
        </div>
            `;
            return this.cardElement;
    }

    // Méthodes pour manipuler les recettes
    containsIngredient(ingredientName) { // "contientIngredient" Pour rechercher des recettes en fonction des ingrédients doublons avec this.ingredients (ingredientData)
        return this.ingredients.some(ingredient => ingredient.name === ingredientName);
    }

    containsKeyword(keyword) { // "contientMotClé" Pour rechercher des mots clés dans la description de la recette.
        return this.description.includes(keyword);
    }
}



