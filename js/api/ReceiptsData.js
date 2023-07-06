import { DataService } from '../api/DataService.js';
import { Recipe } from '../api/Recipe.js';
import { indexRecipes } from '../utils/Indexation.js';

export class ReceiptsData {
    constructor() {
      // Initialisation des propriétés
    this.jsonFile = "data/recipes.json";
    }

    async init() {
        const recipesData = await DataService.fetchJson(this.jsonFile);
        // Indexation de toutes les recettes par ID
        this.recipesById = {}; // Déclare la var recipeById (OBJ vide)
        recipesData.forEach(recipeData => {
            const recipe = new Recipe(recipeData);
            this.recipesById[recipe.id] = recipe; // Crée un objet où chaque clé est un ID de recette
        });                                        // et chaque valeur est l'OBJ recette correspondant
        // * À la fin de cette boucle, this.recipesById est un objet qui contient toutes les recettes, indexées par leur ID.
        // console.log(this.recipesById)

        // Possible aussi avec 'map'
        // this.recipesByIdMap = recipes.reduce((acc, recipe) => {
        //     acc[recipe.id] = recipe;
        //     return acc;
        // }, {});

        // Indexation des recettes par mot clé et stockage de l'index
        this.globalIndex = indexRecipes(Object.values(this.recipesById));
        // console.log(this.globalIndex)
        // * Appelle la fonction indexRecipes() pour créer un "index global". L'index global est un objet qui aide à trouver rapidement 
        // * les recettes en fonction des mots clés. Pour chaque mot clé (qui n'est pas dans la liste des mots exclus)
        // * l'index global contient une liste d'IDs de recettes qui contiennent ce mot clé.
        // console.log(this.recipesById);
        return { recipesById: this.recipesById, globalIndex: this.globalIndex };
    }
}