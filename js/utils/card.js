export class CreatReceipCard {
    constructor(recipe) {
        this.recipe = recipe;
        this.cardElement = document.createElement("article");
    }
    cardDom () {
        this.cardElement.innerHTML = `
        <div class="card">
            <h2>${this.recipe.name}</h2>
            <h3>Déscription</h3>
                <p>${this.recipe.description}</p>
            <h3>Ingrédients: 
                <p>
                    ${this.recipe.ingredients.map(ingredient => `${ingredient.name}`).join('')}
                </p>
            </h3>
        </div>
            `;
            return this.cardElement;
    }
}