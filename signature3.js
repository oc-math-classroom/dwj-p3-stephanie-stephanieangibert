class Canvas {
    constructor() {
        this.canvasElt = document.querySelector('#canvas');
        this.context = this.canvasElt.getContext('2d');
        this.dessin = false;
        this.effacer = document.getElementById("effacer");
        document.getElementById("enregistrer").style.visibility = "hidden";
        this.context.lineWidth = 6;
        this.signature();
    }

    getMousePos(position) {
        let rec = this.canvasElt.getBoundingClientRect();
        //renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage
        return {
            x: position.clientX - rec.left,
            y: position.clientY - rec.top
        }
    }
    getTouchPos(e) {
        let rect = this.canvasElt.getBoundingClientRect();
        //renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage
        return {
            x: e.touches['0'].clientX - rect.left,
            y: e.touches['0'].clientY - rect.top
        }
    }

    signature() {
        this.canvasElt.addEventListener('mousedown', (e) => {
            this.dessin = true;
            let mousePosition = this.getMousePos(e);
            this.context.beginPath();
            this.context.moveTo(mousePosition.x, mousePosition.y);

        })

        this.canvasElt.addEventListener('mouseup', () => {
            this.dessin = false;

        })

        this.canvasElt.addEventListener('mousemove', (e) => {
            if (this.dessin) {
                let mousePosition = this.getMousePos(e);
                this.context.lineTo(mousePosition.x, mousePosition.y);
                this.context.stroke();
                //pour afficher le bouton enregistrer si signature
                document.getElementById("enregistrer").style.visibility = "initial";
            }
        })

        this.canvasElt.addEventListener("mouseleave", () => {
            this.dessin = false;

        })
        this.canvasElt.addEventListener("touchstart", (e) => {
            let touchPosition = this.getTouchPos(e);
            this.dessin = true;
            this.context.beginPath();
            this.context.moveTo(touchPosition.x, touchPosition.y);

        })
        // Tracé
        this.canvasElt.addEventListener("touchmove", (e) => {
            if (this.dessin) {
                let touchPosition = this.getTouchPos(e);
                this.context.lineTo(touchPosition.x, touchPosition.y);
                this.context.stroke();
                //pour afficher le bouton enregistrer si signature
                document.getElementById("enregistrer").style.visibility = "visible";
            }

        })

        this.canvasElt.addEventListener(`touchend`, (e) => {
            this.dessin = false; // Stop le tracé          
        })

        this.effacer.addEventListener('click', () => {
            this.context.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
            //pour cacher le bouton enregistrer           
            document.getElementById("enregistrer").style.visibility = "hidden";
        });

        document.getElementById("changerStation").addEventListener('click', () => {
            this.context.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
            //pour cacher le bouton enregistrer           
            document.getElementById("enregistrer").style.visibility = "hidden";
        });
    }
}
const signature = new Canvas();
