export class DropdownMenu {
    constructor(tags, filterName, dropdownElementSelector, searchEngine) {
        this.dropdownElement = document.querySelector(dropdownElementSelector);
        this.tags = tags;
        this.filterName = filterName;
        this.searchEngine = searchEngine; // Stock la référence à SearchEngine

        console.log('Creating new DropdownMenu with parameters:', {
            tags,
            filterName,
            dropdownElementSelector,
            searchEngine
        });

        this.render();

        // this.customInput = document.querySelector('.customInput');
        //* Ajout de "this" pour ne pas récupérer que le premier élément dans le DOM qu'il trouve
        this.customInput = this.dropdownElement.querySelector('.customInput');
        this.selectedData = this.dropdownElement.querySelector('.selectedData');
        this.searchInput = this.dropdownElement.querySelector('.searchInput input');
        this.ul = this.dropdownElement.querySelector('.options ul');
        this.customInputContainer = this.dropdownElement.querySelector('.customInputContainer');

        this.addEventListeners();

        this.searchInput.addEventListener('input', (e) => {
            const searchQuery = e.target.value.toLowerCase();
            this.ul.innerHTML = '';
            // console.log(e.target.value)
            for (let tag of this.tags) {
                if (tag.toLowerCase().includes(searchQuery)) {
                    const li = document.createElement("li");
                    const tagName = document.createTextNode(tag);
                    li.appendChild(tagName);
                    this.ul.appendChild(li);

                    // Attacher un écouteur d'événement au nouvel élément li
                    li.addEventListener('click', () => {
                        console.log(`Tag ${tag} sélectionné`);
                        // Ajouter le tag sélectionné au conteneur de tags sélectionnés
                        this.addTagToSelectedContainer(tag);
                    });
                }
            }
        });
    }

    addEventListeners() {
        window.addEventListener('click', (e) => {
            if (this.dropdownElement.querySelector('.searchInput').contains(e.target)) {
                this.dropdownElement.querySelector('.searchInput').classList.add('focus');
            } else {
                this.dropdownElement.querySelector('.searchInput').classList.remove('focus');
            }
        });

        this.customInput.addEventListener('click', () => {
            this.customInputContainer.classList.toggle('show');
        });

        let tagsLength = this.tags.length;

        for (let i = 0; i < tagsLength; i++) {
            let tag = this.tags[i];
            const li = document.createElement("li");
            const tagName = document.createTextNode(tag);
            li.appendChild(tagName);
            this.ul.appendChild(li);
        }

        this.ul.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', (e) => {
                let selectedTag = e.target.innerText;
                this.addTagToSelectedContainer(selectedTag);

                for (const li of document.querySelectorAll("li.selected")) {
                    li.classList.remove("selected");
                }
                e.target.classList.add('selected');
                this.customInputContainer.classList.toggle('show');
            });
        });
    }

    updateTags(tags) {
        this.tags = tags;
        this.clearTags();
        this.populateTags();
        console.log(tags)
    }

    clearTags() {
        while (this.ul.firstChild) {
            this.ul.removeChild(this.ul.firstChild);
        }
    }

    populateTags() {
        let tagsLength = this.tags.length;
        for (let i = 0; i < tagsLength; i++) {
            let tag = this.tags[i];
            const li = document.createElement("li");
            const tagName = document.createTextNode(tag);
            li.appendChild(tagName);
            this.ul.appendChild(li);
        }
    }

    addTagToSelectedContainer(tag) {
        // Créer un nouvel événement personnalisé
        const event = new CustomEvent('tagSelected', { detail: tag });

        // Lancer l'événement
        this.dropdownElement.dispatchEvent(event);

        // Appeler addTag sur SearchEngine lorsque l'utilisateur sélectionne un tag
        this.searchEngine.addTag(tag);

        // Retirer le tag de la liste des tags disponibles
        this.tags = this.tags.filter(t => t !== tag);
        this.updateTags(this.tags);
    }

    render() {
        this.dropdownElement.innerHTML = `
        <div class="customInputContainer">
                    <div class="customInput">
                        <div class="selectedData">${this.filterName}</div>
                        <i class="fa-solid fa-angle-right"></i>
                    </div>
                    <div class="options">
                        <div class="searchInput">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="searchInput" placeholder="Search"> <!-- //* Cible eventListener -->
                        </div>
                        <ul>
                        </ul>
                    </div>
                </div>
        <div id="selected-tags-container"></div>
        `;
    }
}
