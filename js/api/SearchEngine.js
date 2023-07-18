import { RecipeList } from "./RecipeList.js";

export class SearchEngine
{
    constructor(recipeList) {
        this.allRecipes = recipeList;
        this.indexRecipes();
        this.searchResults = this.allRecipes.clone();
        // console.log(this.searchResults)
        this.selectedTags = [];
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

    //* Gestion des tags
    addTag(tag) {
        this.selectedTags.push(tag);
        this.filter();
    }

    removeTag(tag) {
        const index = this.selectedTags.indexOf(tag);
        if (index > -1) {
            this.selectedTags.splice(index, 1);
        }
        this.filter();
    }

    filter () {
        const filteredResults = {}
        // filtrer les résultats de recherche (propriété searchResults)
        console.log(this.searchResults.entries)
        console.log(this.selectedTags)
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
        console.log(filteredResults)
        // Retourner un nouvel Objet RecipeList en résultat
        this.searchResults = new RecipeList(filteredResults)
        console.log(this.searchResults);
        return this.searchResults;
        // La class App ca récupérer cette nouvelle liste de recette pour les afficher
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