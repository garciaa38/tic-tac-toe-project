window.addEventListener('DOMContentLoaded', e => {


    let crossLink = 'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg'
    let circleLink = 'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg'
    let gameArea = document.getElementById('game-area');

    let gameState = {
        turns: 0,
        gameBoard: ['', '', '', '', '', '', '', '', ''],
        winner: false,
        tie: false
    }

    localStorage.setItem('gameState', JSON.stringify(gameState));
    let localState = localStorage.getItem('gameState');

    if (localState) {
        gameState.turns = localState.turns;
        gameState.gameBoard = localState.gameBoard;
        //gameState.gameArea = localState.gameArea;
        gameState.winner = localState.winner;
        gameState.tie = localState.tie;
    }

    console.log('LOCAL STATE', localState);

    let newGame = document.getElementById('new-game');
    let giveUp = document.getElementById('give-up');


    gameArea.addEventListener('click', e => {
        //console.log(e.target);

        let square = e.target;
        //console.log(square);

        let squareInd = e.target.id.split('-')[1];
        //console.log(squareInd);

        if (!square.child) {
            let squareImg = document.createElement('img');
            if (gameState.turns % 2 === 0) {
                squareImg.src = crossLink;
                square.appendChild(squareImg);
                gameState.turns++;
                gameState.gameBoard[squareInd] = 'X';
            } else {
                squareImg.src = circleLink;
                square.appendChild(squareImg);
                gameState.turns++;
                gameState.gameBoard[squareInd] = 'O';
            }

        }



        //Check Rows
        for (let i = 0; i < gameState.gameBoard.length; i += 3) {
            let mark1 = gameState.gameBoard[i];
            let mark2 = gameState.gameBoard[i+1];
            let mark3 = gameState.gameBoard[i+2];

            if (mark1) {
                if (mark1 === mark2 &&
                    mark2 === mark3) {
                        //winner
                        let winMessage = document.getElementById('wins');
                        winMessage.innerHTML = `<h1>Winner: ${mark1}!</h1>`
                        gameState.winner = true;
                    }
                }
            }
            //Check Columns
            for (let i = 0; i <= 3; i += 1) {
                let mark1 = gameState.gameBoard[i];
                let mark2 = gameState.gameBoard[i+3];
                let mark3 = gameState.gameBoard[i+6];

                if (mark1) {
                    if (mark1 === mark2 &&
                        mark2 === mark3) {
                            //winner
                            let winMessage = document.getElementById('wins');
                            winMessage.innerHTML = `<h1>Winner: ${mark1}!</h1>`
                            gameState.winner = true;
                        }
                    }
                }
                //Diagonals
                if (gameState.gameBoard[0]) {
                    if (gameState.gameBoard[0] === gameState.gameBoard[4] &&
                        gameState.gameBoard[4] === gameState.gameBoard[8]) {
                            let winMessage = document.getElementById('wins');
                            winMessage.innerHTML = `<h1>Winner: ${gameState.gameBoard[0]}!</h1>`
                            gameState.winner = true;
                        }
                    }

                    if (gameState.gameBoard[4]) {
                        if (gameState.gameBoard[2] === gameState.gameBoard[4] &&
                gameState.gameBoard[4] === gameState.gameBoard[6]) {
                    let winMessage = document.getElementById('wins');
                    winMessage.innerHTML = `<h1>Winner: ${gameState.gameBoard[2]}!</h1>`
                    gameState.winner = true;
                }
            }

            if (gameState.winner) newGame.style.display = 'flex';

            if (gameState.turns === 9 &&
                !gameState.winner) {
                    let winMessage = document.getElementById('wins');
                    winMessage.innerHTML = `<h1>NO WINNER! GO HOME!</h1>`
                    gameState.tie = true;
                    newGame.style.display = 'flex';
                }



            })

            newGame.addEventListener('click', e => {
                location.reload();
    })

    giveUp.addEventListener('click', e => {
        if (gameState.turns % 2 === 0) {
            let winMessage = document.getElementById('wins');
            winMessage.innerHTML = `<h1>Winner: O!</h1>`
            newGame.style.display = 'flex';
            giveUp.style.display = 'none';
        } else {
            let winMessage = document.getElementById('wins');
            winMessage.innerHTML = `<h1>Winner: X!</h1>`
            newGame.style.display = 'flex';
            giveUp.style.display = 'none';
        }
    })

})
