let options = ["Rock", "Paper", "Scissor", "Exit"];
let roundOrder = ["First", "Second", "Third", "Fourth", "Final"];
let playerChoice,computerChoice,winner,gameResult, round = 0, playerPoints = 0, computerPoints = 0; 

function game(Element){
    if(round > 4){round = 0,playerPoints = 0, computerPoints = 0}
    playerChoice = Element.id;
    // change player card  element

    document.getElementById("playerSelected").innerHTML = `${playerChoice}`;
    document.getElementById("playerSelected").style.backgroundImage = `url(img/${playerChoice}.png)`;
    // computer choice
    computerChoice = options[Math.floor(Math.random()*3)];
    document.getElementById("computerSelected").innerHTML = `${computerChoice}`;
    document.getElementById("computerSelected").style.backgroundImage = `url(img/${computerChoice}.png)`;
    
    winner = rules(playerChoice,computerChoice);
    if(winner === "Tie"){
        document.getElementById("winner").innerHTML = `We will do ${roundOrder[round]} round again since it was a ${winner}`;
    }else{
        document.getElementById("winner").innerHTML = `${roundOrder[round++]} round winner is the ${winner}`;
    }

    // update points
    document.getElementById("playerScore").innerHTML = `Player Score: ${playerPoints}`;
    document.getElementById("computerScore").innerHTML = `Computer Score: ${computerPoints}`;
    document.getElementById('playByPlay').innerHTML = `Player Choice: ${playerChoice} vs Computer Choice: ${computerChoice}`;
    if(playerPoints === 3 || computerPoints === 3 || round === 5){
        alert('The Winner is ' + (playerPoints > computerPoints ? 'Player' : 'Computer'));
    }


}

function rules(playerChoice,computerChoice){
    if(playerChoice === computerChoice){
        return "Tie";
    }else if(playerChoice === "Rock" && computerChoice === "Scissors"){
        playerPoints++;
        return "Player";
    }else if(playerChoice === "Paper" && computerChoice === "Rock"){
        playerPoints++;
        return "Player";
    }else if(playerChoice === "Scissors" && computerChoice === "Paper"){
        playerPoints++;
        return "Player";
    }else{
        computerPoints++;
        return "Computer";
    }
}

function points(){

}
