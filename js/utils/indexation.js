
export { indexRecipes };

function indexRecipes(recipes) {
    
        let globalIndex = {};

        // Exclusion des "articles/prépositions"
        let excludedWords = ["/[\"\']([^\"\']*)[\"\']/","\x22", "\"", "dans", "metre", "ajout", "alors", "le", "la", "les", "d'", "de", "du", "des", "un", "une", "et", "a", "à", "!", ":", ",", ".", "'", "d'", 'l', "(", ")", "avec", "afin", "avant", "ainsi", "votre", "vous"];  // Liste des mots à exclure

        // Pour chaque recette de la liste de recettes :
        recipes.forEach(recipe => {
            let index = new Set();
            
            // Ajouter chaque mot du nom de la recette à l'index
            recipe.name.split(' ').forEach(word => {
                word = word.toLowerCase();
                word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z\s]/gi, "");
                // word = word.replace(/[^a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s]/gi, "");
                word = word.replace(/ant/g, "")
                word = word.replace(/er/g, "")
                word = word.replace(/ez/g, "")

                // Vérifier si le mot n'est pas dans la liste des mots à exclure
                if (word.length > 3 && !excludedWords.includes(word)) {
                    index.add(word);
                    // Ajouter la recette à l'index global pour ce mot
                    if (globalIndex[word]) {
                        globalIndex[word].push(recipe);
                    } else {
                        globalIndex[word] = [recipe];
                    }
                }
            });
            
            // Ajoute chaque mot de ma déscritpion à l'index
            recipe.description.split(' ').forEach(word => {
                word = word.toLowerCase();
                // word = word.replace(/[^a-z]/gi, "");
                word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z\s]/gi, "");
                // word = word.replace(/"/g, "");  // Remplace tous les guillemets dans le mot
                word = word.replace(/ant/g, "")
                word = word.replace(/er/g, "")
                word = word.replace(/ant/g, "")
                word = word.replace(/ez/g, "")

                if (word.length > 3 && !excludedWords.includes(word)) {
                    index.add(word);
                    // Ajouter la recette à l'index global pour ce mot
                    if (globalIndex[word]) {
                        globalIndex[word].push(recipe);
                    } else {
                        globalIndex[word] = [recipe];
                    }
                }
            });
        
            // Ajouter l'index à la recette
            recipe.index = index;
        });

        // Utiliser globalIndex pour la recherche principale
        return globalIndex;
}