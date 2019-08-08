// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
//Requete asynchrone


function ajaxGet(callback) {
    var req = new XMLHttpRequest();
    var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=fa0d005e0cc0bc1527b59926f2890285e953e0db";
    console.log(req);
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}