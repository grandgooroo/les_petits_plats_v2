export class DropdownMenu {
    constructor(tags, dropdownElementSelector) {
        this.dropdownElement = document.querySelector(dropdownElementSelector);
        this.tags = tags;

        this.render();

        this.customInput = document.querySelector('.customInput');
        this.selectedData = document.querySelector('.selectedData');
        this.searchInput = document.querySelector('.searchInput input');
        this.ul = document.querySelector('.options ul');
        this.customInputContainer = document.querySelector('.customInputContainer');
        // this.container = document.querySelector('.main-index__sort-inputs-container');

        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener('click', (e) => {
            if (document.querySelector('.searchInput').contains(e.target)) {
                document.querySelector('.searchInput').classList.add('focus');
            } else {
                document.querySelector('.searchInput').classList.remove('focus');
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
                let selectdItem = e.target.innerText;
                this.selectedData.innerText = selectdItem;

                for (const li of document.querySelectorAll("li.selected")) {
                    li.classList.remove("selected");
                }
                e.target.classList.add('selected');
                this.customInputContainer.classList.toggle('show');
            });
        });

        this.searchInput.addEventListener('keyup', (e) => {
            this.updateData(e.target);
        });
    }

    updateData(data) {
        let searchedVal = this.searchInput.value.toLowerCase();
        let searched_tag = [];

        searched_tag = this.tags.filter(tag => {
            return tag.toLocaleLowerCase().startsWith(searchedVal);
        }).map(tag => {
            return `<li onClick="this.updateData(this)">${tag}</li>`;
        }).join('');
        this.ul.innerHTML = searched_tag ? searched_tag : "<p style='margin-top: 1rem;'>Opps can't find any result <p style='margin-top: .2rem; font-size: .9rem;'>Try searching something else.</p></p>";
    }

    render() {
        this.dropdownElement.innerHTML = `
        <div class="customInputContainer">
                    <div class="customInput">
                        <div class="selectedData">Custom Input</div>
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
        `;
    }
}
