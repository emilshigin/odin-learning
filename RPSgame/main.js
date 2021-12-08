let options = ["rock", "paper", "scissor"];
let roundOrder = ["First", "Second", "Third", "Fourth", "Final"];
let playerChoice,computerChoice,winner,gameResult, round = 0, playerPoints = 0, computerPoints = 0; 

function game(Element){
    //player card and change card element: title and image
    playerChoice = Element.id;
    document.getElementById("playerSelected").innerHTML = `${playerChoice}`;
    document.getElementById("playerSelected").style.backgroundImage = `url(img/${playerChoice}.png)`;
   
    // computer choice and change card element: title and image
    computerChoice = options[Math.floor(Math.random()*3)];
    document.getElementById("computerSelected").innerHTML = `${computerChoice}`;
    document.getElementById("computerSelected").style.backgroundImage = `url(img/${computerChoice}.png)`;
    
    winner = rules(playerChoice,computerChoice);

    // Game result
    if(winner === "tie"){
        document.getElementById("winner").innerHTML = `We will do ${roundOrder[round]} round again since it was a ${winner}`;
    }
    else{
        document.getElementById("winner").innerHTML = `${roundOrder[round++]} round winner is the ${winner}`;
    }
    
    // update points
    document.getElementById("playerScore").innerHTML = `Player Score: ${playerPoints}`;
    document.getElementById("computerScore").innerHTML = `Computer Score: ${computerPoints}`;
    document.getElementById('playByPlay').innerHTML = `Player Choice: ${playerChoice} vs Computer Choice: ${computerChoice}`;
    
    // winner condition
    if(playerPoints === 3 || computerPoints === 3 || round === 5){
        alert('The Winner is ' + (playerPoints > computerPoints ? 'Player' : 'Computer'));
        round = 0,playerPoints = 0, computerPoints = 0;
        document.getElementById("winner").innerHTML = `Lets play again`;
    }
}

function rules(playerChoice,computerChoice){
    if(playerChoice === computerChoice){
        return "tie";
    }else if(playerChoice === "rock" && computerChoice === "scissor"){
        playerPoints++;
        return "player";
    }else if(playerChoice === "paper" && computerChoice === "rock"){
        playerPoints++;
        return "player";
    }else if(playerChoice === "scissor" && computerChoice === "paper"){
        playerPoints++;
        return "player";
    }else{
        computerPoints++;round
        return "computer";
    }
}

