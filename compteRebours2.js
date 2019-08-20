class Timer {
  constructor(tempsMinTimer) {
    this.minCpt = tempsMinTimer;
    this.interval = null;
    this.min = (tempsMinTimer - 60) / 60;
    this.sec = 59;
    this.recupSec = sessionStorage.getItem("secondes");
    this.recupMin = sessionStorage.getItem("minutes");
    document.getElementById("signature").style.visibility = "hidden";
    document.getElementById("encart").style.visibility = "hidden";
    document.getElementById("changerStation").addEventListener('click', this.stopTimer.bind(this));
    document.getElementById("enregistrer").addEventListener('click', this.startTimer.bind(this));
    window.addEventListener('load', this.startRefresh.bind(this));
  }

  display() {

    this.interval = setInterval(() => {
      document.getElementById("reservation").textContent = "Il vous reste " + sessionStorage.getItem("minutes") + " min " + sessionStorage.getItem("secondes") + " sec" + " pour aller à la station " + sessionStorage.getItem("adresse");
      if ((this.sec >= 0)) {
        this.sec--;
      }

      if (this.sec === 0) {
        this.sec = 59;
        this.min--;
      }

      if ((this.min >= 0) && (this.sec >= 0)) {
        sessionStorage.removeItem("secondes");
        sessionStorage.removeItem("minutes");

        sessionStorage.setItem("secondes", this.sec);
        sessionStorage.setItem("minutes", this.min);
        sessionStorage.setItem("temps", this.tempsMinTimer);

      } else {
        clearInterval(this.interval);
        document.getElementById("reservation").textContent = "Votre réservation à la station  " + sessionStorage.getItem("adresse") + " n'est plus effective";
        document.getElementById("resa_en_cours").style.visibility = "hidden";
        sessionStorage.clear();
      }
    }, 1000);
  }

  stopTimer() {
    document.getElementById("encart").style.visibility = "hidden";
    document.getElementById("resa_en_cours").style.visibility = "hidden";
    clearInterval(this.interval);
    sessionStorage.clear();


  }

  startTimer() {
    sessionStorage.removeItem("secondes");

    sessionStorage.removeItem("minutes");

    this.display();
    document.getElementById("encart").style.visibility = "visible";
    document.getElementById("signature").style.visibility = "hidden";
    document.getElementById("enregistrer").style.visibility = "hidden";
  }

  startRefresh() {
    this.refresh();
    document.getElementById("encart").style.visibility = "visible";
    document.getElementById("signature").style.visibility = "hidden";
    document.getElementById("enregistrer").style.visibility = "hidden";
  }


  refresh() {

    this.interval = setInterval(() => {
        document.getElementById("reservation").textContent = "Il vous reste " + sessionStorage.getItem("minutes") + " min " + sessionStorage.getItem("secondes") + " sec" + " pour aller à la station " + sessionStorage.getItem("adresse");

        if ((this.recupSec >= 0)) {
          this.recupSec--;
        }

        if (this.recupSec === 0) {
          this.recupSec = 59;
          this.recupMin--;
        }

        if ((this.recupMin >= 0) && (this.recupSec >= 0)) {
          sessionStorage.removeItem("secondes");
          sessionStorage.removeItem("minutes");
          sessionStorage.setItem("secondes", this.recupSec);
          sessionStorage.setItem("minutes", this.recupMin);


        } else {
          clearInterval(this.interval);
          document.getElementById("reservation").textContent = "Votre réservation à la station " + sessionStorage.getItem("adresse") + "n'est plus effective";
          document.getElementById("resa_en_cours").style.visibility = "hidden";
          sessionStorage.clear();
        }
      },
      1000);
  }

}
var timer = new Timer(1200);