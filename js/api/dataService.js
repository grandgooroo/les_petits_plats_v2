export class DataService {

    static async fetchJson(url) { // Requette asynchrone
        const response = await fetch(url); // utilise le chemin du fichier json passé en paramètre ()
        const data = await response.json();
        return data; // retourne les données
        // Ajouter gestion d'erreur
    }
}

// Valable aussi sous forme d'objet
// export const DataService = {
//     async fetchJson(url) { // Requette asynchrone
//         const response = await fetch(url); // utilise le chemin du fichier json passé en paramètre ()
//         const data = await response.json();
//         return data; // retourne les données
//     }
// }