import { ReceiptsData } from '../api/ReceiptsData.js';
import { RecipeList } from '../api/RecipeList.js';

// Gére l'interaction l'utilisateur avec l'interface.
// *- C'est dans cette classe globale que tu stockeras les données dont tu vas avoir besoin :*
// *- la liste des résultats de la recherche textuelle
// *- la liste des recettes affichées (prenant en compte les filtres)

export class App {
    constructor() {
            this.recipesService = new ReceiptsData();
            // Initialise displayedRecipes

            this.recipesService.init().then(({ recipesById, globalIndex }) => {
                this.displayedRecipes = [];
                // L'index des recettes
                this.globalIndex = globalIndex;
                // this.globalIndex = this.recipesService.globalIndex;
                // console.log(this.globalIndex)
                // La liste de toutes les recettes
                // this.allRecipes = recipes;
                // console.log(this.allRecipes)
                this.recipesById = recipesById;
                // console.log(this.recipesById)
                // La liste des résultats de la recherche textuelle
                this.searchResults = [];
                // La liste des recettes affichées (prenant en compte les filtres)
                this.displayedRecipes = Object.values(this.recipesById);
                console.log(this.displayedRecipes)
                // Mise à jour de l'affichage
                this.refreshRecipeDisplay();
            });

            // Ajout écouteur d'événement sur la champ de recherche principal
            document.getElementById('main-index__search-input').oninput = (event) => {
                const query = event.target.value;
                this.searchResults = this.search(query);
                console.log(this.searchResults);
                this.displayedRecipes = this.searchResults; // Update displayedRecipes
                this.refreshRecipeDisplay();
            };
        }

        search(query) {
        const lowerCaseQuery = query.toLowerCase();
        // Dans le dictionnaire indexé par ID des recettes, filtre les recettes
    //  qui correspondent à la requette en comparant au contenu du nom/description des recettes
        const matchingRecipes = Object.values(this.recipesById).filter(recipe =>
            recipe.description.toLowerCase().includes(lowerCaseQuery) ||
            recipe.name.toLowerCase().includes(lowerCaseQuery)
        );
        // Créer une nouvelle instance de RecipeList avec les recettes correspondantes
        this.recipeList = new RecipeList(matchingRecipes);
        // Renvoyer les recettes correspondantes
        return matchingRecipes;
        }

        // Méthode d'application du filtre
        applyFilter(filterType, filterValue) {
            switch (filterType) {
                case 'ingredient':
                    this.recipeList = this.recipeList.filterRecipesByIngredient(filterValue);
                    break;
                // Autres Tag
            }
        }


// Met à jour l'interface utilisateur pour afficher les recettes de `this.displayedRecipes`
        refreshRecipeDisplay() {
            // Récupere l'élément HTML où les recettes doivent être affichées
            const recipeDisplay = document.querySelector('.cards-container');
            // Vide cet élément
            recipeDisplay.innerHTML = '';
            // Pour chaque recette dans this.displayedRecipes
            for(let recipe of this.displayedRecipes) {
                // Générer l'élément HTML pour cette recette en utilisant la méthode render()
                let recipeElement = recipe.render();
                // Ajouter cet élément au containter parent du DOM
                recipeDisplay.appendChild(recipeElement);
            }
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

