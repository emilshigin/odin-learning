let options = ["rock", "paper", "scissor"];
let roundOrder = ["First", "Second", "Third", "Fourth", "Final"];
let playerChoice,computerChoice,winner,gameResult, round = 0, playerPoints = 0, computerPoints = 0; 
var gamesPlayed = 0 ,totalWins = 0 ,totalLosses = 0 ,totalTies = 0;

function game(Element){
    gamesPlayed++;
    //player card and change card element: title and image
    playerChoice = Element.id;
    document.getElementById("playerSelected").innerHTML = `${playerChoice}`;
    document.getElementById("playerSelected").style.backgroundImage = `url(img/${playerChoice}.png)`;
    
    // computer choice and change card element: title and image
    computerChoice = options[Math.floor(Math.random()*3)];
    document.getElementById("computerSelected").innerHTML = `${computerChoice}`;
    document.getElementById("computerSelected").style.backgroundImage = `url(img/${computerChoice}.png)`;
    
    winner = rpsGameRules(playerChoice,computerChoice);
    
    // Game result
    if(winner === "tie"){
        document.getElementById("winner").innerHTML = `We will do ${roundOrder[round]} round again since it was a ${winner}`;
    }
    else{
        document.getElementById("winner").innerHTML = `${roundOrder[round++]} round winner is the ${winner}`;
    }
    
    // hide game title
    if(round >= 0){
        document.getElementById("gameTitle").style.display = "none";
    }
  
    // winner condition
    if(playerPoints === 3 || computerPoints === 3 || round === 5){
        // alert('The Winner is ' + (playerPoints > computerPoints ? 'Player' : 'Computer'));
        round = 0,playerPoints = 0, computerPoints = 0;
        //change some visual elements
        document.getElementById("gameTitle").style.display = "show";
        document.getElementById("winner").innerHTML = `Lets play again`;
        settingScreen();
    }
    
    // update points
    document.getElementById("playerScore").innerHTML = `Player Score: ${playerPoints}`;
    document.getElementById("computerScore").innerHTML = `Computer Score: ${computerPoints}`;
    document.getElementById('playByPlay').innerHTML = `Player Choice: ${playerChoice} vs Computer Choice: ${computerChoice}`;
    
}

function rpsGameRules(playerChoice,computerChoice){
    if(playerChoice === computerChoice){
        totalTies++;
        return "tie";
    }else if(playerChoice === "rock" && computerChoice === "scissor"){
        playerPoints++;
        totalWins++;
        return "player";
    }else if(playerChoice === "paper" && computerChoice === "rock"){
        playerPoints++;
        totalWins++;
        return "player";
    }else if(playerChoice === "scissor" && computerChoice === "paper"){
        playerPoints++;
        totalWins++;
        return "player";
    }else{
        computerPoints++;
        totalLosses++;
        return "computer";
    }
}

function settingScreen(){
    document.getElementById("gameSettings").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("gamesPlayed").innerHTML = `${gamesPlayed}`;
    document.getElementById("wins").innerHTML = `${totalWins}`;
    document.getElementById("losses").innerHTML = `${totalLosses}`;
    document.getElementById("ties").innerHTML = `${totalTies}`;
}

// Settings buttons
function startGame(){
    document.getElementById("gameSettings").style.display = "none";
    document.getElementById("gameScreen").style.display = "inline";
}

function resetStats(){
    gamesPlayed = 0 ;
    totalWins = 0 ;
    totalLosses = 0;
    totalTies = 0;
    settingScreen();
}