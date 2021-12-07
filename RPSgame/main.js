let options = ["Rock", "Paper", "Scissors", "Exit"];
let playerChoice,computerChoice,winner,gameResult; 

function game(Element){
    playerChoice = Element.id;
    computerChoice = options[Math.floor(Math.random()*3)];
    winner = rules(playerChoice,computerChoice);
    document.getElementById("winner").innerHTML = `Winner is ${winner}`;
    document.getElementById('playByPlay').innerHTML = `Player Choice: ${playerChoice} vs Computer Choice: ${computerChoice}`;

}

function rules(playerChoice,computerChoice){
    if(playerChoice === computerChoice){
        return "Tie";
    }else if(playerChoice === "Rock" && computerChoice === "Scissors"){
        return "Player";
    }else if(playerChoice === "Paper" && computerChoice === "Rock"){
        return "Player";
    }else if(playerChoice === "Scissors" && computerChoice === "Paper"){
        return "Player";
    }else{
        return "Computer";
    }
}
