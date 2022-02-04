/* 
Donc on initialise deux tableaux.
Un qui va compter le nombre de 1, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A. (13)
Un qui va compter le nombre de k(Carreau), c(Coeur), p(Pique), t(Trefle). (4)

*/

let value = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
let symbole = [ 0, 0, 0, 0,];



/* Fonction analyseHand
Permets de stocker le comptage des valeurs dans le tableau "value" et le comptage des couleurs dans symbole.
*/

function analyseHand(combinaison){
    
    value[0] = ((combinaison.match(/1/g) || []).length);
    value[1] = ((combinaison.match(/2/g) || []).length);
    value[2] = ((combinaison.match(/3/g) || []).length);
    value[3] = ((combinaison.match(/4/g) || []).length);
    value[4] = ((combinaison.match(/5/g) || []).length);
    value[5] = ((combinaison.match(/6/g) || []).length);
    value[6] = ((combinaison.match(/7/g) || []).length);
    value[7] = ((combinaison.match(/8/g) || []).length);
    value[8] = ((combinaison.match(/9/g) || []).length);
    value[9] = ((combinaison.match(/T/g) || []).length);
    value[10] = ((combinaison.match(/J/g) || []).length);
    value[11] = ((combinaison.match(/Q/g) || []).length);
    value[12] = ((combinaison.match(/K/g) || []).length);
    value[13] = ((combinaison.match(/A/g) || []).length);

    symbole[0] = ((combinaison.match(/k/g) || []).length);
    symbole[1] = ((combinaison.match(/c/g) || []).length);
    symbole[2] = ((combinaison.match(/p/g) || []).length);
    symbole[3] = ((combinaison.match(/t/g) || []).length);



    for(i=0; i<14; i++){
        if(value[i]>0){
            console.log("valeur" + i + ":" + value[i]);
        }
    }
    for(i=0; i<4; i++){
        if(symbole[i]>0){
            console.log("valeur" + i + ":" + symbole[i]);
        }
    }
}



/* Fonction : translateValue()
Sers à traduire le tableau "value" pour l'afficher lors d'une paire, double paire, brelan, carré, full. 
*/

function translateValue(u) {
    if(u==0){
        return "AS";
    } else if(u==1) {
        return "2";
    } else if(u==2) {
        return "3";
    } else if(u==3) {
        return "4";
    } else if(u==4) {
        return "5";
    } else if(u==5) {
        return "6";
    } else if(u==6) {
        return "7";
    } else if(u==7) {
        return "8";
    } else if(u==8) {
        return "9";
    } else if(u==9) {
        return "10";
    } else if(u==10) {
        return "Vallet";
    } else if(u==11) {
        return "Dame";
    } else if(u==12) {
        return "Roi";
    } else if(u==13) {
        return "AS";
    }
}



/* Fonction : translateColor()
Sert à traduire le tableau "symbole" pour l'afficher lors d'une Couleur.

*/

function translateColor(i)
{
    if(i==0){
        return "Carreau";
    } else if(i==1) {
        return "Coeur";
    } else if(i==2) {
        return "Pique";
    } else if(i==3) {
        return "Trèfle";
    }
}




/* Fonction : evaluateHand()
Permets d'évaluer la main et d'afficher le résultat.
*/

