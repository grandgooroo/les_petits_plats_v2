export { indexRecipes };

function indexRecipes(recipes) {
    let globalIndex = {};
    let excludedWords = ["/[\"\']([^\"\']*)[\"\']/","\x22", "\"", "dans", "metre", "ajout", "alors", "le", "la", "les", "d'", "de", "du", "des", "un", "une", "et", "a", "à", "!", ":", ",", ".", "'", "d'", 'l', "(", ")", "avec", "afin", "avant", "ainsi", "votre", "vous"];
    let wordEndings = ["ant", "er", "ez"];

    function processWord(word) {
        word = word.toLowerCase();
        word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z\s]/gi, "");
        wordEndings.forEach(ending => word = word.replace(new RegExp(ending, 'g'), ""));
        return word;
    }

    recipes.forEach(recipe => {
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
    });

    return globalIndex;
}
