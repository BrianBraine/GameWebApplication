let start = Date.now();


playTheGame =() => {
    const magic = document.getElementById('#magic');
    const melee = document.getElementById('#melee');
    const ranged = document.getElementById('#ranged');

    const userOptions = [magic, melee, ranged];

    getPlayerChoice(userOptions);
    getOpponentChoice();
        
    // Function that will detect which radio button (or image) is selected
    getPlayerChoice = (userOptions) => {
        let userOptions = document.getElementsByName('userChoice');
        for (i = 0; i < userOptions.length; i++) {
            if (userOptions[i].ariaChecked) {
                document.getElementById("currentUserChoice").innerHTML = userOptions[i].ariaValueText; 
            }   
        }

    }

    // Function to generate and return a random selection for the opponent
    getOpponentChoice = () => {
        const opponentOptions = ['magic', 'melee', 'ranged'];  

        let opponentIndex = Math.floor(Math.random() * 3);
        let opponentChoice = opponentOptions[opponentIndex];

        return opponentChoice;
    }

    let opponentChoice = getOpponentChoice();
    console.log(opponentChoice);
}

playTheGame();

let end = Date.now();

let timeElapsed = end - start;