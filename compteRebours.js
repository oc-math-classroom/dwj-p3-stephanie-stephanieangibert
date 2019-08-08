class Timer{
    constructor(minCpt) {
      this.minCpt=minCpt // infos sur le temps du timer
      this.startTimer()
    
    
      }
  
  
    startTimer() {
        let finResa= new Date().getTime()+ (this.minCpt*60000);
        //let finResa=Math.round((new Date().getTime())/60000 )+ this.minCpt;
       
             
        let intervalId = setInterval(()=>{
          let dateNow = new Date().getTime();
         
         // let dateNow=Math.round(new Date().getTime()/60000);
         
         
          //let tempsRestant = Math.round((finResa - dateNow)/60000);
        
          let tempsRestant = finResa-dateNow;
          let minutes = Math.floor(tempsRestant / 60000);
          let secondes = ((tempsRestant % 60000) / 1000).toFixed(0);
          console.log(minutes, secondes);
          sessionStorage.setItem("tempsRestant",tempsRestant);
         console.log(tempsRestant);
         
          if (tempsRestant>0) {
            document.getElementById("reservation").textContent="Il vous reste " +sessionStorage.getItem("tempsRestant") +" minutes" +" pour aller à la station "+ sessionStorage.getItem("adresse");
           
          } else {
              clearInterval(intervalId);
              // Modifie le titre de la page
              document.getElementById("reservation").textContent="Votre réservation à la station " + sessionStorage.getItem("adresse") + "n'est plus effective";  
          }
          {
            document.getElementById("changerStation").addEventListener('click', function(){
              clearInterval(intervalId);
              document.getElementById("encart").style.visibility = "hidden";
            
            })
          }
        },1000);
      
        
    }  
    
  }
  var timer = new Timer(20);
