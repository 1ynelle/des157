(function(){
    'use strict';

    // sounds
    const diceRoll = new Audio('media/diceroll.wav');
    const snakeEyes = new Audio('media/snakeeyes.wav');
    const winningSound = new Audio('media/winningsound.wav');
    const playerChange = new Audio('media/playerchange.wav');

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const p1score = document.getElementById('p1score');
    const p2score = document.getElementById('p2score');
    const actionArea = document.getElementById('actions');

    let gameData = {
        dice: ['1die.png', '2die.png', '3die.png',
                '4die.png', '5die.png', '6die.png'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };


    // START GAME ---------------------------------
    startGame.addEventListener('click', function() {
        // randomly set game index to 0 or 1
        gameData.index = Math.round( Math.random() );

        // gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        gameControl.innerHTML = '<button id="quit">Quit</button>';

        document.getElementById('quit').addEventListener('click', function() {
            location.reload();
        });

        showCurrentScore();
        setUpTurn();
    });


    // SET UP TURN ----------------------
    function setUpTurn() {
        actions.innerHTML += `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        
        document.getElementById('roll').addEventListener('click', function() {
            throwDice();
        });

        if (gameData.index === 0) {
            p1score.style.border = "7px solid #FFDA58";
            p2score.style.border = "none";
        } else if (gameData.index === 1) {
            p2score.style.border = "7px solid #FFDA58";
            p1score.style.border = "none";
        }
    }


    // THROW DICE ------------------------
    function throwDice() {
        diceRoll.play();

        actionArea.innerHTML = '';

        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        
        game.innerHTML = '';
        game.innerHTML += `<img src="images/${gameData.dice[gameData.roll1-1]}">
                           <img src="images/${gameData.dice[gameData.roll2-1]}">`;
        
        actions.innerHTML += `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // if two 1's are rolled
        if(gameData.rollSum === 2) {
            // console.log("snake eyes were rolled");
            snakeEyes.play();
            actions.innerHTML = '<p>🐍 Oh snap! Snake eyes!</p>'
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            // show current score
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }

        // if either die is a 1
        else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            console.log("one of the two dice was a 1");
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            playerChange.play();
            actions.innerHTML = `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        // if neither die is a 1
        else {
            // console.log("the game proceeds");
            
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="pass">Pass</button> <button id="rollagain">Roll Again</button>';

            document.getElementById('rollagain').addEventListener('click', function() {
                setUpTurn();
            });

            document.getElementById('pass').addEventListener('click', function() {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            // check winning condition
            checkWinningCondition();
        }

    }


    // CHECK WINNING CONDITION ---------------------------
    function checkWinningCondition() {
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            winningSound.play();
            actionArea.innerHTML = `<h2>🏆 ${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            // actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
            document.getElementById('quit').style.backgroundColor = "#FFDA58";
            document.getElementById('quit').style.color = "#7A6224";
        }
        else {
            // Show current score
            showCurrentScore();
            p1score.innerHTML = `<h3>Player 1</h3> <p>${gameData.score[0]}</p>`;
            p2score.innerHTML = `<h3>Player 2</h3> <p>${gameData.score[1]}</p>`;
        }
    }


    function showCurrentScore() {
        // score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
        p1score.innerHTML = `<h3>Player 1</h3> <p>${gameData.score[0]}</p>`;
        p2score.innerHTML = `<h3>Player 2</h3> <p>${gameData.score[1]}</p>`;
    }

})();