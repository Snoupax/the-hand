
/* 
Tableau qui contient toutes les cartes.
  Valeur = 1, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A
  Symbole = k(Carreau), c(Coeur), p(Pique), t(Trefle)
  
*/

let deck = [];
let hand = [];
deck = [ 
  "1Ak","2k","3k","4k","5k","6k","7k","8k","9k","Tk","Jk","Qk","Kk",
  "1Ac","2c","3c","4c","5c","6c","7c","8c","9c","Tc","Jc","Qc","Kc",
  "1Ap","2p","3p","4p","5p","6p","7p","8p","9p","Tp","Jp","Qp","Kp",
  "1At","2t","3t","4t","5t","6t","7t","8t","9t","Tt","Jt","Qt","Kt",];



// Fonction qui ajoute une image



/* <!-- Carte 1 -->
<div class="col-2">
    <input type="checkbox" class="card-flip" id="card1">
    <label for="card1" class="label-flip">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img src="" alt="">
            </div>
            <div class="flip-card-back">
            
            </div>
    </div>
    </label>
</div>
 */

async function drawHand(){

  let min = 0;
  let max = 51;
  let i = 0;
  changed = 0;

  // Generation de 5 nombres aléatoires sans doublons.
  let randomNumbers = [];

  for ( i = 0; i < 10; i++) {
    let randomNumber;

    do {
        randomNumber = Math.floor(Math.random() * (max - min)) + min;
    } while (randomNumbers.indexOf(randomNumber) !== -1);
 
    randomNumbers.push(randomNumber);
    console.log(randomNumbers[i]);
    hand[i] = deck[randomNumbers[i]];
  }





  // Empty div.
  const cards = document.getElementsByClassName("cardSite");
    for(i=0;i<5;i++){
      await pause(50);
      cards[i].innerHTML = "";
   }
   const displayReward= document.getElementById("rewardDisplay");
   const displayCombi = document.getElementById("displayCombi");
   displayCombi.innerHTML = "Tirage"
   displayReward.innerHTML = "Récompense"
    for(i = 0; i < 5; i++){
    await pause(100);
    
    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("id", "card"+(i+1))
    input.classList.add("card-flip");
    input.setAttribute('checked',true);
    const label = document.createElement("label");
    label.setAttribute("for", 'card'+(i+1));
    label.classList.add("label-flip");
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card-inner");
    const frontCard= document.createElement("div");
    frontCard.classList.add("flip-card-front");
    const backCard = document.createElement("div");
    backCard.classList.add("flip-card-back")
    const imgFront = document.createElement("img");
    const imgBack = document.createElement("img");

    
    backCard.appendChild(imgBack);
    frontCard.appendChild(imgFront);
    flipCard.appendChild(frontCard);
    flipCard.appendChild(backCard);
    label.appendChild(flipCard);
    cards[i].appendChild(input);
    cards[i].appendChild(label);
   


    
    console.log(randomNumbers[i]);
    
    imgFront.setAttribute("src", "css/Poker/cards/"+hand[i]+".png");
    imgBack.setAttribute("src", "css/Poker/cards/CardBack.png")
  }

  const alert = document.getElementById("alert");
  alert.innerHTML = "Cliquer sur les cartes pour les retourner ou cliquer sur le bouton 'Retourner les cartes'";

}




// Fonction pour ajouter ou soustrait à la mise (bet)


// Fonction pause (Pour mettre du delai à utiliser sur function async)
function pause(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}



// Fonction qui actionne le retournement des cartes.
async function flip (){
  
  for(i=0; i<5 ; i++){
    if(i==0){
      let flip = document.getElementById(("card"+(i+1)))
      console.log(i)
      flip.checked = false;
    
    }else {
      await pause(500);
      let flip = document.getElementById(("card"+(i+1)))
      console.log(flip)
      flip.checked = false;
      
    }

  }
  const alert = document.getElementById("alert");
  alert.innerHTML = "Cliquer sur les cartes que vous souhaitez changer puis cliquer sur le bouton 'Changer les cartes'";
  
}


// Fonction d'affichage du résultat apres le retournement automatique des cartes 

const displayComb = document.getElementById("flip");
displayComb.addEventListener('click', async () => {
    await pause(2500);
    const displayCombi = document.getElementById("displayCombi");
    displayCombi.innerHTML = ""
    let combinaison = hand[0] + hand[1] + hand[2] + hand[3] + hand[4];
    console.log(combinaison);
    analyseHand(combinaison);

    evaluateHand();
})



// Fonction qui permet à l'utilisateur de retourner les cartes lui même et afficher le resultat

document.getElementById("board").addEventListener('click', () => {
  let u = 0;
    for(i=0;i<5;i++){
      let card = document.getElementById("card"+ (i+1));
      
      if((card.checked == false)){
        u++;
      } else {
        break;
      }
  }
  if(u==5){
    const displayCombi = document.getElementById("displayCombi");
    displayCombi.innerHTML = ""
    let combinaison = hand[0] + hand[1] + hand[2] + hand[3] + hand[4];
    console.log(combinaison);
    analyseHand(combinaison);

    evaluateHand();
    const alert = document.getElementById("alert");
    if(changed == 0 ){
      alert.innerHTML = "Retourner les cartes que vous voulez changer avant de cliquer sur le bouton 'Changer les cartes'";
    } else {
      alert.innerHTML = "Piocher pour jouer une autre main"
    }
  }
  
})


// Fonction qui va changer les cartes que l'utilisateur a retourné. 

/* Verifie quel carte sont à Changer 

Ensuite récuperer les cartes de remplacements dans hand[]

Tirer de nouveau nombre aléatoire différents des premiers.

préparer les nouvelles cartes à ajouter

retirer les cartes retourner

ajouter les nouvelle carte */

let changed;

async function change(){

  for(i=0;i<5;i++){
    let card = document.getElementById("card"+ (i+1));
    
    if((card.checked == true)){
      
      const cards = document.getElementsByClassName("cardSite");
      cards[i].innerHTML = "";
      await pause(250);


      const input = document.createElement("input");
      input.type = "checkbox";
      input.setAttribute("id", "card"+(i+1))
      input.classList.add("card-flip");
      input.setAttribute('checked',true);
      const label = document.createElement("label");
      label.setAttribute("for", 'card'+(i+1));
      label.classList.add("label-flip");
      const flipCard = document.createElement("div");
      flipCard.classList.add("flip-card-inner");
      const frontCard= document.createElement("div");
      frontCard.classList.add("flip-card-front");
      const backCard = document.createElement("div");
      backCard.classList.add("flip-card-back")
      const imgFront = document.createElement("img");
      const imgBack = document.createElement("img");

      
      backCard.appendChild(imgBack);
      frontCard.appendChild(imgFront);
      flipCard.appendChild(frontCard);
      flipCard.appendChild(backCard);
      label.appendChild(flipCard);
      cards[i].appendChild(input);
      cards[i].appendChild(label);
      
      hand[i] = hand[(i+5)];

    
      console.log(hand[i]);
      
      imgFront.setAttribute("src", "css/Poker/cards/"+hand[i]+".png");
      imgBack.setAttribute("src", "css/Poker/cards/CardBack.png")
    } 



  }
  const displayCombi = document.getElementById("displayCombi");
  const displayReward= document.getElementById("rewardDisplay");
  displayCombi.innerHTML = "Tirage"
  displayReward.innerHTML = "Récompense"
  const alert = document.getElementById("alert");
  alert.innerHTML = "Retourner les cartes pour voir le resultat";
  changed = 1;
  payed= 0;



}






















