


/* 
Pair = x1
Double Pair= x1.5
Brelan = x1.8
Couleur = x2
Suite = x2
Full = x3
Carré = x5
Suite de COuleur = x10
QUinte Flush Royal = x30 */






let coins = document.getElementById("coins").value;
let coinsInput = document.getElementById("coins");
let bet = 0;
let payed = 0;
let betVerif = 0;
console.log(bet);


async function betou() {
    bet = document.getElementById("bet").value;
    if(parseInt(coins)<bet){
        document.getElementById('draw').setAttribute("disabled", "disabled")
    } else {
        for(i=0; i <bet; i++){
            await pause(25);
            coins--;
            coinsInput.value = coins;
            console.log("coins = "+ coins)
            
        }
    }
    
    if(coins<bet){
        document.getElementById('draw').setAttribute("disabled", "disabled")
        console.log(bet);
    }
}


function betIsGood() {
    betVerif = document.getElementById("bet").value;
    if(parseInt(coins)<parseInt(bet)){
        document.getElementById('draw').setAttribute("disabled", "disabled")
    } else {
        document.getElementById('draw').removeAttribute("disabled", "disabled")
    }
}

setInterval(betIsGood, 100);