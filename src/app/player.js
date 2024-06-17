import gameboard from "./gameboard";

export default function player() {
    let player = gameboard();
    let computer = gameboard();
    let available = [];
    let gameOver = false;
    for(let i = 0; i<10; i++){
        for(let j = 0; j<10; j++){
            available.push([i, j]);
        }
    }
    let playerDiv = document.getElementById('player-container');
    let CompDiv = document.getElementById('comp-container');
    player.fillBoard(0, 0, 0, 0);
    player.fillBoard(1, 0, 1, 0);
    player.fillBoard(2, 0, 2, 0);
    player.fillBoard(3, 0, 3, 0);
    player.fillBoard(4, 0, 4, 0);
    computer.fillBoard(0, 0, 0, 0);
    computer.fillBoard(1, 0, 1, 0);
    computer.fillBoard(2, 0, 2, 0);
    computer.fillBoard(3, 0, 3, 0);
    computer.fillBoard(4, 0, 4, 0);
    let computerMove = () => {
        let move = Math.floor(Math.random() * (available.length));
        let attack = available[move];
        available.splice(move, 1);
        return attack;
    }
    const render = () => {
        playerDiv.innerHTML = '';
        CompDiv.innerHTML = '';
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let newDiv = document.createElement('div');
                newDiv.classList.add('element');
                if(player.status(i, j)==0){
                    newDiv.classList.add('sunk');
                }
                else if(player.status(i, j)==2){
                    newDiv.classList.add('sunk-bad');
                }
                else if(player.status(i, j)==3){
                    newDiv.classList.add('claimed');
                }
                CompDiv.append(newDiv);
            }
        }
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let newDiv = document.createElement('div');
                newDiv.classList.add('element');
                if(computer.status(i, j)==0 || computer.status(i, j)==1){
                    newDiv.classList.add('unclaimed');
                }
                else if(computer.status(i, j)==2){
                    newDiv.classList.add('sunk');
                }
                else{
                    newDiv.classList.add('claimed');
                }
                playerDiv.append(newDiv);
                newDiv.addEventListener('click', () =>{
                    if(!gameOver){
                        if(computer.status(i, j)<=1){
                            computer.receiveAttack(i, j);
                        }
                        if(computer.areAllShipsSunk()){
                            gameOver = 1;
                        }
                        else{
                            let move = computerMove()
                            player.receiveAttack(move[0], move[1]);
                            if(player.areAllShipsSunk()){
                                gameOver = 1;
                            }
                        }
                        render();
                    }
                });
            }
        }
    }
    render();
}