class Timer {
  constructor(minCpt) {
    this.minCpt = minCpt // infos sur le temps du timer
    this.min = (minCpt - 60) / 60;
    this.sec = 59;
    this.recupSec = sessionStorage.getItem("secondes");
    this.recupMin = sessionStorage.getItem("minutes");
    document.getElementById("signature").style.visibility = "hidden";
    document.getElementById("encart").style.visibility = "hidden";
    document.getElementById("reservation").style.visibility="hidden";
    this.changerStation = document.getElementById("changerStation");
    document.getElementById("enregistrer").addEventListener('click', this.startTimer.bind(this));
    window.addEventListener('load', this.startRefresh.bind(this));
  }

  display() {
    const intervalId = setInterval(() => {
      document.getElementById("reservation").textContent = "Il vous reste " + sessionStorage.getItem("minutes") + " min " + sessionStorage.getItem("secondes") + " sec" + " pour aller à la station " + sessionStorage.getItem("adresse");
      if ((this.sec >= 0)) {
        this.sec--
      }

      if (this.sec === 0) {
        this.sec = 59;
        this.min--
      }

      if ((this.min >= 0) && (this.sec >= 0)) {

        sessionStorage.setItem("secondes", this.sec);
        sessionStorage.setItem("minutes", this.min);
        sessionStorage.setItem("temps", this.minCpt);

      } else {
        clearInterval(intervalId);       
        document.getElementById("reservation").textContent = "Votre réservation à la station  " + sessionStorage.getItem("adresse") + " n'est plus effective";
        document.getElementById("resaencours").style.visibility = "hidden";
        sessionStorage.clear();
      }


    }, 1000);
  }
  startTimer() {

    this.display();
    document.getElementById("encart").style.visibility = "visible";
    document.getElementById("reservation").style.visibility="visible";
    document.getElementById("signature").style.visibility = "hidden";
    document.getElementById("enregistrer").style.visibility = "hidden";

  }
  startRefresh() {

    this.refresh();
    document.getElementById("encart").style.visibility = "visible";
    document.getElementById("signature").style.visibility = "hidden";
    document.getElementById("enregistrer").style.visibility = "hidden";
    document.getElementById("reservation").style.visibility="visible";
  }


  refresh() {

    const intervalId = setInterval(() => {
        document.getElementById("reservation").textContent = "Il vous reste " + sessionStorage.getItem("minutes") + " min " + sessionStorage.getItem("secondes") + " sec" + " pour aller à la station " + sessionStorage.getItem("adresse");

        if ((this.recupSec >= 0)) {
          this.recupSec--
        }

        if (this.recupSec === 0) {
          this.recupSec = 59;
          this.recupMin--
        }

        if ((this.recupMin >= 0) && (this.recupSec >= 0)) {
          sessionStorage.setItem("secondes", this.recupSec);
          sessionStorage.setItem("minutes", this.recupMin);


        } else {
          clearInterval(intervalId);
          document.getElementById("reservation").textContent = "Votre réservation à la station " + sessionStorage.getItem("adresse") + "n'est plus effective";
          document.getElementById("resaencours").style.visibility = "hidden";
          sessionStorage.clear();
        } {
          this.changerStation.addEventListener("click", () => {
            sessionStorage.clear();
            clearInterval(intervalId);
            document.getElementById("encart").style.visibility = "hidden";
            document.getElementById("resaencours").style.visibility = "hidden";

          })
        }


      },
      1000);
  }

}
var timer = new Timer(1200);