function evaluateHand(){

    const displayCombi = document.getElementById("displayCombi");
    let straightFlush = 0;
    let royalFlush = 0;
    let straight = 0;
    let doublePair;
    let double_Pair;
    let none = 0;

    
    // Suite de Couleur Royal(RoyalFlush)
    royal_flush:
    for(i=0;i < 13; i++) {
        if(i< 13) {
            if(value[i]==1){ i++;
                if(i< 13) {
                    
                    if(value[i]==1){ i++;
                        if(i< 13) {
                            
                            if(value[i]==1){ i++;
                                if(i< 13) {
                                    
                                    if(value[i]==1){ i++;
                                        if(i< 13) {

                                            if(value[i]==1){
                                                for(j=0;j<1;j++){
                                                    if(symbole[j]!=5){
                                                        break royal_flush;
                                                    }
                                                }
                                                royalFlush = 1;
                                                none++;
                                                displayCombi.innerHTML = "*~Quinte Flush Royal~*";}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } 
        }

    }

    // Suite de Couleur (StraightFlush)
    straight_flush:
    for(i=0;i < 13; i++) {
        if(i< 13) {
            if(value[i]==1){ i++;
                if(i< 13) {
                    
                    if(value[i]==1){ i++;
                        if(i< 13) {
                            
                            if(value[i]==1){ i++;
                                if(i< 13) {
                                    
                                    if(value[i]==1){ i++;
                                        if(i< 13) {

                                            if(value[i]==1){
                                                if(royalFlush === 1) {
                                                    break;
                                                }
                                                for(j=0;j<3;j++){
                                                    if(symbole[j]!=5){
                                                        break straight_flush;
                                                    }
                                                }
                                                straightFlush = 1;
                                                none++;
                                                displayCombi.innerHTML = "*~ Quinte Flush ~*";}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } 
        }

    }


    // Carré
    square:
    for(i=0; i<13;i++) {
        if(value[i]==4) {
            carre = translateValue(i);
            none++;
            displayCombi.innerHTML = "*~ Carré de carre~*";
        }
    }
    

    // Pour un Full.
    full:
    for(i=0;i < 13; i++) {
        if(value[i] == 3) {
            for(y=0;y<13;y++){
                if(value[y] !=value[i]){
                    if(value[y]==2){
                        full3 = translateValue(i);
                        full2 = translateValue(y);
                        none++;
                        displayCombi.innerHTML = "*~ Full de full3 & full2 ~*";
                    }
                }
            }
        }
    }

    
    
    // Pour une suite.
    for(i=0;i < 13; i++) {
        if(i< 13) {
            if(value[i]==1){ i++;
                if(i< 13) {
                    
                    if(value[i]==1){ i++;
                        if(i< 13) {
                            
                            if(value[i]==1){ i++;
                                if(i< 13) {
                                    
                                    if(value[i]==1){ i++;
                                        if(i< 13) {
                                            if(value[i]==1){
                                                if(straightFlush === 1 || royalFlush === 1) {
                                                    break;
                                                }
                                                straight = 1;
                                                none++;
                                                displayCombi.innerHTML = "*~ Quinte ~*";
                                            }                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } 
        }
    }



    // Pour une Couleur.
    
    for(i=0;i<3;i++){
        if(symbole[i]==5){
            if(straightFlush === 1 || royalFlush === 1 || straight === 1) {
                break;
            }
            color = translateColor(i);
            none++;
            displayCombi.innerHTML = "*~ Flush de color~*";
        }
    }

    

    // Pour un Brelan.
    brelan:
    for(i=0;i < 13; i++) {
        if(value[i] == 3 ) {
            for(y=0;y<13; y++) { 
                if(y != i) {
                    if(value[y] == 2){
                        break brelan;
                    }     
                }
                     
            }
            for(j=0;j<3;j++){
                if(symbole[j]==5) {
                    break brelan;
                }
            }
            brelan = translateValue(i);
            none++;
            displayCombi.innerHTML = "*~ Brelan de " + brelan +" ~*"; 
        }
    }   


    // Pour une double paire.
    double_pair:
    for(i=0;i < 13; i++) {
        if(value[i] == 2 ) {
            for(j=0;j<3;j++){
                if(symbole[j]==5) {
                    break double_pair;
                }
            }
            for(y=0;y<13; y++) { 
                if(y != i) {
                    if(value[y] == 2){
                        doublePair = translateValue(i);
                        double_Pair = translateValue(y);
                        none++;
                        displayCombi.innerHTML = " *~ Double paire de "+ doublePair+ " & " + double_Pair +" ~*"; 
                    }     
                }
                     
            }
            break; 
        }
    }        


    // Pour une paire.
    pair:
    for(i=0;i < 13; i++) {
        if(value[i] == 2 ) {
            for(y=0;y<13; y++) { 
                if(y != i) {
                    if(value[y] >= 2){
                        break pair;
                    }     
                }
                     
            }
            for(j=0;j<3;j++){
                if(symbole[j]==5) {
                    break pair;
                }
            }
            pair = translateValue(i);
            none++;
            displayCombi.innerHTML = "*~ Paire de "+ pair+" ~*"; 
        }
    }        
    
    // Pour une Hauteur.
    if(none === 0) {
        if(value[13] == 1) {
            displayCombi.innerHTML = "*~ Hauteur AS ~*";
        } else if (value[12] == 1) {
            displayCombi.innerHTML = "*~ Hauteur Roi ~*";
        } else if (value[11] == 1) {
            displayCombi.innerHTML = "*~ Hauteur Dame ~*";
        } else if (value[10] == 1) {
            displayCombi.innerHTML = "*~ Hauteur Vallet ~*";
        } else if (value[9] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 10 ~*";
        } else if (value[8] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 9 ~*";
        } else if (value[7] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 8 ~*";
        } else if (value[6] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 7 ~*";
        } else if (value[5] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 6 ~*";
        } else if (value[4] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 5 ~*";
        } else if (value[3] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 4 ~*";
        } else if (value[2] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 3 ~*";
        } else if (value[1] == 1) {
            displayCombi.innerHTML = "*~ Hauteur 2 ~*";
        }
    }
}