import Ship from "./CreateShip";

export default function gameboard (){
    let ships = [];
    let toSink = 5;
    ships.push(Ship(5));
    ships.push(Ship(4));
    ships.push(Ship(3));
    ships.push(Ship(3));
    ships.push(Ship(2));
    let board = [];
    for(let i=0;i<10;i++){
        board[i] = new Array(10).fill(-1);
    }
    let visited = [];
    for(let i=0;i<10;i++){
        visited[i] = new Array(10).fill(0);
    }
    let fillBoard = (index, direction, x, y) => {
        if(direction==0){
            if(y + ships[index].length>=10){
                return 0;
            }
            for(let i = y; i < y + ships[index].length; i++){
                if(board[x][y]!=-1){
                    return 0;
                }
            }
            for(let i = y; i < y + ships[index].length; i++){
                board[x][i]=index;
            }
        }
        else{
            if(x + ships[index].length>=10){
                return 0;
            }
            for(let i = x; i < x + ships[index].length; i++){
                if(board[x][y]!=-1){
                    return 0;
                }
            }
            for(let i = x; i < x + ships[index].length; i++){
                board[i][y]=index;
            }
        }
        return 1;
    }
    const receiveAttack = (x, y) => {
        if(!visited[x][y]){
            visited[x][y] = 1;
            if(board[x][y]!=-1){
                ships[board[x][y]].hit();
                if(ships[board[x][y]].isSunk()){
                    toSink--;
                }
            }
        }
    }
    const areAllShipsSunk = () => {
        if(!toSink){
            return true;
        }
        return false;
    }
    const status = (x, y) => {
        if(!visited[x][y]){
            if(board[x][y]!=-1){
                return 0;
            }
            else{
                return 1;
            }
        }
        else{
            if(board[x][y]!=-1){
                return 2;
            }
            else{
                return 3;
            }
        }
    }
    return { fillBoard, receiveAttack, areAllShipsSunk, status };
}