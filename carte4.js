class Carte {
    constructor() {
        // Carte OpenStreetMap
        this.lati = 47.2241;
        this.lon = -1.5582;
        this.macarte = null;
        this.stations;
        this.i = 0;
        this.info = document.getElementById("station");
        this.inputs = details.querySelectorAll('input');
        this.inputNumero = this.inputs[0];
        this.inputAdress = this.inputs[1];
        this.inputNbreVelo = this.inputs[2];
        this.inputNbreVeloRestant = this.inputs[3];
        this.nom = this.inputs[4];
        this.prenom = this.inputs[5];
        this.nbrNombre = 20;
        this.decompte = document.getElementById("decompte");
        document.getElementById("signature").style.visibility = "hidden";
        document.getElementById("encart").style.visibility = "hidden";
        document.getElementById("resa").addEventListener('click', this.reserver.bind(this));
        document.getElementById("enregistrer").addEventListener('click', this.signer.bind(this));
        this.nom.value = localStorage.getItem("nom");
        this.prenom.value = localStorage.getItem("prenom");

    }


    // Fonction d'initialisation de la carte
    initMap() {
        this.macarte = L.map('map').setView([this.lati, this.lon], 11);
        // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(this.macarte);
        /* var getInfos = ajaxGet(function (response) {
            this.stations = JSON.parse(response);        
              this.markersInit();
         }); */
        var getInfos = ajaxGet(this.markersInit.bind(this));
    };

    markersInit(response) {
        this.stations = JSON.parse(response);

        for (let i in this.stations)
        //for (let i = 0; i < this.stations.length; i++)

        {
            // Ajout des markers
            var marker = L.marker([this.stations[i].position.lat, this.stations[i].position.lng]).addTo(this.macarte);
            marker.addEventListener('click', function (e) {

                this.inputNumero.value = this.stations[i].name;
                this.inputAdress.value = this.stations[i].address;
                this.inputNbreVelo.value = this.stations[i].bike_stands;
                this.inputNbreVeloRestant.value = this.stations[i].available_bikes;
                this.stations[i];
                console.log(this.stations[i]);

                if (this.inputNbreVeloRestant.value != 0 && this.inputNbreVeloRestant.value != "") {
                    document.getElementById("attention").innerHTML = "";
                } else {
                    document.getElementById("attention").innerHTML = "Vous ne pouvez pas réserver";

                };
               
               
            }.bind(this));

            var station = {
                numeroStation: this.stations[i].number,
                nomContrat: this.stations[i].contract_name,
                nomStation: this.stations[i].name,
                adresseStation: this.stations[i].address,
                positionStation: this.stations[i].position,
                bornePaiement: this.stations[i].banking,
                bonus: this.stations[i].bonus,
                nbrMaxVelos: this.stations[i].bike_stands,
                retourVelo: this.stations[i].available_bike_stands,
                velosRestants: this.stations[i].available_bikes,
                derniereMAJ: this.stations[i].last_update,
                status: this.stations[i].status,

            }

            this.stations.push(station);
        }
    }


    reserver() {
        console.log(this.nom.value.length);
        if (this.nom.value.length > 0 && this.prenom.value.length > 0 && this.inputNbreVeloRestant.value.length > 0 && this.inputAdress.value.length > 0)

        {

            localStorage.setItem("nom", this.nom.value);
            localStorage.setItem("prenom", this.prenom.value);
            localStorage.setItem("velo", this.inputNbreVeloRestant.value);
            sessionStorage.setItem("adresse", this.inputAdress.value);
            document.getElementById("signature").style.visibility = "visible";
            document.getElementById("attention").style.visibility = "hidden";
        } else {
            document.getElementById("attention").innerHTML = "Veuillez remplir tous les champs";
        }


    }
    signer() {


        new Timer(20);


        document.getElementById("encart").style.visibility = "visible";
        document.getElementById("signature").style.visibility = "hidden";
        document.getElementById("enregistrer").style.visibility = "hidden";

    }


}


var carte = new Carte();
carte.initMap();
