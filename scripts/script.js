const Status = {
    TIE: 0,
    HUMAN_WIN: 1,
    COMPUTER_WIN: 2
};

function getComputerChoice()
{
    const randVal = Math.floor(Math.random() * 3)
    switch (randVal)
    {
        case 0:
            return "rock"
        case 1:
            return "paper"
        default:
            return "scissors"
    }
}

function getHumanChoice()
{
    const validInputsMap = new Set(["rock", "paper", "scissors"])
    
    let input = prompt("Enter choice")
    while (true)
    {
        if (input === null)
            return null
        input = input.toLowerCase()
        if (validInputsMap.has(input))
            break;
        input = prompt("Invalid choice try again")
    }
    return input
}

function logInfo(status, humanChoice, computerChoice)
{
    let msg = ""
    humanChoice = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)
    computerChoice = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    if (status == Status.HUMAN_WIN)
        msg = "You won the round! " + humanChoice + " beats " + computerChoice
    else if (status === Status.COMPUTER_WIN)
        msg = "You lost the round! " + computerChoice + " beats " + humanChoice
    else
        msg = "Round tie!"
    console.log(msg)
    document.getElementById("status").innerHTML = msg;
}

async function playGame()
{
    let humanScore = 0
    let computerScore = 0
    let round = 1

    function playRound(humanChoice, computerChoice)
    {
        if (humanChoice === computerChoice)
        {
            logInfo(Status.TIE, humanChoice, computerChoice)
            return;
        }
        switch (humanChoice)
        {
            case "rock":
                if (computerChoice === "paper")
                {
                    logInfo(Status.COMPUTER_WIN, humanChoice, computerChoice)
                    computerScore++
                    break;
                }
                logInfo(Status.HUMAN_WIN, humanChoice, computerChoice)
                humanScore++
                break;
            case "paper":
                if (computerChoice === "scissors")
                {
                    logInfo(Status.COMPUTER_WIN, humanChoice, computerChoice)
                    computerScore++
                    break;
                }
                logInfo(Status.HUMAN_WIN, humanChoice, computerChoice)
                humanScore++
                break;
            default:
                if (computerChoice === "rock")
                {
                    logInfo(Status.COMPUTER_WIN, humanChoice, computerChoice)
                    computerScore++
                    break;
                }
                logInfo(Status.HUMAN_WIN, humanChoice, computerChoice)
                humanScore++
                break;
        }
    }
    while (humanScore < 5 && computerScore < 5)
    {
        const humanChoice = getHumanChoice()
        if (humanChoice === null)
        {
            console.log("Exiting game!")
            return
        }
        const computerChoice = getComputerChoice()
        playRound(humanChoice, computerChoice)
        round++
        document.getElementById("round").innerHTML = "Round " + round
        document.getElementById("playerScore").innerHTML = "Player score: " + humanScore + "/5"
        document.getElementById("computerScore").innerHTML = "Computer score: " + computerScore + "/5"
        if (humanScore < 5 && computerScore < 5)
            console.log("Starting next round in 2 seconds")
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}