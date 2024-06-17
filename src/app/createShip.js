export default function Ship(length){
    let health = length;
    const hit = () => {
        health--;
    }
    const isSunk = () => {
        if(health==0){
            return true;
        }
        return false;
    }
    return {length, hit, isSunk}
}