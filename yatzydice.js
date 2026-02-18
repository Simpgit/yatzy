

let throwCount = 0;

function createDice() {
  return { value: 1, hold: false };
}

let dice = [];
for (let i = 0; i < 5; i++) dice.push(createDice());


function diceThrow(){
    if(throwCount >=3){
        return
    }

    for(let i = 0; i < dice.length; i++){
        if(!dice[i].hold){
            dice[i].value = Math.floor(Math.random() * 6) + 1;
        }
    }
    throwCount++
}

function getValues(){
    let values = [];
    for (let i = 0; i < 5; i++) values.push(dice[i].value);
    return values;
}

function getResults(){
    let resultater = [];

    for (let i = 1; i <= 6; i++) {
            resultater.push(sameValuePoints(i));
    }

    resultater.push(onePairPoints());
    resultater.push(twoPairPoints());
    resultater.push(threeOfAKindPoints());
    resultater.push(fourOfAKindPoints());
    resultater.push(fullHousePoints());
    resultater.push(smallStraightPoints());
    resultater.push(largeStraightPoints());
    resultater.push(chancePoints());
    resultater.push(yatzyPoints());

    return resultater;

}


function frequency() {
  let freq = [0, 0, 0, 0, 0, 0, 0];
  let values = getValues();
  for (let i = 0; i < values.length; i++) {
    let v = values[i];
    if (v >= 1 && v <= 6) freq[v]++;
  }
  return freq;
}

function sameValuePoints(value){
    let resultat = 0
    let values = getValues()

    for(let i = 0; i < 5; i++){
        if (value == values[i]) {
            resultat += value;
    
        }
        
    }
    return resultat
}

function onePairPoints(){
     for (let i = 6; i >= 1; i--) {
            if (frequency()[i] >=2){
                return i *2;
            }
        }
    return 0;
}

function twoPairPoints(){
    let resultat = 0

     for (let i = (onePairPoints()/2)-1; i >= 1 ; i--) {
            if (frequency()[i] >=2){
                  resultat = i *2;
                return onePairPoints() + resultat;
            }
    }
    return 0;
}

function threeOfAKindPoints(){
    for (let i = 6; i >= 1; i--) {
            if (frequency()[i] >=3){
                return i *3;
            }
        }
    return 0;
}

function fourOfAKindPoints(){
    for (let i = 6; i >= 1; i--) {
            if (frequency()[i] >=4){
                return i *4;
            }
        }
    return 0;
}

function fullHousePoints(){
    if (onePairPoints() > 0 && threeOfAKindPoints() > 0){
        return onePairPoints() + threeOfAKindPoints();
    }
    return 0;
}   

function smallStraightPoints(){
    let frekvenser = frequency();    
    if (frekvenser[1] == 1 && frekvenser[2] == 1 && frekvenser[3] == 1 && frekvenser[4] == 1 && frekvenser[5] == 1){
        return 15;
    }
    return 0;
}

function largeStraightPoints(){
    let frekvenser = frequency();    
    if (frekvenser[2] == 1 && frekvenser[3] == 1 && frekvenser[4] == 1 && frekvenser[5] == 1 && frekvenser[6] == 1){
        return 20;
    }
    return 0;
}

function chancePoints(){
    let resultat = 0;
    let values = getValues()

    for(let i = 0; i < 5; i++){
        resultat += values[i];
    }       
    return resultat;
}

function yatzyPoints(){
    for (let i = 6; i >= 1; i--) {
            if (frequency()[i] >=5){
                return 50;
            }
        }
    return 0;
}


