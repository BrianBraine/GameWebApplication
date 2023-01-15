// Function to get user choice
function setUserSelection() {
    $("input[type='radio']").click(function () {
        var radioValue = $("input[name='userOption']:checked").val();
        if (radioValue) {
            $("#userChoice").val(radioValue);
        }
    });
}


// Function to generate and return a random selection for the opponent
function getOpponentChoice() {
    const opponentOptions = ['magic', 'melee', 'ranged'];

    let opponentIndex = Math.floor(Math.random() * 3);
    let opponentChoice = opponentOptions[opponentIndex];

    return opponentChoice;
}

function gameResult(userChoice, computerChoice) {
    const winCases = ['win', 'loss', 'tie'];
    let result = "";
    // Based on user choice, allow each option to have a "beats" string to compare to
    // So if user choice is magic, beats = melee... if computer choice is
    // melee, then user wins. if not, check if ranged... then comp wins, else tie

    if (userChoice == 'magic') {
        if (computerChoice == 'melee') {
            result = winCases[0];
            return result;
        }
        else if (computerChoice == 'ranged') {
            result = winCases[1];
            return result;
        }
        else {
            result = winCases[2];
            return result;
        }
    }
    if (userChoice == 'melee') {
        if (computerChoice == 'ranged') {
            result = winCases[0];
            return result;
        }
        else if (computerChoice == 'magic') {
            result = winCases[1];
            return result;
        }
        else {
            result = winCases[2];
            return result;
        }
    }
    if (userChoice == 'ranged') {
        if (computerChoice == 'magic') {
            result = winCases[0];
            return result;
        }
        else if (computerChoice == 'melee') {
            result = winCases[1];
            return result;
        }
        else {
            result = winCases[2];
            return result;
        }
    }
}