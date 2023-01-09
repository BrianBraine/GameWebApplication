

function playTheGame(playerChoice) {

    

    // Function to generate and return a random selection for the opponent
    function getOpponentChoice() {
        const opponentOptions = ['magic', 'melee', 'ranged'];  

        let opponentIndex = Math.floor(Math.random() * 3);
        let opponentChoice = opponentOptions[opponentIndex];

        return opponentChoice;
    }

    let opponentChoice = getOpponentChoice();
    console.log(opponentChoice);
}