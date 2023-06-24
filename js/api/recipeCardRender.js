import { CreatReceipCard } from '../utils/card.js';
import { Recipe } from '../api/recipe.js';


export class RecipeCardRender {
    construcor() {
    }

    render (recipeData) {
        const cardsContainer = document.querySelector('.cards-container');

        recipeData.forEach(recipe => {
            const recipeInstance = new Recipe(recipe);
            const recipecards = new CreatReceipCard(recipeInstance);
            cardsContainer.append(recipecards.cardDom());  // Ajoute les cartes à l'élement parent du DOM
        });
    }
}