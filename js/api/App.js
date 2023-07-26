import { DataManager } from './DataService.js';
import { RecipeList } from '../api/RecipeList.js';
import { SearchEngine } from './SearchEngine.js';
import { DropdownMenu } from '../utils/DropdownMenu.js';

const dataUrl = 'data/recipes.json';

// Gére l'interaction l'utilisateur avec l'interface.
export class App {

    constructor() {
            DataManager.getRecipes(dataUrl)
                .then(this.onRecipesLoaded.bind(this));
        }

    onRecipesLoaded(recipes) {
        this.allRecipes = new RecipeList(recipes);
        this.searchEngine = new SearchEngine(this.allRecipes);
        // console.log(this.searchEngine)
        this.displayedRecipes = this.searchEngine.getSearchResults();

        // Instancier les menus déroulants
        const ingredients = this.allRecipes.getUniqueTags('ingredients');
        const appliances = this.allRecipes.getUniqueTags('appliance');
        const utensils = this.allRecipes.getUniqueTags('ustensils');

        this.ingredientsDropdown = new DropdownMenu(ingredients, "Ingredients", ".drop-down-ingredients", this.searchEngine);

        this.applianceDropdown = new DropdownMenu(appliances, "Appliances", ".drop-down-batter", this.searchEngine);

        this.utensilDropdown = new DropdownMenu(utensils, "Utensils", ".drop-down-utensils", this.searchEngine);

        this.ingredientsDropdown.dropdownElement.addEventListener('tagSelected', (event) => {
            this.addTagBtnToSelectedContainer(event.detail, this.ingredientsDropdown);
        });

        this.applianceDropdown.dropdownElement.addEventListener('tagSelected', (event) => {
            this.addTagBtnToSelectedContainer(event.detail, this.applianceDropdown);
        });

        this.utensilDropdown.dropdownElement.addEventListener('tagSelected', (event) => {
            this.addTagBtnToSelectedContainer(event.detail, this.utensilDropdown);
        });

        this.dropdownMenus = [this.ingredientsDropdown, this.applianceDropdown, this.utensilDropdown];

        document.getElementById('main-index__search-input').addEventListener('input', this.onInputSearch.bind(this));

        this.refreshRecipeDisplay();
    }

    addTagBtnToSelectedContainer(tag, dropdownMenu) {
        const selectedTagsContainer = document.getElementById("main-index__sort-tags");
        const tagElement = document.createElement("span");
        const tagBtn = document.createElement("div");
        tagElement.dataset.type = tag.type;
        tagElement.textContent = tag.tag;
        tagElement.classList.add("selected-tags-container");
        selectedTagsContainer.appendChild(tagElement);
        tagBtn.classList.add("close-tags-btn");
        tagBtn.dataset.tag = tag.tag;
        tagElement.appendChild(tagBtn);
        this.onTagSelected(tag.tag, dropdownMenu.filterName, dropdownMenu);
        // Ajoute un écouteur d'événements au bouton de fermeture des tags
        tagBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche l'événement 'click' de se propager aux éléments parents
            selectedTagsContainer.removeChild(tagElement); // Supprime le tag de la liste des tags sélectionnés

            // Ajouter le tag à la liste des tags disponibles
            dropdownMenu.tags.push(tag.tag);
            dropdownMenu.updateTags(dropdownMenu.tags);
            this.onTagDeselected(tag.tag, dropdownMenu.filterName, dropdownMenu);
            // Récupérez le tag depuis l'attribut de données du bouton
            const tagToReappear = e.target.dataset.tag;
            // Faire réapparaître le tag dans la liste des tags disponibles
            dropdownMenu.removeTagFromSelectedList(tag.tag);
            console.log("tag supprimé du container")
        });
    }

    onTagSelected(tag, tagType, dropdownMenu) {
        this.searchEngine.addTag(tag); // Ajoute le tag sélectionné à la liste des tags dans searchEngine
        this.displayedRecipes = this.searchEngine.filter(); // Filtrer les recettes en fonction des tags sélectionnés
        console.table(this.displayedRecipes) // Affiche les recettes filtrées
        const tags = this.displayedRecipes.getUniqueTags(tagType); // Recup les tags uniques de la liste des recettes filtrées
        console.log('tags before update:', tags);
        dropdownMenu.updateTags(tags); // Met à jour la liste des tags dans le menu déroulant //* Problème ici
        this.refreshRecipeDisplay(); // Rafraîchit l'affichage des recettes
    }

    onTagDeselected(tag, tagType, dropdownMenu) {
        this.searchEngine.removeTag(tag);
        this.displayedRecipes = this.searchEngine.filter();
        const tags = this.displayedRecipes.getUniqueTags(tagType);
        dropdownMenu.updateTags(tags);
        console.log("tag à jour apres updateTags", tags)
        this.refreshRecipeDisplay();
    }

    onInputSearch(event) {
        const query = event.target.value;

        // Si la requête est vide, réinitialiser l'affichage à toutes les recettes
        if (query === "") {
            this.displayedRecipes = this.allRecipes;
            this.refreshRecipeDisplay();
            return;
        }

        // * Vérifier que la requête est d'au moins 3 caractères
        if (query.length < 3) {
            return;
        }

        this.displayedRecipes = this.searchEngine.fullTextSearch(query);

        // Si aucune recette ne correspond à la recherche, afficher un message à l'utilisateur
        if (Object.keys(this.displayedRecipes.getRecipes()).length === 0) {
            alert("toto")
            const container = document.querySelector('.recipe-card__not-found');
            container.innerHTML = `Aucune recette ne contient "${query}", vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
        } else {
            this.refreshRecipeDisplay();
        }

        this.refreshRecipeDisplay();
    };

    refreshRecipeDisplay() {
        const container = document.querySelector('.cards-container');
        this.displayedRecipes.display(container);
    }
}

