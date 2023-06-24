export class DataService {
    constructor(jsonFile) {
        this.jsonFile = jsonFile;
    }

    async fetchData() { // Requette asynchrone
        const response = await fetch(this.jsonFile); // utilise le chemin du fichier json passé en paramètre ()
        const data = await response.json();            // this.jsonFile déclaré dans PhotographerService
        return data; // retourne les données
        // Ajouter gestion d'erreur
    }

        // Préfiltrer les données par exemple juste les noms des recettes
        // const name = await response.json().filter(function(name) {
        //     return (val.name == name);
        // })
}