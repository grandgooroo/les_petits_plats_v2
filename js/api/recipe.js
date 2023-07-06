import { MEDIA_FOLDER } from '../utils/MediaPath.js';

export class Recipe {
    constructor(recipeData) {
        // console.log(`Creating a recipe with data:`, recipeData);
        Object.assign(this, recipeData); // Remplace la déclaration "this.X"
        // console.log(`Created recipe with ID:`, this.id);
        this.cardElement = document.createElement("article");
    }

    render() {
        const mediaFolder = `${MEDIA_FOLDER}`;

        this.cardElement.innerHTML = `
        <div class="card">
            <img src="${mediaFolder}/${this.image}" alt="nom de l'image, ${this.title}" class="img">
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
}



