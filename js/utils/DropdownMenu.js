export class DropdownMenu {
    constructor(tags, filterName, dropdownElementSelector) {
        this.dropdownElement = document.querySelector(dropdownElementSelector);
        this.tags = tags;
        this.filterName = filterName;

        console.log('Creating new DropdownMenu with parameters:', {
            tags,
            filterName,
            dropdownElementSelector,
        });

        this.render();

        this.customInput = this.dropdownElement.querySelector('.customInput');
        this.selectedData = this.dropdownElement.querySelector('.selectedData');
        this.searchInput = this.dropdownElement.querySelector('.searchInput input');
        this.ul = this.dropdownElement.querySelector('.options ul');
        this.customInputContainer = this.dropdownElement.querySelector('.customInputContainer');

        this.addEventListeners();
        this.populateTags();
        this.searchInput.addEventListener('input', this.onSearchInputChanged.bind(this));
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
                    // this.clearTags();
                    // this.populateTags();
                    this.customInputContainer.classList.toggle('show');
                });

                this.ul.addEventListener('click', this.onClickTagList.bind(this));
    }

    onClickTagList(event) {
        if (event.target.tagName === 'LI') {
            let selectedTag = event.target.innerText;
            console.log("Tag selected: " + selectedTag);
            this.addTagToSelectedList(selectedTag);

            for (const li of document.querySelectorAll("li.selected")) {
                li.classList.remove("selected");
            }
            event.target.classList.add('selected');
            this.customInputContainer.classList.toggle('show');
        }
    }

    onSearchInputChanged(e) {
        const searchQuery = e.target.value.toLowerCase();
        this.ul.innerHTML = '';
        for (let tag of this.tags) {
            if (tag.toLowerCase().includes(searchQuery)) {
                const li = document.createElement("li");
                const tagName = document.createTextNode(tag);
                li.appendChild(tagName);
                this.ul.appendChild(li);
            }
        }
    }

    populateTags() {
        console.log("Tags to populate: ", this.tags);
        let tagsLength = this.tags.length;
        const selectedTags = this.getSelectedTags();
        for (let i = 0; i < tagsLength; i++) {
            let tag = this.tags[i];
            if (selectedTags.includes(tag)) {
                continue;
            }
            const li = document.createElement("li");
            const tagName = document.createTextNode(tag);
            li.appendChild(tagName);
            this.ul.appendChild(li);
        }
        console.log(this.ul)
    }

    onClickTagList(event) {
        if (event.target.tagName === 'LI') {
            let selectedTag = event.target.innerText;
            console.log("Tag selected: " + selectedTag);
            this.addTagToSelectedList(selectedTag);
            // A lieu d'ajouter la classe 'selected', on cache l'élément
            event.target.style.display = 'none';
            this.customInputContainer.classList.toggle('show');
        }
    }


    updateTags(tags) { //* Met à jour la liste des tags du menu
        const selectedTags = this.getSelectedTags();
        // Combine les tags selectionnés et les nouveaux tags
        this.tags = [...new Set([...tags, ...selectedTags])];
        this.populateTags();
        console.log(this.tags)
    }

    getSelectedTags() {
        const selectedTags = [];
        for (const selectedTagElement of document.querySelectorAll('[data-type='+this.filterName+']')) {
            selectedTags.push(selectedTagElement.textContent);
        }
        console.log(selectedTags)
        return selectedTags;
    }

    addTagToSelectedList(tag) {
        // Créer un nouvel événement personnalisé
        const event = new CustomEvent('tagSelected', { detail: {tag: tag, type: this.filterName} });

        // Lancer l'événement
        this.dropdownElement.dispatchEvent(event);
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
                            <input type="text" id="searchInput" placeholder="Search">
                        </div>
                        <ul>
                        </ul>
                    </div>
                </div>
        <div id="selected-tags-container"></div>
        `;
    }
}
