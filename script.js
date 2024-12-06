

class Player {
    constructor(name){
        this.name = name;
        this.currentTurn = false;
        this.moveDirection = 'All';
    }

    beginTurn(){
        this.currentTurn = true;
    }

    endTurn(){
        this.currentTurn = false;
    }

    getTurn(){
        return this.currentTurn;
    }

}

const player1 = new Player('Fred');
const player2 = new Player('Wilbur');

player1.beginTurn();
console.log(player1.getTurn());
