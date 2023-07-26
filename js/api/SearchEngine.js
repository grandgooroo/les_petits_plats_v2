import { RecipeList } from "./RecipeList.js";

export class SearchEngine
{
    constructor(recipeList) {
        this.allRecipes = recipeList;
        this.indexRecipes();
        this.searchResults = this.allRecipes.clone();
        // console.log(this.searchResults)
        this.selectedTags = []; //* conserve une trace des filtres actuellement appliqués par l'utilisateur
        // * filter() utilise ces tags pour filtrer la liste des recettes à afficher
    }

    getSearchResults() {
        return this.searchResults;
    }

    fullTextSearch (query) {
        const lowerCaseQuery = query.toLowerCase();
        const results = {};

        for (const [recipeId, recipe] of this.allRecipes.entries) {
            if (
                recipe.description.toLowerCase().includes(lowerCaseQuery) ||
                recipe.name.toLowerCase().includes(lowerCaseQuery)
            ) {
                results[recipeId] = recipe;
            }
        }

        this.searchResults = new RecipeList(results);
        return this.searchResults;
    }

    //* Function pour stocker les tags dans le tableau puis filtre et met à jours les recettes
    addTag(tag) { // Ajouter le tag du tableau de recherche
        this.selectedTags.push(tag);
        this.filter();
        console.log("tag ajouté: ", tag);
        console.log("tags actuellement sélectionnés: ", this.selectedTags);
    }

    removeTag(tag) { // Supprimer le tag du tableau de recherche
        const index = this.selectedTags.indexOf(tag);
        if (index > -1) {
            this.selectedTags.splice(index, 1);
        }
        this.filter();
        console.log("tag supprimé: ", tag);
        console.log("tags actuellement sélectionnés: ", this.selectedTags);
    }

    filter () {
        // S'il n'y a pas de tags sélectionnés, retourner toutes les recettes
        if (this.selectedTags.length === 0) {
            this.searchResults = this.allRecipes.clone();
            return this.searchResults;
        }

        const filteredResults = {}
        // filtrer les résultats de recherche (propriété searchResults)
        // console.log(this.searchResults.entries)
        for (const [recipeId, recipe] of this.searchResults.entries) {  // Vérifier si la recette correspond à tous les tags sélectionnés
            const matchesAllTags = this.selectedTags.every(tag => {
                // Vérifiez si la recette correspond au tag
                const matchesIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient === tag);
                console.log(matchesIngredient)
                const matchesAppliance = recipe.appliance === tag;
                const matchesUstensil = recipe.ustensils.includes(tag);
                return matchesIngredient || matchesAppliance || matchesUstensil;
            });
            if (matchesAllTags) {
                filteredResults[recipeId] = recipe;
            }
        }
        // console.log(filteredResults)
        // Retourner un nouvel Objet RecipeList en résultat
        this.searchResults = new RecipeList(filteredResults)
        console.log(this.searchResults);
        return this.searchResults;
        // Il faut stoker les filtres sélectionnées, c'est la classe SearchEngine qui peut éventuellement le faire
    }

    indexRecipes() {
        let globalIndex = {};
        let excludedWords = ["/[\"\']([^\"\']*)[\"\']/","\x22", "\"", "dans", "metre", "ajout", "alors", "le", "la", "les", "d'", "de", "du", "des", "un", "une", "et", "a", "à", "!", ":", ",", ".", "'", "d'", 'l', "(", ")", "avec", "afin", "avant", "ainsi", "votre", "vous"];
        let wordEndings = ["ant", "er", "ez"];

        function processWord(word) {
            word = word.toLowerCase();
            word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z\s]/gi, "");
            wordEndings.forEach(ending => word = word.replace(new RegExp(ending, 'g'), ""));
            return word;
        }

        for (const recipeId in this.allRecipes.getRecipes()) {

            const recipe = this.allRecipes.find(recipeId);
            let index = new Set();

            [...recipe.name.split(' '), ...recipe.description.split(' ')].forEach(word => { // "..." Opérateur spread combine les mots 
                word = processWord(word);                                                   // du nom et de la déscription dans une seul liste
                if (word.length > 3 && !excludedWords.includes(word)) {
                    index.add(word);
                    if (globalIndex[word]) {
                        globalIndex[word].push(recipe.id);
                    } else {
                        globalIndex[word] = [recipe.id];
                    }
                }
            });

            recipe.index = index;
        };

        this.globalIndex = globalIndex;
    }
}